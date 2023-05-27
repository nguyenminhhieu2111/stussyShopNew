const mongoos=require("mongoose")
const OrderSchema = new mongoos.Schema(
    {
        userId:{type:String,required:true},
        userEmail:{type:String},
        userFullname:{type:String},
        userimg:{type:String},
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
                quantity:{
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
       
       total:{type:Number,required:true},
       status:{type:String,default:"pending"},
       quantum:{type:Number,
        default:1,}
       

    },{timestamps:true}
);
module.exports=mongoos.model("Order",OrderSchema)