const Cart = require("../models/Cart")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const router = require("express").Router()


//CREATE CART

router.post("/",verifyTokenAndAuthorization, async (req,res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch(e) {
        res.status(500).json(e)
    }
})


//UPDATE 
router.put("/:userId", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set:req.body,
        }, {new: true})
    res.status(200).json(updatedCart)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//DELETE 

router.delete(":/userId", verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).send("Cart has been deleted!")
    } catch(err) {
        res.status(500).json(err)
    }
})
//GET Cart BY USER ID

router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        const cart = await Cart.findOne(req.params.id)
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})
//GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const carts = await Cart.find()
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router