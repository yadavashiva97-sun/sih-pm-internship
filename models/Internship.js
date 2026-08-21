import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        workMode: {
            type: String,
            enum: ["On-site", "Remote", "Hybrid", "Not specified"],
            default: "Not specified"
        },

        skills: {
            type: [String],
            required: true
        },

        interest: {
            type: String,
            required: true,
            trim: true
        },

        education: {
            type: [String],
            default: []
        },

        stipend: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: String,
            required: true,
            trim: true
        },

        eligibility: {
            type: String,
            default: "Not specified",
            trim: true
        },

        description: {
            type: String,
            default: "No description available.",
            trim: true
        },

        applicationUrl: {
            type: String,
            default: "#",
            trim: true
        },

        source: {
            type: String,
            default: "Not specified",
            trim: true
        },

        deadline: {
            type: String,
            default: "Not specified",
            trim: true
        },

        status: {
            type: String,
            enum: ["Active", "Closed", "Expired", "Not specified"],
            default: "Active"
        }
    },

    {
        timestamps: true
    }
);

export const Internship = mongoose.model(
    "Internship",
    internshipSchema
);