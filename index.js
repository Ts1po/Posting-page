import express from 'express';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});

app.post('/addPost', (req, res) => {
    const index = req.body.index;
    const editPost = req.body.editPost;

    if (index !== undefined && index >= 0 && index < posts.length) {
        posts[index] = editPost;
    } else {
        const newPost = req.body.post;
        posts.push(newPost);
    }

    res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
