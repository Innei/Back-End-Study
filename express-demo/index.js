const express = require("express");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/express-test", {
  useNewUrlParser: true
});
const Names = mongoose.model(
  "Names",
  new mongoose.Schema({
    name: String,
    age: Number
  })
);

const app = new express();

app.use(express.json()) // 请求处理 json 数据 处理 json 时需要,不加这种中间件, req.body 为 undefined

//app.use("/", express.static("./public"));

app.use(require("cors")());

app.get("/", (req, res) => {
  res.send({
    msg: "Hello, express"
  });
});

app.get("/names", async (req, res) => {
  //res.send(await Names.find());
  res.send(await Names.find().sort({ _id: 1 })); //  1 正序排序 -1 倒序
});

app.get("/names/:name", async (req, res) => {
  const name = req.params.name;
  res.send(await Names.findOne({ name }));
});

app.post("/names", async (req, res) => {
  const data = req.body;
  // res.send(await Names.insertMany(data));
  res.send(await Names.create(data))
});

app.listen(8000, () => {
  console.log("server on http://127.0.0.1:8000");
});