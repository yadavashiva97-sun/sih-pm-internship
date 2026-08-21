import mongoose from "mongoose";
import dotenv from "dotenv";
import { Internship } from "./models/Internship.js";

dotenv.config();

const newInternships = [
    {
        title: "Software Developer Intern",
        company: "Codebyt",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "JavaScript",
            "Python",
            "Java",
            "HTML",
            "CSS",
            "Git",
            "GitHub"
        ],
        interest: "Software Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students and fresh graduates with programming knowledge.",
        description:
            "Software development internship involving programming, web development and real-world software projects.",
        applicationUrl:
            "https://unstop.com/internships/software-developer-internship-codebyt-1733325",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "StackCart",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "JavaScript",
            "React",
            "Node.js",
            "HTML",
            "CSS",
            "REST API",
            "Git",
            "GitHub"
        ],
        interest: "Web Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students with programming and web development fundamentals.",
        description:
            "Work on software development and web-based product features.",
        applicationUrl:
            "https://unstop.com/internships/software-development-internship-stackcart-1735257",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Engineer Intern",
        company: "ALGORYX TECHNOLOGIES",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "JavaScript",
            "Python",
            "Java",
            "React",
            "Node.js",
            "SQL",
            "Git",
            "Data Structures"
        ],
        interest: "Software Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Computer Science and engineering students with programming fundamentals.",
        description:
            "Software engineering internship focused on application development and problem solving.",
        applicationUrl:
            "https://unstop.com/internships/software-development-engineer-internship-algoryx-technologies-1739438",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "AIQNova Private Limited",
        location: "Mumbai",
        workMode: "On-site",
        skills: [
            "Python",
            "JavaScript",
            "Software Development",
            "APIs",
            "SQL",
            "Git"
        ],
        interest: "Software Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students with programming and software development fundamentals.",
        description:
            "Software development internship working on real-world technology projects.",
        applicationUrl:
            "https://unstop.com/internships/software-development-internship-aiqnova-private-limited-1736690",
        source: "Unstop",
        deadline: "28 Aug 2026",
        status: "Active"
    },

    {
        title: "Marketing Intern",
        company: "Agrim",
        location: "Gurgaon",
        workMode: "On-site",
        skills: [
            "Digital Marketing",
            "Marketing",
            "Social Media",
            "Communication",
            "Market Research"
        ],
        interest: "Marketing",
        education: [
            "BBA",
            "MBA",
            "Any Degree"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students interested in marketing and business development.",
        description:
            "Marketing internship involving market research, campaigns and business growth activities.",
        applicationUrl:
            "https://unstop.com/internships/marketing-internship-agrim-1736267",
        source: "Unstop",
        deadline: "27 Aug 2026",
        status: "Active"
    },

    {
        title: "Digital Marketing Intern",
        company: "AirKrit India Pvt Ltd",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Digital Marketing",
            "SEO",
            "Social Media Marketing",
            "Content Marketing",
            "Google Analytics"
        ],
        interest: "Digital Marketing",
        education: [
            "Any Degree",
            "BBA",
            "MBA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students interested in digital marketing and online business growth.",
        description:
            "Digital marketing internship involving SEO, social media and content marketing.",
        applicationUrl:
            "https://unstop.com/internships/digital-marketing-internship-airkrit-india-pvt-ltd-1739225",
        source: "Unstop",
        deadline: "31 Aug 2026",
        status: "Active"
    },

    {
        title: "Digital Marketing Intern",
        company: "Atumcode",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Digital Marketing",
            "SEO",
            "Social Media",
            "Content Creation",
            "Marketing"
        ],
        interest: "Digital Marketing",
        education: [
            "Any Degree",
            "BBA",
            "MBA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students interested in digital marketing and content creation.",
        description:
            "Work on digital marketing campaigns, content and online growth strategies.",
        applicationUrl:
            "https://unstop.com/internships/digital-marketing-internship-atumcode-1736414",
        source: "Unstop",
        deadline: "27 Aug 2026",
        status: "Active"
    },

    {
        title: "Marketing Internship",
        company: "To-let Globe",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Marketing",
            "Digital Marketing",
            "Social Media",
            "Communication",
            "Lead Generation"
        ],
        interest: "Marketing",
        education: [
            "Any Degree",
            "BBA",
            "MBA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students interested in marketing and business development.",
        description:
            "Marketing internship focused on digital outreach, lead generation and business development.",
        applicationUrl:
            "https://unstop.com/internships/marketing-internship-to-let-globe-1736231",
        source: "Unstop",
        deadline: "27 Aug 2026",
        status: "Active"
    },

    {
        title: "Marketing & Operations Intern",
        company: "Konsult Me Tech Private Limited",
        location: "Noida",
        workMode: "Hybrid",
        skills: [
            "Marketing",
            "Operations",
            "Communication",
            "Business Development",
            "MS Excel"
        ],
        interest: "Marketing",
        education: [
            "BBA",
            "MBA",
            "Any Degree"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students with communication, business and organizational skills.",
        description:
            "Internship combining marketing, operations and business development activities.",
        applicationUrl:
            "https://unstop.com/internships/marketing-and-operations-internship-konsult-me-tech-private-limited-1734580",
        source: "Unstop",
        deadline: "24 Aug 2026",
        status: "Active"
    },

    {
        title: "Sales & Marketing Intern",
        company: "URS Group of Companies",
        location: "Noida",
        workMode: "Hybrid",
        skills: [
            "Sales",
            "Marketing",
            "Communication",
            "Business Development",
            "Lead Generation"
        ],
        interest: "Sales and Marketing",
        education: [
            "Any Degree",
            "BBA",
            "MBA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students with good communication and interpersonal skills.",
        description:
            "Sales and marketing internship involving customer interaction and business development.",
        applicationUrl:
            "https://unstop.com/internships/sales-and-marketing-internship-urs-group-of-companies-1731733",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "Marketing Intern",
        company: "Market Orbit Agency LLP",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Digital Marketing",
            "Social Media",
            "Content Marketing",
            "SEO",
            "Marketing"
        ],
        interest: "Marketing",
        education: [
            "Any Degree",
            "BBA",
            "MBA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students interested in marketing, social media and digital growth.",
        description:
            "Marketing internship focused on social media, content and digital marketing campaigns.",
        applicationUrl:
            "https://unstop.com/internships/marketing-internship-market-orbit-agency-llp-1737333",
        source: "Unstop",
        deadline: "30 Aug 2026",
        status: "Active"
    }
];

async function addInternships() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        let added = 0;
        let skipped = 0;

        for (const internship of newInternships) {
            const alreadyExists = await Internship.findOne({
                title: internship.title,
                company: internship.company
            });

            if (alreadyExists) {
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

        console.log("");
        console.log(`Added: ${added}`);
        console.log(`Skipped: ${skipped}`);
        console.log(`Total new records processed: ${newInternships.length}`);

        await mongoose.disconnect();

        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Error adding internships:", error);
        process.exit(1);
    }
}

addInternships();