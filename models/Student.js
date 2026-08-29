import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        college: {
            type: String,
            default: "Not specified",
            trim: true
        },

        course: {
            type: String,
            default: "Not specified",
            trim: true
        },

        branch: {
            type: String,
            default: "Not specified",
            trim: true
        },

        semester: {
            type: String,
            default: "Not specified",
            trim: true
        },

        cgpa: {
            type: Number,
            default: 0,
            min: 0,
            max: 10
        },

        skills: {
            type: [String],
            default: []
        },

        interests: {
            type: [String],
            default: []
        },

        location: {
            type: String,
            default: "Any",
            trim: true
        },

        education: {
            type: String,
            default: "Not specified",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Student =
    mongoose.models.Student ||
    mongoose.model("Student", studentSchema);