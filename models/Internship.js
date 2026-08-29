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
            enum: [
                "On-site",
                "Remote",
                "Hybrid",
                "Not specified"
            ],
            default: "Not specified"
        },

        skills: {
            type: [String],
            default: []
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
            default: "Not specified",
            trim: true
        },

        duration: {
            type: String,
            default: "Not specified",
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

        /*
         * IMPORTANT:
         * This is NOT an external application platform.
         * Applications are handled by our own application system.
         */
        applicationUrl: {
            type: String,
            default: "",
            trim: true
        },

        source: {
            type: String,
            default: "PM Internship Assistant",
            trim: true
        },

        deadline: {
            type: String,
            default: "Not specified",
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Closed",
                "Expired",
                "Not specified"
            ],
            default: "Active"
        },

        careerValue: {
            type: Number,
            default: 70,
            min: 0,
            max: 100
        },

        competitionLevel: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Not specified"
            ],
            default: "Medium"
        },

        skillGap: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

export const Internship =
    mongoose.models.Internship ||
    mongoose.model("Internship", internshipSchema);