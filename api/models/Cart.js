const mongoos=require("mongoose")
const CartSchema = new mongoos.Schema(
    {
        userId:{type:String,required:true},
        products:[
            {
                productsId:{
                    type:String
                },
                nameProduct:{
                    type:String
                },
                img:{
                     type:String
                },
                quantum:{
                    type:Number,
                    default:1,
                },
                price:{
                    type:String
                },
                total:{
                    type:String
                },
                size:{
                    type:String
                }
            }
        ],
       
       

    },{timestamps:true}
);
module.exports=mongoos.model("Cart",CartSchema)