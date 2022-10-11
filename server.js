import express from 'express';
import path from 'path';
import userRoute from './serverside/routes/userRoutes'
import productRoute from './serverside/routes/productroute'
import orderRoute from './serverside/routes/orderRoute'
import uploadRoute from './serverside/routes/uploadRoute'
import db from './serverside/db';
import bodyParser from 'body-parser'
import { PAYPAL_CLIENT_ID } from './serverside/config';


const app = express()
app.use(bodyParser.json())
// console.log(process.env.JWT_SECRET_KEY)
app.use('/api/uploads',uploadRoute)
app.use('/api',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)
app.get('/api/config/paypal', (req, res) => {
    // console.log(PAYPAL_CLIENT_ID)
    res.send(PAYPAL_CLIENT_ID);
  });
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  // console.log(express.static(path.join(__dirname, '/./uploads')))
  app.use(express.static(path.join(__dirname, '/clientside/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/clientside/build/index.html`));
});


if(process.env.NODE_EVR==='production'){
    app.use(express.static('./clienside/build'))
}

app.listen(6001,()=>{
    console.log('server running at port number '+ 6001)
})