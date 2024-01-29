import express from 'express';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get('/', (req, res) => {
    res.render("index.ejs", { posts });
});

app.post('/add', (req, res) => {
    const post = req.body.post;
    posts.push(post);
    res.redirect('/');
});

app.post("/edit/:ed", (req, res) => {
    const ed = req.body.ed;
    const editpost = req.body.editpost;

    if (ed !== undefined && ed >= 0 && ed < posts.length) {
        posts[ed] = editpost;
    }
    res.redirect("/");
});

app.post("/delete/:dele", (req, res) => {
    const dele = req.params.dele;
    if (dele >= 0 && dele < posts.length) {
        posts.splice(dele, 1);
    }
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



