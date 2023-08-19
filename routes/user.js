const router = require('express').Router()
const USER = require('../models/USER')
const { Verifytoken } = require('../routes/verify')

//cart create,update,delete operation
router.post('/cart/:id', Verifytoken, async (req, res) => {
    const isNew = req.query.new
    const remove = req.query.remove
    const update=req.query.update
    
    if (req.data.id === req.params.id) {
        //adding items to cart
        if (isNew) {
            const user = await USER.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    "cart": req.body
                }
            }, { new: true });
            const { password, ...others } = user._doc
            res.send(others)
        }
        //removing items from cart
        else if (remove) {
            const id=req.body.productId;
            try {
                const user = await USER.findOneAndUpdate({ _id: req.params.id }, 
                    { $pull: { "cart": { productId: id } } }, 
                    { new: true });

                const { password, ...others } = user._doc
                res.send(others)
            } catch (error) {
                res.send("not found")
            }

        }
        //updating quantity from cart
        else if(update){
            const produtctId = req.body.productId
            const quantity = req.body.quantity
            try {
                const user = await USER.findOneAndUpdate({ _id: req.params.id, 'cart.productId': produtctId },  
                {$set: {
                    'cart.$.quantity': quantity
                }},{new: true});

                const { password, ...others } = user._doc
                res.send(others)
            } catch (error) {
                res.send(error)
            }
        }
    }
    else {
        res.send("not authenticated")
    }
});
//getting cart items by user ID
router.get('/cart/:id', Verifytoken, async (req, res) => {
    if (req.data.id === req.params.id) {
        try {
            const user = await USER.findById({ _id: req.params.id });
            const {_id, username, email,password, ...others } = user._doc
            res.send(others)
        } catch (error) {
            res.send("invalid request")
        }
    }
    else {
        res.send("not authenticated2")
    }
});



module.exports = router;