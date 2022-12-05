const Order = require("../models/Order")
const Product = require("../models/Product")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const router = require("express").Router()


//CREATE ORDER

router.post("/",verifyTokenAndAuthorization, async (req,res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(e) {
        res.status(500).json(e)
    }
})


//UPDATE 
router.put("/:userId", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set:req.body,
        }, {new: true})
    res.status(200).json(updatedOrder)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//DELETE 

router.delete(":/userId", verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).send("Order has been deleted!")
    } catch(err) {
        res.status(500).json(err)
    }
})
//GET Order BY ID

router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        const orders = await Order.find(req.params.id)
        res.status(200).json(ORDER)
    } catch(err) {
        res.status(500).json(err)
    }
})
//GET ALL ORDER
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const order = await Order.find()
        res.status(200).json(order)
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET MONTHLY INCOME 
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router