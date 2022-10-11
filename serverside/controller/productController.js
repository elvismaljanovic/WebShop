import data from '../data.js';
import productmodel from '../Model/productModel'

module.exports={
   async homeScreenProduct (req,res){
       console.log(req.query)
    const {category,searchKeyword,sortOrder,page,perPage,limit} = req.query
    const option = {
        page:parseInt(page,10)||1,
        limit:parseInt(perPage,12)||12
    }
    function escapeRegex(category) {
        var name = category || '';
        return name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const sortOrders = sortOrder?sortOrder==='lowest'?{price:1}:{price:-1}:{_id:-1}
    // const finddata = await productmodel.find().sort(sortOrders)
    const regex = new RegExp(escapeRegex(category||searchKeyword||sortOrder), 'gi');
    const productroute = await  productmodel.paginate({$or:[{category:regex||''},{name:regex},{brand:regex}]},option)
    // console.log(finddata)
   return  res.send({productlist:productroute})
    },


     async getProductsByID (req,res)  {
        const productId = req.params.id;
        const product = await productmodel.findOne({_id:productId})
        if(product){
           return res.send(product)
        }
        else if(!product)
       return res.status(404).send({msg:"product not found"})
    }
}