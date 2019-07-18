/**
 * Moogoose 关联模型 demo
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/moogose-model-demo", {
  useNewUrlParser: true
});

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    categories: [
      // 分类与分类模型相关联
      {
        type: mongoose.SchemaTypes.ObjectId, // 关联分类模型中的唯一 _id
        ref: "Category" // 关联的模型名称
      }
    ]
  })
);

// const Category = mongoose.model(
//   "Category",
//   new mongoose.Schema({
//     name: String
//   })
// );
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true } // 转换成 JSON 时加入虚拟字段
  }
);
CategorySchema.virtual("posts", {
  // 定义一个虚拟字段
  ref: "Post", // 关联的模型
  localField: "_id", // 内建 ☞Category 的键
  foreignField: "categories", // 外键 ☞ Post 的键
  justOne: false // 结果只有一条还是多条
});
const Category = mongoose.model("Category", CategorySchema);
/**
 * Query categories from post id
 */
(async function() {
  const cate1 = await Category.findOne({
    name: "vuejs"
  });
  const cate2 = await Category.findOne({
    name: "nodejs"
  });
  const post1 = await Post.findOne({
    title: "第1篇帖子"
  });
  const post2 = await Post.findOne({
    title: "第2篇帖子"
  });

  post1.categories = [cate1, cate2]; // 直接赋值即可
  post2.categories = [cate1];
  await post1.save(); // 保存修改
  await post2.save();
  const posts = await Post.find().populate("categories"); // 输出关联 _id 的内容
  console.log(posts[0], posts[1]);
})();

/**
 * Query posts from categories
 */

(async function() {
  const cates = await Category.find()
    .populate("posts")
    .lean();
  // console.log(cates[0].posts, cates[1].posts);
  // console.log(JSON.stringify(cates))
  // console.log(cates)
})();
