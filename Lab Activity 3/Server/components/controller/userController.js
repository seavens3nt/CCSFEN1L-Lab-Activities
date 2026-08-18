const express = require('express');
const router = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.get("/", (request, response) => {
  try{
    User.find().then((users) => {
        response.status(200).json(users);
    });
  } catch (error) {
    response.status(500).json({message: error.message});
  }
});

router.post("/create", async (request, response) => {
    try{
        const { name, studentNumber, course, yearLevel, email } = request.body;
        const user = new User({
            name: name,
            studentNumber: studentNumber,
            course: course,
            yearLevel: yearLevel,
            email: email
        });

        await user.save();

        response.status(201).json({
            message: "User created successfully",
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error creating user:", error);
        response.status(500).json({
            message: "Error creating user",
            success: false,
        });
    }
})

router.post("/register", async (request, response) => {
    try{
        const { name, studentNumber, course, yearLevel, email, password } = request.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return response.status(400).json({
                message: "Email already registered",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            studentNumber: studentNumber,
            course: course,
            yearLevel: yearLevel,
            email: email,
            password: hashedPassword
        });

        await user.save();

        response.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                studentNumber: user.studentNumber,
                course: user.course,
                yearLevel: user.yearLevel,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        response.status(500).json({
            message: "Error registering user",
            success: false
        });
    }
});

router.post("/login", async (request, response) => {
    try{
        const { email, password } = request.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return response.status(401).json({
                message: "Invalid password",
                success: false
            });
        }

        response.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                studentNumber: user.studentNumber,
                course: user.course,
                yearLevel: user.yearLevel,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        response.status(500).json({
            message: "Error logging in",
            success: false
        });
    }
});

router.put("/update/:id", async (request, response) => {
    try {
        const { name, studentNumber, course, yearLevel, email } = request.body;
        const searchQuery = mongoose.Types.ObjectId.isValid(request.params.id)
            ? { $or: [{ _id: request.params.id }, { studentNumber: request.params.id }] }
            : { studentNumber: request.params.id };

        const user = await User.findOneAndUpdate(
            searchQuery,
            {
                name: name,
                studentNumber: studentNumber,
                course: course,
                yearLevel: yearLevel,
                email: email
            },
            { new: true }
        );

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }

        response.status(200).json({
            message: "User updated successfully",
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        response.status(500).json({
            message: "Error updating user",
            success: false
        });
    }
});

router.patch("/:id", async (request, response) => {
    try{
        const user = await User.findById(request.params.id,);
        const { name, studentNumber, course, yearLevel, email } = request.body;

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }

        user.name = name || user.name;
        user.studentNumber = studentNumber || user.studentNumber;
        user.course = course || user.course;
        user.yearLevel = yearLevel || user.yearLevel;
        user.email = email || user.email;

        await user.save();

        response.status(200).json({
            message: "User updated successfully",
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        response.status(500).json({
            message: "Error updating user",
            success: false
        });
    }
});

router.delete("/:id", async (request, response) => {
    try{
        const user = await User.findByIdAndDelete(request.params.id);
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }
        response.status(200).json({
            message: "User deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        response.status(500).json({
            message: "Error deleting user",
            success: false
        });
    }
});

router.get("/:id", async (request, response) => {
    try{
        const user = await User.findOne({studentNumber: request.params.id});
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }
        response.status(200).json({
            message: "User found",
            success: true,
            user: user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        response.status(500).json({
            message: "Error fetching user",
            success: false
        });
    }
});

module.exports = router;
