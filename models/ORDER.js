const mongoose=require('mongoose');

//order model
const orderSchema= new mongoose.Schema(

    {
        userId:{
            type: String,
            required:true
        },
        products: [{
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
            }
        }],
        amount:{
            type:Number,
            required:true
        },
        address:{
             type: Object,
             required: true
        },
        Status:{
            type: String,
            default:"pending"
        }
    },{timestamps:true}

)

module.exports=mongoose.model("ORDER", orderSchema);