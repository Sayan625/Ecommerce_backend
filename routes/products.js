const router = require('express').Router()
const PRODUCT = require('../models/PRODUCT')
const CATEGORY=require('../models/CATEGORY')

router.post('/admin', async (req, res) => {
    const isNew = req.query.new;
    //adding new product as admin
    if (isNew) {
        const newProduct = new PRODUCT(req.body)
        try {
            const savedProduct = await newProduct.save();
            // updating the category count
            for (let i = 0; i < req.body.categories.length; i++) {
                const savedCategory=await CATEGORY.findOneAndUpdate({name: req.body.categories[i] },
                    { $inc: { count: 1 } }
                    ,{new:true})
            }
            res.send(savedProduct);
        } catch (error) {
            res.send(error)
        }
    }
    else {
        res.send("not admin")
    }

});

//getting product by ID
router.get('/:id', async (req, res) => {

    if (req.params.id) {
        try {
            const savedProduct = await PRODUCT.findById(req.params.id);
            res.send(savedProduct);
        } catch (error) {
            res.send("not found")
        }
    } else {
        res.send("Invalid request")
    }
});

//getting all product or by category
router.get('/', async (req, res) => {
    const category = req.query.category;
    let products;

    try {
        if (category){
            products = await PRODUCT.find({
                categories: {
                    $in: category
                }
            });
        }
        else{
            products = await PRODUCT.find()
        }

        res.send(products);
    } catch (error) {
        res.send("not found")
    }

});



module.exports = router;