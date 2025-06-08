const Post = require("../models/Post");

//Get all posts
exports.getAllPosts = async(req, res) => {
    const posts = await Post.find().populate('author', 'name email')
    res.json(posts);
};

//Get posts by ID
exports.getPostById = async(req, res) => {
    const posts = await Post.findById(req.params.id).populate('author', 'name email');
    if (!posts) return res.status(404).json({message: "Post not found"});

    res.json(posts);
}

//Create new post (auth required)
exports.createPost = async(req, res) => {
    const {title, content} = req.body;

    const newPost = new Post({
        title,
        content,
        author: req.user._id
    })

    const savedPost = await newPost.save();
    res.json(savedPost);
}

//Update post (auth + ownership check)
exports.updatePost = async(req, res) =>{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({message: "Post not found"});
    if(post.author.toString() !== req.user._id.toString()) return res.status(403).json({message: "Not authorised to edit"});

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = post.save();
    res.json(updatedPost);
}

exports.deletePost = async(req, res) =>{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({message: "Post not found"});
    if(post.author.toString() !== req.user._id.toString()) return res.status(403).json({message: "Not authorised to delete"});

    await post.deleteOne();
    res.json({message: "post deleted"})
}
