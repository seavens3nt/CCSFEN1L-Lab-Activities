const express = require("express");
const dbConnect = require("./components/config/dbConnect");
const UserRoutes = require("./components/controller/userController.js");
const ArticleRoutes = require("./components/controller/articleController.js");
const CommentRoutes = require("./components/controller/commentController.js");
const CategoryRoutes = require("./components/controller/categoryController.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users/", UserRoutes);
app.use("/articles/", ArticleRoutes);
app.use("/comments/", CommentRoutes);
app.use("/categories/", CategoryRoutes);

dbConnect();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
