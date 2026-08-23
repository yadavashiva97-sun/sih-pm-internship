import mongoose from "mongoose";
import dotenv from "dotenv";
import { Internship } from "./models/Internship.js";

dotenv.config();

const internshipsToUpdate = [
    {
        title: "Software Developer Intern",
        company: "Rivyou",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-rivyou-1741876",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "My Indian Things",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-my-indian-things-1742506",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "PrepLinc",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-preplinc-1740483",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "Aalteon",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-aalteon-1740005",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "AI & Data Analyst Intern",
        company: "Frugality Fintech",
        applicationUrl: "https://unstop.com/internships/ai-data-analyst-internship-unstop-summer-internship-fair-2026-furgality-fintech-1729985",
        deadline: "27 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Zenotalent",
        applicationUrl: "https://unstop.com/internships/data-analyst-internship-zenotalent-1722533",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "StackCart",
        applicationUrl: "https://unstop.com/internships/data-analyst-internship-stackcart-1740792",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Wikasta Business and Technical Solutions Pvt. Ltd.",
        applicationUrl: "https://unstop.com/internships/data-analyst-internship-wikasta-business-and-technical-solutions-pvt-ltd-1727712",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "URS Group of Companies",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-urs-group-of-companies-1743098",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "SDET Intern",
        company: "Konsult Me Tech Private Limited",
        applicationUrl: "https://unstop.com/internships/software-developer-in-test-sdet-internship-konsult-me-tech-private-limited-1735094",
        deadline: "31 Aug 2026",
        status: "Active"
    }
];

async function updateInternships() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected.");

        let updated = 0;
        let notFound = 0;

        for (const internship of internshipsToUpdate) {
            const result = await Internship.updateOne(
                {
                    title: internship.title,
                    company: internship.company
                },
                {
                    $set: {
                        applicationUrl: internship.applicationUrl,
                        deadline: internship.deadline,
                        status: internship.status,
                        source: "Unstop"
                    }
                }
            );

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

        console.log("\n==============================");
        console.log("URL UPDATE COMPLETED");
        console.log("==============================");
        console.log(`Updated: ${updated}`);
        console.log(`Not found: ${notFound}`);
        console.log("==============================");

        await mongoose.disconnect();

        console.log("MongoDB disconnected.");
    } catch (error) {
        console.error("Error updating internships:", error);

        try {
            await mongoose.disconnect();
        } catch {}

        process.exit(1);
    }
}

updateInternships();