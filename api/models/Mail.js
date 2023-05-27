const mongoos=require("mongoose")
const MailSchema = new mongoos.Schema(
    {
        
        email: { type: String, required: true },
        topic:{type:String,required:true},
        content:{type:String,required:true}


    },{timestamps:true}
);
module.exports=mongoos.model("Mail",MailSchema)