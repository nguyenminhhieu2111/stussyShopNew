const router=require("express").Router();
const Mail=require("../models/Mail");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verityToken");

router.post("/send", async (req, res) => {
    const newPost = new Mail({
      topic: req.body.topic,
      email: req.body.email,
      content:req.body.content,     
    });
  
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router

  //
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const mail = query
        ? await Mail.find().sort({ _id: -1 }).limit(5)
        : await Mail.find();
      res.status(200).json(mail);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Mail.findByIdAndDelete(req.params.id);
    res.status(200).json("Mail has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/find/:id", async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);
    res.status(200).json(mail);
  } catch (err) {
    res.status(500).json(err);
  }
});