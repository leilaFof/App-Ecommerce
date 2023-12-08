const express = require("express");
const {
  verifyToken,
  verifyTokenAndAutrorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = express.Router();
const Order = require("../models/Order");

//create Order\\

router.post("/", verifyToken, async (req, res) => {
  const newOrder = await Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update Order information

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Order

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order is delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user Order

router.get("/find/:userId",verifyTokenAndAutrorisation, async (req, res) => {
  try {
    const orders = await Order.find({userId:req.params.userId});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Order

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const orders=await Order.find()
        res.status(200).json(orders)

    }
    catch(err){res.status(500).json(err)}
})
//get menthly income
 router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const currentDate=  new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth()- 1); 
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth()- 1);
     try {
      const income = await Order.aggregate([
        { $match: {createdAt: { $gte:previousMonth} } },
        {
          $project: {
            month: { $month:"$createdAt" },
            sales:"$amount"
          },
        },
        {
          $group:{
            _id:"$month",
            total:{$sum:"$sales"}
          }
        }
      ]);

      res.status(200).json(income)
    } catch (err) {
      res.status(500).json(err);
    }
 })


module.exports = router;
