import mongoose from "mongoose";
import { Internship } from "./models/Internship.js";
import dotenv from "dotenv";

dotenv.config();

const internships = [
    {
        title: "Software Engineer Intern",
        company: "MaytrixTech",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Python",
            "Java",
            "JavaScript",
            "React",
            "Node.js",
            "SQL",
            "MongoDB",
            "Git"
        ],
        interest: "Software Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA",
            "B.Sc Computer Science"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Freshers pursuing or recently completing B.Tech/B.E., BCA or B.Sc. Computer Science/IT. Eligible graduation years 2027, 2028 and 2029.",
        description:
            "Software engineering internship involving AI, machine learning, modern web development, APIs, databases and real-world software projects.",
        applicationUrl:
            "https://unstop.com/internships/software-engineer-internship-maytrixtech-1733361",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "Kazk Labs",
        location: "Prayagraj",
        workMode: "On-site",
        skills: [
            "Python",
            "Java",
            "C++",
            "Artificial Intelligence",
            "Machine Learning",
            "Problem Solving"
        ],
        interest: "Artificial Intelligence",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "Computer Science"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Currently pursuing a degree in Computer Science, Software Engineering or related field. Freshers welcome.",
        description:
            "Work on AI platform features, AI model integration, testing, debugging and research.",
        applicationUrl:
            "https://unstop.com/internships/software-development-internship-kazk-labs-1733095",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "Merzado Market Technologies Pvt Ltd",
        location: "Hyderabad",
        workMode: "Hybrid",
        skills: [
            "JavaScript",
            "Frontend Development",
            "Backend Development",
            "APIs",
            "Databases",
            "AI",
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
        eligibility:
            "Students with programming fundamentals, problem-solving ability and practical projects.",
        description:
            "Work on real product features across frontend, backend, APIs, databases, AI integrations, automation and testing.",
        applicationUrl:
            "https://unstop.com/internships/software-development-internship-full-stack-ai-cloud-merzado-market-technologies-pvt-ltd-1735394",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Machine Learning Intern",
        company: "GAYATRI EDUCATION",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "XGBoost",
            "TensorFlow",
            "PyTorch",
            "SQL",
            "NLP",
            "Machine Learning"
        ],
        interest: "Data Science",
        education: [
            "B.Tech CSE",
            "B.Tech AI/ML",
            "B.Tech IT",
            "B.Sc Data Science"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Strong Python and machine learning fundamentals with at least one ML project.",
        description:
            "Build and fine-tune machine learning models, develop ML APIs and work with NLP, LLMs and MLOps.",
        applicationUrl:
            "https://unstop.com/internships/machine-learning-internship-remote-gayatri-education-1735484",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Full Stack Developer Intern",
        company: "GAYATRI EDUCATION",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "JavaScript",
            "Python",
            "Node.js",
            "React",
            "Next.js",
            "MongoDB",
            "PostgreSQL",
            "REST API",
            "Git",
            "AWS"
        ],
        interest: "Full Stack Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students with full-stack projects and knowledge of REST APIs, databases and Git/GitHub.",
        description:
            "Build full-stack applications, work with databases, authentication, APIs, deployment and DevOps.",
        applicationUrl:
            "https://unstop.com/internships/full-stack-developer-internship-gayatri-education-1735482",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Mobile App Developer Intern",
        company: "Atavishaala",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Android",
            "iOS",
            "Flutter",
            "APIs",
            "Git",
            "Firebase",
            "Mobile UI/UX"
        ],
        interest: "Mobile Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Undergraduate, postgraduate and engineering students.",
        description:
            "Develop and maintain mobile applications, integrate APIs, debug applications and work with mobile development teams.",
        applicationUrl:
            "https://unstop.com/internships/mobile-app-developer-internship-atavishaala-1733391",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    {
        title: "Flutter / KMP Developer Intern",
        company: "Instient Private Limited",
        location: "Noida",
        workMode: "Hybrid",
        skills: [
            "Flutter",
            "Dart",
            "Kotlin",
            "REST APIs",
            "JSON",
            "Git",
            "Firebase",
            "SQLite",
            "Android",
            "iOS"
        ],
        interest: "Mobile Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA",
            "Software Engineering"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Freshers or candidates pursuing/recently completing Computer Science, IT, Software Engineering or related degrees.",
        description:
            "Develop mobile applications using Flutter or Kotlin Multiplatform and work with APIs, Firebase and application state management.",
        applicationUrl:
            "https://unstop.com/internships/flutter-developer-internship-instient-private-limited-1735225",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Full Stack Developer Intern",
        company: "Evoc Labs",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "JavaScript",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Prisma",
            "Redis",
            "REST APIs",
            "Git"
        ],
        interest: "Backend Development",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "BCA"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Freshers with JavaScript knowledge, Git familiarity and strong problem-solving skills.",
        description:
            "Build backend APIs, work with MongoDB, Prisma, Redis and third-party APIs while collaborating with frontend developers.",
        applicationUrl:
            "https://unstop.com/internships/full-stack-developer-intern-backend-focus-evoc-labs-1735403",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "AI & Software Engineering Intern",
        company: "Lanmea",
        location: "Bangalore",
        workMode: "On-site",
        skills: [
            "AI",
            "Machine Learning",
            "LLM",
            "RAG",
            "AI Agents",
            "Frontend",
            "Backend",
            "Cloud",
            "Vector Databases"
        ],
        interest: "Artificial Intelligence",
        education: [
            "B.Tech CSE",
            "B.Tech AI/ML",
            "B.Tech IT",
            "Data Science"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Final-year students or recent graduates in Computer Science, Engineering, Data Science or related fields.",
        description:
            "Work across AI, modern web development, LLMs, RAG, agents, workflow automation and data platforms.",
        applicationUrl:
            "https://unstop.com/internships/ai-software-engineering-internship-lanmea-1731978",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "AI QA Developer Intern",
        company: "Epicor Software Corporation",
        location: "Bangalore",
        workMode: "Hybrid",
        skills: [
            "Java",
            "Selenium",
            "JUnit",
            "TestNG",
            "REST Assured",
            "Maven",
            "Git",
            "Software Testing",
            "AI"
        ],
        interest: "Software Testing",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "M.Tech",
            "Computer Science"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Currently pursuing Bachelor's or Master's degree in Computer Science, Software Engineering, IT, AI or related field.",
        description:
            "Work on AI quality engineering, automation testing and Java-based software development.",
        applicationUrl:
            "https://unstop.com/internships/ai-qa-developer-intern-epicor-software-corporation-1731600",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "DevOps Engineer Intern",
        company: "Fx31Labs Private Limited",
        location: "Ahmedabad",
        workMode: "On-site",
        skills: [
            "Linux",
            "Git",
            "GitHub",
            "Docker",
            "AWS",
            "Azure",
            "GCP",
            "CI/CD",
            "Bash",
            "Networking"
        ],
        interest: "Cloud and DevOps",
        education: [
            "B.Tech CSE",
            "B.Tech IT",
            "Cloud Computing"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students with Linux, Git, Docker, cloud and basic networking knowledge.",
        description:
            "Work with cloud infrastructure, deployment, networking, Docker, CI/CD and DevOps automation.",
        applicationUrl:
            "https://unstop.com/internships/devops-engineer-internship-fx31labs-private-limited-1733352",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    {
        title: "Graphic Design Intern",
        company: "Takshila Inc.",
        location: "Remote",
        workMode: "Remote",
        skills: [
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Canva",
            "Video Editing",
            "Typography",
            "Visual Design",
            "AI Tools"
        ],
        interest: "UI/UX and Design",
        education: [
            "Any Degree",
            "Design",
            "Fine Arts"
        ],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility:
            "Students, recent graduates and self-taught designers with a portfolio.",
        description:
            "Create visual designs, branding materials and AI-assisted creative content in a remote environment.",
        applicationUrl:
            "https://unstop.com/internships/graphic-design-internship-takshila-inc-1733411",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Internship.deleteMany({});

        await Internship.insertMany(internships);

        console.log(
            `${internships.length} real internship records inserted successfully.`
        );

        await mongoose.disconnect();

        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedDatabase();