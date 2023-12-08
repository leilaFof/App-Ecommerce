const express = require("express");
const {
  verifyToken,
  verifyTokenAndAutrorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = express.Router();
const Cart = require("../models/Cart");

//create Cart\\

router.post("/", verifyToken, async (req, res) => {
  const newCart = await Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update Cart information

router.put("/:id", verifyTokenAndAutrorisation, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE cart

router.delete("/:id", verifyTokenAndAutrorisation, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart is delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user cart

router.get("/find/:userId",verifyTokenAndAutrorisation, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Cart

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts=await Cart.find()
        res.status(200).json(carts)

    }
    catch(err){res.status(500).json(err)}
})



module.exports = router;
