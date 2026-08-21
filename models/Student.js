import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        required: true
    },

    interests: {
        type: [String],
        required: true
    },

    location: {
        type: String,
        required: true
    },

    education: {
        type: String,
        required: true
    }
});

export const Student = mongoose.model("Student", studentSchema);