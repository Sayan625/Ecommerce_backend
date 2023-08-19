const mongoose = require('mongoose');

//user model
const userSchema = new mongoose.Schema(

    {
        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cart: [{
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
            }
        }]

    }, { timestamps: true }

)

module.exports = mongoose.model("USER", userSchema);