const mongoose=require('mongoose');

//product model
const productSchema= new mongoose.Schema(

    {
        title:{
            type: String,
            required:true
        },
        desc:{
            type:String,
            required:true,
            
        },
        price:{
            type:Number,
            required:true 
        },
        categories:{
            type:Array,
            required:true 
        }
    },{timestamps:true}

)

module.exports=mongoose.model("PRODUCT", productSchema);