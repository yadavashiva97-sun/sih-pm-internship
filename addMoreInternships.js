import mongoose from "mongoose";
import dotenv from "dotenv";
import { Internship } from "./models/Internship.js";

dotenv.config();

// =====================================================
// INTERNSHIPS TO UPDATE
// NO UNSTOP LINKS
// =====================================================

const internshipsToUpdate = [
    {
        title: "Software Developer Intern",
        company: "Rivyou",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "My Indian Things",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "PrepLinc",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "Aalteon",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "AI & Data Analyst Intern",
        company: "Frugality Fintech",
        applicationUrl: "",
        deadline: "27 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Zenotalent",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "StackCart",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Wikasta Business and Technical Solutions Pvt. Ltd.",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "URS Group of Companies",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "SDET Intern",
        company: "Konsult Me Tech Private Limited",
        applicationUrl: "",
        deadline: "31 Aug 2026",
        status: "Active"
    }
];

// =====================================================
// UPDATE INTERNSHIPS
// =====================================================

async function updateInternships() {
    try {
        // -------------------------------------------------
        // CHECK MONGO URI
        // -------------------------------------------------

        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is missing in .env file"
            );
        }

        // -------------------------------------------------
        // CONNECT TO MONGODB
        // -------------------------------------------------

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully.");

        let updated = 0;
        let notFound = 0;

        // -------------------------------------------------
        // UPDATE EACH INTERNSHIP
        // -------------------------------------------------

        for (const internship of internshipsToUpdate) {
            const result = await Internship.updateOne(
                {
                    title: internship.title,
                    company: internship.company
                },
                {
                    $set: {
                        applicationUrl:
                            internship.applicationUrl,

                        deadline:
                            internship.deadline,

                        status:
                            internship.status,

                        source:
                            "PM Internship Assistant"
                    }
                }
            );

            // -------------------------------------------------
            // RESULT
            // -------------------------------------------------

            if (result.matchedCount > 0) {
                console.log(
                    `Updated: ${internship.title} - ${internship.company}`
                );

                updated++;
            } else {
                console.log(
                    `Not found: ${internship.title} - ${internship.company}`
                );

                notFound++;
            }
        }

        // -------------------------------------------------
        // SUMMARY
        // -------------------------------------------------

        console.log("\n====================================");
        console.log("INTERNSHIP UPDATE COMPLETED");
        console.log("====================================");

        console.log(`Updated: ${updated}`);
        console.log(`Not found: ${notFound}`);
        console.log(
            `Total processed: ${internshipsToUpdate.length}`
        );

        console.log("====================================");

        // -------------------------------------------------
        // DISCONNECT
        // -------------------------------------------------

        await mongoose.disconnect();

        console.log("MongoDB disconnected successfully.");
    } catch (error) {
        console.error(
            "Error updating internships:",
            error.message
        );

        try {
            await mongoose.disconnect();
        } catch (disconnectError) {
            console.error(
                "MongoDB disconnect error:",
                disconnectError.message
            );
        }

        process.exit(1);
    }
}

// =====================================================
// RUN
// =====================================================

updateInternships();