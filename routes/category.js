const router = require('express').Router()
const CATEGORY = require('../models/CATEGORY')

//makingnew category admin only
router.post('/admin', async (req, res) => {
    const isNew = req.query.new;
    if (isNew) {
        const newCategory = new CATEGORY(req.body)
        try {
            const savedCategory = await newCategory.save();
            res.send(savedCategory);
        } catch (error) {
            res.send(error)
        }
    }
    else {
        res.send("not admin")
    }

});

//getting category by id
router.get('/:id', async (req, res) => {
    
    if (req.params.id) {
        try {
            const savedCategory = await CATEGORY.findById(req.params.id);
            res.send(savedCategory);
        } catch (error) {
            res.send("not found")
        }
    } else {
        res.send("Invalid request")
    }
});

//getting all category
router.get('/', async (req, res) => {
    try {
        const category = await CATEGORY.find()
        res.send(category);
    } catch (error) {
        res.send("not found")
    }

});



module.exports = router;