const express = require('express');
const router = express();
const Article = require('../models/articleModel');

router.get("/", async (request, response) => {
    try{
        const articles = await Article.find();
        response.status(200).json(articles);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});

router.get("/:id", async (request, response) => {
    try{
        const article = await Article.findById(request.params.id);
        if (!article) {
            return response.status(404).json({
                message: "Article not found",
                success: false
            });
        }
        response.status(200).json({
            message: "Article found",
            success: true,
            article: article
        });
    } catch (error) {
        response.status(500).json({
            message: "Error fetching article",
            success: false
        });
    }
});

router.post("/create", async (request, response) => {
    try{
        const { title, content, author } = request.body;
        const article = new Article({
            title: title,
            content: content,
            author: author
        });

        await article.save();

        response.status(201).json({
            message: "Article created successfully",
            success: true,
            article: article
        });
    } catch (error) {
        response.status(500).json({
            message: "Error creating article",
            success: false
        });
    }
});

router.patch("/:id", async (request, response) => {
    try{
        const article = await Article.findById(request.params.id);
        const { title, content, author } = request.body;

        if (!article) {
            return response.status(404).json({
                message: "Article not found",
                success: false
            });
        }

        article.title = title || article.title;
        article.content = content || article.content;
        article.author = author || article.author;

        await article.save();

        response.status(200).json({
            message: "Article updated successfully",
            success: true,
            article: article
        });
    } catch (error) {
        response.status(500).json({
            message: "Error updating article",
            success: false
        });
    }
});

router.delete("/:id", async (request, response) => {
    try{
        const article = await Article.findByIdAndDelete(request.params.id);
        if (!article) {
            return response.status(404).json({
                message: "Article not found",
                success: false
            });
        }
        response.status(200).json({
            message: "Article deleted successfully",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: "Error deleting article",
            success: false
        });
    }
});

module.exports = router;
