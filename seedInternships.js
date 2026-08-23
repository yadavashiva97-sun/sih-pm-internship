import mongoose from "mongoose";
import dotenv from "dotenv";
import { Internship } from "./models/Internship.js";

dotenv.config();

const newInternships = [
    {
        title: "Software Developer Intern",
        company: "Rivyou",
        location: "Remote",
        workMode: "Remote",
        skills: ["JavaScript", "Python", "Java", "HTML", "CSS", "Git", "GitHub"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students and fresh graduates with programming knowledge.",
        description: "Software development internship involving programming and real-world software projects.",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-rivyou-1741876",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "My Indian Things",
        location: "Remote",
        workMode: "Remote",
        skills: ["JavaScript", "HTML", "CSS", "Python", "Git", "GitHub"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with programming knowledge.",
        description: "Software development internship involving web development and programming.",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-my-indian-things-1742506",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "PrepLinc",
        location: "Remote",
        workMode: "Remote",
        skills: ["JavaScript", "Python", "HTML", "CSS", "Git", "GitHub"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Computer Science and IT students.",
        description: "Software development internship focused on programming and application development.",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-preplinc-1740483",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "Aalteon",
        location: "Remote",
        workMode: "Remote",
        skills: ["JavaScript", "Python", "Java", "HTML", "CSS", "Git"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with programming fundamentals.",
        description: "Software development internship involving application development.",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-aalteon-1740005",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "AI & Data Analyst Intern",
        company: "Frugality Fintech",
        location: "Remote",
        workMode: "Remote",
        skills: ["Python", "Data Analysis", "SQL", "Excel", "Artificial Intelligence"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students interested in AI, data analysis and technology.",
        description: "Internship involving AI, data analysis and technology projects.",
        applicationUrl: "https://unstop.com/internships/ai-data-analyst-internship-unstop-summer-internship-fair-2026-furgality-fintech-1729985",
        source: "Unstop",
        deadline: "27 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Zenotalent",
        location: "Remote",
        workMode: "Remote",
        skills: ["Python", "SQL", "Excel", "Data Analysis", "Power BI"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students interested in data analysis.",
        description: "Data analysis internship involving data processing, analysis and reporting.",
        applicationUrl: "https://unstop.com/internships/data-analyst-internship-zenotalent-1722533",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "StackCart",
        location: "Remote",
        workMode: "Remote",
        skills: ["Python", "SQL", "Excel", "Data Analysis", "Power BI"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with analytical and programming skills.",
        description: "Data analyst internship involving data analysis and business insights.",
        applicationUrl: "https://unstop.com/internships/data-analyst-internship-stackcart-1740792",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Wikasta Business and Technical Solutions Pvt. Ltd.",
        location: "Remote",
        workMode: "Remote",
        skills: ["Python", "SQL", "Excel", "Data Analysis"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students interested in data analytics.",
        description: "Data analytics internship involving data processing and analysis.",
        applicationUrl: "https://unstop.com/internships/data-analyst-internship-wikasta-business-and-technical-solutions-pvt-ltd-1727712",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "URS Group of Companies",
        location: "Noida",
        workMode: "Hybrid",
        skills: ["JavaScript", "HTML", "CSS", "Python", "Git", "GitHub"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with software development fundamentals.",
        description: "Software development internship involving web and application development.",
        applicationUrl: "https://unstop.com/internships/software-developer-internship-urs-group-of-companies-1743098",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "SDET Intern",
        company: "Konsult Me Tech Private Limited",
        location: "Noida",
        workMode: "Hybrid",
        skills: ["Java", "JavaScript", "Testing", "Selenium", "SQL", "Git"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students interested in software testing and development.",
        description: "Software development and testing internship involving quality assurance and automation.",
        applicationUrl: "https://unstop.com/internships/software-developer-in-test-sdet-internship-konsult-me-tech-private-limited-1735094",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    }
];

async function seedInternships() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected.");

        let added = 0;
        let skipped = 0;

        for (const internship of newInternships) {
            const exists = await Internship.findOne({
                title: internship.title,
                company: internship.company
            });

            if (exists) {
                console.log(
                    `Skipped: ${internship.title} - ${internship.company}`
                );
                skipped++;
                continue;
            }

            await Internship.create(internship);

            console.log(
                `Added: ${internship.title} - ${internship.company}`
            );

            added++;
        }

        console.log("\n==============================");
        console.log("SEEDING COMPLETED");
        console.log("==============================");
        console.log(`Added: ${added}`);
        console.log(`Skipped: ${skipped}`);
        console.log(`Total processed: ${newInternships.length}`);
        console.log("==============================");

        await mongoose.disconnect();

        console.log("MongoDB disconnected.");
    } catch (error) {
        console.error("Error seeding internships:", error);

        try {
            await mongoose.disconnect();
        } catch {}

        process.exit(1);
    }
}

seedInternships();