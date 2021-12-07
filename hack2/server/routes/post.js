import express from "express";
import Post from "../models/post";
import moment from "moment";

const router = express.Router();

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/allPosts", async (_, res) => {
  try {
    const posts = await Post.find();
    for (let i = 0; i < posts.length - 1; i++) {
      for (let j = i + 1; j < posts.length; j++) {
        if (posts[i].timestamp < posts[j].timestamp) {
          let tmp = posts[i];
          posts[i] = posts[j];
          posts[j] = tmp;
        }
      }
    }
    res.status(200).send({ message: "success", data: posts });
  } catch (e) {
    console.log("get failed");
    res.status(403).send({ message: "error", data: null });
  }
});
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/postDetail", async (req, res) => {
  try {
    const posts = await Post.findOne({ postId: req.query.pid });
    res.status(200).send({ message: "success", post: posts });
  } catch (e) {
    console.log(e);
    res.status(403).send({ message: "error", post: null });
  }
});
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post("/newPost", async (req, res) => {
  try {
    const newPost = await new Post({
      postId: req.body.postId,
      title: req.body.title,
      content: req.body.content,
      timestamp: req.body.timestamp,
    });
    newPost.save();
    res.status(200).send({ message: "success" });
  } catch (e) {
    res.status(403).send({ message: "error", post: null });
  }
});
// TODO 5-(1): create the 4th API (/api/post)
router.delete("/post", async (req, res) => {
  try {
    console.log(req.query.pid);
    await Post.deleteMany({ postId: req.query.pid });
    res.status(200).send({ message: "success" });
  } catch (e) {
    res.status(403).send({ message: "error", post: null });
  }
});
export default router;
