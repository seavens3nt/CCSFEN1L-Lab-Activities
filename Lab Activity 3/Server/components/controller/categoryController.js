const express = require('express');
const router = express();
const Category = require('../models/categoryModel');

router.get("/", async (request, response) => {
    try{
        const categories = await Category.find();
        response.status(200).json(categories);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});

router.get("/:id", async (request, response) => {
    try{
        const category = await Category.findById(request.params.id);
        if (!category) {
            return response.status(404).json({
                message: "Category not found",
                success: false
            });
        }
        response.status(200).json({
            message: "Category found",
            success: true,
            category: category
        });
    } catch (error) {
        response.status(500).json({
            message: "Error fetching category",
            success: false
        });
    }
});

router.post("/create", async (request, response) => {
    try{
        const { name, description } = request.body;
        const category = new Category({
            name: name,
            description: description
        });

        await category.save();

        response.status(201).json({
            message: "Category created successfully",
            success: true,
            category: category
        });
    } catch (error) {
        response.status(500).json({
            message: "Error creating category",
            success: false
        });
    }
});

router.patch("/:id", async (request, response) => {
    try{
        const category = await Category.findById(request.params.id);
        const { name, description } = request.body;

        if (!category) {
            return response.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();

        response.status(200).json({
            message: "Category updated successfully",
            success: true,
            category: category
        });
    } catch (error) {
        response.status(500).json({
            message: "Error updating category",
            success: false
        });
    }
});

router.delete("/:id", async (request, response) => {
    try{
        const category = await Category.findByIdAndDelete(request.params.id);
        if (!category) {
            return response.status(404).json({
                message: "Category not found",
                success: false
            });
        }
        response.status(200).json({
            message: "Category deleted successfully",
            success: true
        });
    } catch (error) {
        response.status(500).json({
            message: "Error deleting category",
            success: false
        });
    }
});

module.exports = router;
