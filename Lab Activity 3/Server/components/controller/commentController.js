const express = require('express');
const router = express();
const Comment = require('../models/commentModel');

router.get("/", async (request, response) => {
    try{
        const comments = await Comment.find();
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});

router.get("/:id", async (request, response) => {
    try{
        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({
                message: "Comment not found",
                success: false
            });
        }
        response.status(200).json({
            message: "Comment found",
            success: true,
            comment: comment
        });
    } catch (error) {
        response.status(500).json({
            message: "Error fetching comment",
            success: false
        });
    }
});

router.post("/create", async (request, response) => {
    try{
        const { commenter, message, articleTitle } = request.body;
        const comment = new Comment({
            commenter: commenter,
            message: message,
            articleTitle: articleTitle
        });

        await comment.save();

        response.status(201).json({
            message: "Comment created successfully",
            success: true,
            comment: comment
        });
    } catch (error) {
        response.status(500).json({
            message: "Error creating comment",
            success: false
        });
    }
});

router.patch("/:id", async (request, response) => {
    try{
        const comment = await Comment.findById(request.params.id);
        const { commenter, message, articleTitle } = request.body;

        if (!comment) {
            return response.status(404).json({
                message: "Comment not found",
                success: false
            });
        }

        comment.commenter = commenter || comment.commenter;
        comment.message = message || comment.message;
        comment.articleTitle = articleTitle || comment.articleTitle;

        await comment.save();

        response.status(200).json({
            message: "Comment updated successfully",
            success: true,
            comment: comment
        });
    } catch (error) {
        response.status(500).json({
            message: "Error updating comment",
            success: false
        });
    }
});

router.delete("/:id", async (request, response) => {
    try{
        const comment = await Comment.findByIdAndDelete(request.params.id);
        if (!comment) {
            return response.status(404).json({
                message: "Comment not found",
                success: false
            });
        }
        response.status(200).json({
            message: "Comment deleted successfully",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: "Error deleting comment",
            success: false
        });
    }
});

module.exports = router;
