const router = require('express').Router()
const ORDER = require('../models/ORDER')
const {Verifytoken}=require('../routes/verify')

//placing new order
router.post('/',Verifytoken, async (req, res) => {
    const isNew = req.query.new;
    if (isNew) {
        //automatically saving the user ID to order
        const newOrder = new ORDER(req.body)
        newOrder.userId=req.data.id;
        try {
            const savedOrder = await newOrder.save();
            res.send(savedOrder);
        } catch (error) {
            res.send("order failed")
        }
    }
    else {
        res.send("invalid request")
    }

});

//getting all order by all users for admin only
router.get('/admin', async (req, res) => {
    try {
        const orders = await ORDER.find()
        res.send(orders);
    } catch (error) {
        res.send(error)
    }

});

//getting order history for a user
router.get('/',Verifytoken, async (req, res) => {

    if (req.data.id) {
        try {
            const savedOrder = await ORDER.find({userId: req.data.id});
            res.send(savedOrder);
        } catch (error) {
            res.send("not found");
        }
    } else {
        res.send("Invalid request")
    }
});

//getting order by ID for a specific user
router.get('/:id',Verifytoken, async (req, res) => {

    if (req.data.id) {
        try {
            const savedOrder = await ORDER.findById(req.params.id);
            res.send(savedOrder);
        } catch (error) {
            res.send("not found");
        }
    } else {
        res.send("Invalid request")
    }
});




module.exports = router;