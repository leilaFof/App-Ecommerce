const express = require("express");
const {
  verifyToken,
  verifyTokenAndAutrorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = express.Router();
const Product = require("../models/Product");

//create product\\

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = await Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product information

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product is delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get one prroduct

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Product
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({ catagories: { $in: [qCategory] } });
    }else{
         products=await Product.find()

    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
