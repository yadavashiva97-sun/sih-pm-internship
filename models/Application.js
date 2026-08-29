import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        internshipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            required: true
        },

        studentName: {
            type: String,
            required: true,
            trim: true
        },

        internshipTitle: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Under Review",
                "Shortlisted",
                "Rejected",
                "Selected"
            ],
            default: "Applied"
        }
    },
    {
        timestamps: true
    }
);

applicationSchema.index(
    {
        studentId: 1,
        internshipId: 1
    },
    {
        unique: true
    }
);

export const Application =
    mongoose.models.Application ||
    mongoose.model("Application", applicationSchema);