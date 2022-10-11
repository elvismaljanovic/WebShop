import express from 'express'
import Order from '../Model/orderModel'
import { isAuth, isAdmin } from '../utils';
import { EMAIL, PASSWORD } from '../config';
import nodemailer from 'nodemailer'
import { transport } from '../emailService';
const router = express.Router()

router.get('/',isAuth,async(req,res)=>{
    const orders = await Order.find({}).populate('user')
    // console.log(orders)
    res.send(orders)
})
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });

router.get('/:id',isAuth,async(req,res)=>{
    const orders = await Order.findOne({ _id: req.params.id })

    if(orders){
        res.send(orders)
    }
    else{
        res.status(404).send("Order Not Found.")
    }
})

router.put('/:id/pay',isAuth,async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.payment={
            paymentMethod:'paypal',
            paymentResult:{
                payerID:req.body.payerID,
                orderID:req.body.paymentID,
                paymentID: req.body.paymentID
            }
        }
        const updateOrder = await order.save()
        res.send({msg:'order paid',order:updateOrder})
    }
    else {
        res.status(404).send({msg:'order not found'})
    }
})
router.post('/confirmOrderEmail',isAuth,async(req,res)=>{
    // console.log(req.body)
    try {
        // const {isPaid} = req.body.order;
        if(!req.body.isPaid){
            console.log('your payment failled')
        }
       console.log(req.body.orderItems)
        // const transport = nodemailer.createTransport({
        //     host:'smtp.gmail.com',
        //     port:465,
        //     secure:true,
        //     auth:{
        //         user:EMAIL,
        //         pass:PASSWORD                    
        //     }
        // })
        const { response}=  await transport.sendMail({
            to:req.user.email,
            subject:'Indicart Order-Success-Email',
            html:`
            
                    <h2>Indicart-shopping</h2>
                    <p>thanks for shopping to indicart</p>
                   <ul>
                        <li>orderId: ${req.body._id} </li>
                        <li>Shipping address: ${req.body.shipping.address}  ${req.body.shipping.city} ${req.body.shipping.postalCode} ${req.body.shipping.country}</li>
                        <li>your Product: ${req.body.orderItems[0].name} (${req.body.orderItems[0].qty}) </li>
                        <li>Payment Method: ${req.body.payment.paymentMethod}</li>
                        <li>totalPrice: ${req.body.totalPrice}</li>
                   </ul>
            `
        })
        if(response){
            console.log('working...')
            return res.send({msg:'order conform email has been sent successed',status:'email send success'})
        }

    } catch (error) {
        console.log('email-conform-error',error.message)
    } 
})

export default router;