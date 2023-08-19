const mongoose=require('mongoose');

//cart model
const categorySchema= new mongoose.Schema(

    {
        name:{
            type: String,
            required:true,
            unique: true
        },
        count:{
            type:Number,
            default:0
            
        }

    },{timestamps:true}

)

module.exports=mongoose.model("CATEGORY", categorySchema);