import mongoose from "mongoose";
import { Internship } from "./models/Internship.js";
import dotenv from "dotenv";

dotenv.config();

const internships = [
    // =====================================================
    // 1-11: YOUR EXISTING INTERNSHIPS
    // =====================================================

    {
        title: "Software Engineer Intern",
        company: "MaytrixTech",
        location: "Remote",
        workMode: "Remote",
        skills: ["Python", "Java", "JavaScript", "React", "Node.js", "SQL", "MongoDB", "Git"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA", "B.Sc Computer Science"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Freshers pursuing or recently completing B.Tech/B.E., BCA or B.Sc. Computer Science/IT.",
        description: "Software engineering internship involving AI, machine learning, modern web development, APIs, databases and real-world software projects.",
        applicationUrl: "https://unstop.com/internships/software-engineer-internship-maytrixtech-1733361",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "Kazk Labs",
        location: "Prayagraj",
        workMode: "On-site",
        skills: ["Python", "Java", "C++", "Artificial Intelligence", "Machine Learning", "Problem Solving"],
        interest: "Artificial Intelligence",
        education: ["B.Tech CSE", "B.Tech IT", "Computer Science"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Currently pursuing a degree in Computer Science, Software Engineering or related field.",
        description: "Work on AI platform features, AI model integration, testing, debugging and research.",
        applicationUrl: "https://unstop.com/internships/software-development-internship-kazk-labs-1733095",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "Merzado Market Technologies Pvt Ltd",
        location: "Hyderabad",
        workMode: "Hybrid",
        skills: ["JavaScript", "Frontend Development", "Backend Development", "APIs", "Databases", "AI", "Git", "GitHub"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with programming fundamentals, problem-solving ability and practical projects.",
        description: "Work on real product features across frontend, backend, APIs, databases, AI integrations, automation and testing.",
        applicationUrl: "https://unstop.com/internships/software-development-internship-full-stack-ai-cloud-merzado-market-technologies-pvt-ltd-1735394",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Machine Learning Intern",
        company: "GAYATRI EDUCATION",
        location: "Remote",
        workMode: "Remote",
        skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "TensorFlow", "PyTorch", "SQL", "NLP", "Machine Learning"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech AI/ML", "B.Tech IT", "B.Sc Data Science"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Strong Python and machine learning fundamentals with at least one ML project.",
        description: "Build and fine-tune machine learning models, develop ML APIs and work with NLP, LLMs and MLOps.",
        applicationUrl: "https://unstop.com/internships/machine-learning-internship-remote-gayatri-education-1735484",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Full Stack Developer Intern",
        company: "GAYATRI EDUCATION",
        location: "Remote",
        workMode: "Remote",
        skills: ["JavaScript", "Python", "Node.js", "React", "Next.js", "MongoDB", "PostgreSQL", "REST API", "Git", "AWS"],
        interest: "Full Stack Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with full-stack projects and knowledge of REST APIs, databases and Git/GitHub.",
        description: "Build full-stack applications, work with databases, authentication, APIs, deployment and DevOps.",
        applicationUrl: "https://unstop.com/internships/full-stack-developer-internship-gayatri-education-1735482",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Mobile App Developer Intern",
        company: "Atavishaala",
        location: "Remote",
        workMode: "Remote",
        skills: ["Android", "iOS", "Flutter", "APIs", "Git", "Firebase", "Mobile UI/UX"],
        interest: "Mobile Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Undergraduate, postgraduate and engineering students.",
        description: "Develop and maintain mobile applications, integrate APIs, debug applications and work with mobile development teams.",
        applicationUrl: "https://unstop.com/internships/mobile-app-developer-internship-atavishaala-1733391",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    {
        title: "Flutter / KMP Developer Intern",
        company: "Instient Private Limited",
        location: "Noida",
        workMode: "Hybrid",
        skills: ["Flutter", "Dart", "Kotlin", "REST APIs", "JSON", "Git", "Firebase", "SQLite", "Android", "iOS"],
        interest: "Mobile Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA", "Software Engineering"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Freshers or candidates pursuing Computer Science, IT, Software Engineering or related degrees.",
        description: "Develop mobile applications using Flutter or Kotlin Multiplatform and work with APIs, Firebase and application state management.",
        applicationUrl: "https://unstop.com/internships/flutter-developer-internship-instient-private-limited-1735225",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "Full Stack Developer Intern",
        company: "Evoc Labs",
        location: "Remote",
        workMode: "Remote",
        skills: ["JavaScript", "Node.js", "Express.js", "MongoDB", "Prisma", "Redis", "REST APIs", "Git"],
        interest: "Backend Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Freshers with JavaScript knowledge, Git familiarity and strong problem-solving skills.",
        description: "Build backend APIs, work with MongoDB, Prisma, Redis and third-party APIs while collaborating with frontend developers.",
        applicationUrl: "https://unstop.com/internships/full-stack-developer-intern-backend-focus-evoc-labs-1735403",
        source: "Unstop",
        deadline: "25 Aug 2026",
        status: "Active"
    },

    {
        title: "AI & Software Engineering Intern",
        company: "Lanmea",
        location: "Bangalore",
        workMode: "On-site",
        skills: ["AI", "Machine Learning", "LLM", "RAG", "AI Agents", "Frontend", "Backend", "Cloud", "Vector Databases"],
        interest: "Artificial Intelligence",
        education: ["B.Tech CSE", "B.Tech AI/ML", "B.Tech IT", "Data Science"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Final-year students or recent graduates in Computer Science, Engineering, Data Science or related fields.",
        description: "Work across AI, modern web development, LLMs, RAG, agents, workflow automation and data platforms.",
        applicationUrl: "https://unstop.com/internships/ai-software-engineering-internship-lanmea-1731978",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "AI QA Developer Intern",
        company: "Epicor Software Corporation",
        location: "Bangalore",
        workMode: "Hybrid",
        skills: ["Java", "Selenium", "JUnit", "TestNG", "REST Assured", "Maven", "Git", "Software Testing", "AI"],
        interest: "Software Testing",
        education: ["B.Tech CSE", "B.Tech IT", "M.Tech", "Computer Science"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Currently pursuing Bachelor's or Master's degree in Computer Science, Software Engineering, IT, AI or related field.",
        description: "Work on AI quality engineering, automation testing and Java-based software development.",
        applicationUrl: "https://unstop.com/internships/ai-qa-developer-intern-epicor-software-corporation-1731600",
        source: "Unstop",
        deadline: "20 Aug 2026",
        status: "Active"
    },

    {
        title: "DevOps Engineer Intern",
        company: "Fx31Labs Private Limited",
        location: "Ahmedabad",
        workMode: "On-site",
        skills: ["Linux", "Git", "GitHub", "Docker", "AWS", "Azure", "GCP", "CI/CD", "Bash", "Networking"],
        interest: "Cloud and DevOps",
        education: ["B.Tech CSE", "B.Tech IT", "Cloud Computing"],
        stipend: "Not disclosed",
        duration: "Not specified",
        eligibility: "Students with Linux, Git, Docker, cloud and basic networking knowledge.",
        description: "Work with cloud infrastructure, deployment, networking, Docker, CI/CD and DevOps automation.",
        applicationUrl: "https://unstop.com/internships/devops-engineer-internship-fx31labs-private-limited-1733352",
        source: "Unstop",
        deadline: "21 Aug 2026",
        status: "Active"
    },

    // =====================================================
    // ADDITIONAL CITY INTERNSHIPS
    // =====================================================

    {
        title: "Frontend Developer Intern",
        company: "Digital Solutions India",
        location: "Delhi",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with basic web development knowledge.",
        description: "Build responsive web interfaces and work with modern frontend technologies.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Backend Developer Intern",
        company: "TechNova Labs",
        location: "New Delhi",
        workMode: "Hybrid",
        skills: ["Node.js", "Express.js", "MongoDB", "REST API", "JavaScript", "Git"],
        interest: "Backend Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "₹12,000/month",
        duration: "3 Months",
        eligibility: "Students familiar with JavaScript and backend fundamentals.",
        description: "Develop APIs and backend services for web applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Web Development Intern",
        company: "Mumbai Digital Labs",
        location: "Mumbai",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "React", "GitHub"],
        interest: "Web Development",
        education: ["B.Tech CSE", "BCA", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Undergraduate students interested in web development.",
        description: "Create responsive websites and contribute to frontend development.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Data Analyst Intern",
        company: "Analytics Hub India",
        location: "Pune",
        workMode: "Hybrid",
        skills: ["Python", "Pandas", "Excel", "SQL", "Power BI"],
        interest: "Data Analytics",
        education: ["B.Tech CSE", "B.Tech IT", "BCA", "B.Sc Data Science"],
        stipend: "₹12,000/month",
        duration: "4 Months",
        eligibility: "Students with basic Python and SQL knowledge.",
        description: "Analyze datasets and create dashboards for business insights.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "AI Research Intern",
        company: "AI Innovation Labs",
        location: "Chennai",
        workMode: "On-site",
        skills: ["Python", "Machine Learning", "NumPy", "Pandas", "TensorFlow"],
        interest: "Artificial Intelligence",
        education: ["B.Tech CSE", "B.Tech AI/ML", "Data Science"],
        stipend: "₹15,000/month",
        duration: "6 Months",
        eligibility: "Students with Python and machine learning fundamentals.",
        description: "Assist in machine learning experiments and AI research projects.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Java Developer Intern",
        company: "Hyderabad Software Labs",
        location: "Hyderabad",
        workMode: "On-site",
        skills: ["Java", "Spring Boot", "SQL", "Git", "REST API"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹12,000/month",
        duration: "4 Months",
        eligibility: "Students with Java programming fundamentals.",
        description: "Develop Java backend services and REST APIs.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "React Developer Intern",
        company: "Bangalore Web Works",
        location: "Bengaluru",
        workMode: "Hybrid",
        skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "BCA", "B.Tech IT"],
        stipend: "₹15,000/month",
        duration: "3 Months",
        eligibility: "Students with basic React knowledge.",
        description: "Develop reusable React components and responsive web applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Full Stack Developer Intern",
        company: "Noida TechWorks",
        location: "Noida",
        workMode: "Hybrid",
        skills: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript"],
        interest: "Full Stack Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "₹14,000/month",
        duration: "4 Months",
        eligibility: "Students with web development projects.",
        description: "Work on complete web applications using the MERN stack.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "Greater Noida Technology Hub",
        location: "Greater Noida",
        workMode: "On-site",
        skills: ["Java", "Python", "SQL", "Git", "Problem Solving"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Engineering students with programming fundamentals.",
        description: "Contribute to software development and testing projects.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Frontend Engineering Intern",
        company: "Gurugram Digital Systems",
        location: "Gurugram",
        workMode: "Hybrid",
        skills: ["HTML", "CSS", "JavaScript", "React", "UI Design"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "BCA", "B.Tech IT"],
        stipend: "₹15,000/month",
        duration: "3 Months",
        eligibility: "Students interested in frontend engineering.",
        description: "Build user interfaces for web products.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Data Science Intern",
        company: "Kolkata Analytics",
        location: "Kolkata",
        workMode: "On-site",
        skills: ["Python", "Pandas", "NumPy", "SQL", "Machine Learning"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech AI/ML", "B.Sc Data Science"],
        stipend: "₹12,000/month",
        duration: "4 Months",
        eligibility: "Students with Python and statistics fundamentals.",
        description: "Work with datasets and machine learning models.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "AI Developer Intern",
        company: "Jaipur AI Labs",
        location: "Jaipur",
        workMode: "On-site",
        skills: ["Python", "AI", "Machine Learning", "NLP", "Git"],
        interest: "Artificial Intelligence",
        education: ["B.Tech CSE", "B.Tech AI/ML"],
        stipend: "₹12,000/month",
        duration: "3 Months",
        eligibility: "Students interested in AI development.",
        description: "Build AI prototypes and machine learning applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Python Developer Intern",
        company: "Lucknow Software Labs",
        location: "Lucknow",
        workMode: "Hybrid",
        skills: ["Python", "Django", "REST API", "SQL", "Git"],
        interest: "Backend Development",
        education: ["B.Tech CSE", "BCA", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with Python fundamentals.",
        description: "Develop backend services using Python.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Cloud Computing Intern",
        company: "Chandigarh Cloud Systems",
        location: "Chandigarh",
        workMode: "Hybrid",
        skills: ["AWS", "Linux", "Docker", "Git", "Cloud Computing"],
        interest: "Cloud and DevOps",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹12,000/month",
        duration: "4 Months",
        eligibility: "Students interested in cloud technologies.",
        description: "Learn cloud deployment and infrastructure management.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Python Data Intern",
        company: "Indore Data Systems",
        location: "Indore",
        workMode: "On-site",
        skills: ["Python", "Pandas", "NumPy", "SQL", "Excel"],
        interest: "Data Analytics",
        education: ["B.Tech CSE", "BCA", "B.Sc Data Science"],
        stipend: "₹9,000/month",
        duration: "3 Months",
        eligibility: "Students with Python basics.",
        description: "Clean, analyze and visualize business data.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Testing Intern",
        company: "Bhopal Quality Labs",
        location: "Bhopal",
        workMode: "On-site",
        skills: ["Manual Testing", "Selenium", "Java", "SQL", "Jira"],
        interest: "Software Testing",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "₹8,000/month",
        duration: "3 Months",
        eligibility: "Students interested in software testing.",
        description: "Test web applications and prepare testing reports.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Web Developer Intern",
        company: "Patna Digital Technologies",
        location: "Patna",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        interest: "Web Development",
        education: ["B.Tech CSE", "BCA", "B.Tech IT"],
        stipend: "₹8,000/month",
        duration: "3 Months",
        eligibility: "Students with basic web development skills.",
        description: "Develop and maintain business websites.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Web Development Intern",
        company: "Ranchi Tech Solutions",
        location: "Ranchi",
        workMode: "Hybrid",
        skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
        interest: "Web Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹9,000/month",
        duration: "3 Months",
        eligibility: "Students interested in web development.",
        description: "Create responsive websites and frontend components.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Development Intern",
        company: "Jamshedpur Tech Labs",
        location: "Jamshedpur",
        workMode: "On-site",
        skills: ["Java", "Python", "SQL", "Git", "OOP"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "4 Months",
        eligibility: "Engineering students with programming knowledge.",
        description: "Develop software modules and assist with testing.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Backend Development Intern",
        company: "Dhanbad Software Works",
        location: "Dhanbad",
        workMode: "On-site",
        skills: ["Node.js", "Express.js", "MongoDB", "REST API", "JavaScript"],
        interest: "Backend Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹9,000/month",
        duration: "3 Months",
        eligibility: "Students familiar with JavaScript.",
        description: "Build backend APIs and database integrations.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Frontend Developer Intern",
        company: "Mathura Digital Studio",
        location: "Mathura",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "React", "GitHub"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "BCA", "B.Tech IT"],
        stipend: "₹8,000/month",
        duration: "3 Months",
        eligibility: "Students with HTML, CSS and JavaScript knowledge.",
        description: "Create responsive interfaces for web applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Web Developer Intern",
        company: "Agra Web Technologies",
        location: "Agra",
        workMode: "Hybrid",
        skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
        interest: "Web Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹8,000/month",
        duration: "3 Months",
        eligibility: "Students interested in web development.",
        description: "Build websites and frontend components for clients.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Java Developer Intern",
        company: "Kanpur Software Systems",
        location: "Kanpur",
        workMode: "On-site",
        skills: ["Java", "Spring Boot", "SQL", "Git", "REST API"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "4 Months",
        eligibility: "Students with Java fundamentals.",
        description: "Develop Java applications and backend services.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "AI Developer Intern",
        company: "Varanasi AI Research",
        location: "Varanasi",
        workMode: "Hybrid",
        skills: ["Python", "Machine Learning", "NLP", "Pandas", "NumPy"],
        interest: "Artificial Intelligence",
        education: ["B.Tech CSE", "B.Tech AI/ML"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with Python and AI fundamentals.",
        description: "Develop AI prototypes and experiment with machine learning models.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Engineer Intern",
        company: "Meerut Technology Hub",
        location: "Meerut",
        workMode: "On-site",
        skills: ["Java", "Python", "SQL", "Git", "DSA"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Engineering students with programming skills.",
        description: "Work on software development and testing tasks.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Full Stack Developer Intern",
        company: "Ghaziabad Web Labs",
        location: "Ghaziabad",
        workMode: "Hybrid",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        interest: "Full Stack Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹12,000/month",
        duration: "4 Months",
        eligibility: "Students with web development projects.",
        description: "Build full-stack web applications using modern technologies.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Frontend Developer Intern",
        company: "Faridabad Digital Labs",
        location: "Faridabad",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "React", "Figma"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹9,000/month",
        duration: "3 Months",
        eligibility: "Students interested in frontend development.",
        description: "Develop responsive interfaces and improve user experience.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Python Developer Intern",
        company: "Kochi Software Labs",
        location: "Kochi",
        workMode: "Hybrid",
        skills: ["Python", "Django", "REST API", "SQL", "Git"],
        interest: "Backend Development",
        education: ["B.Tech CSE", "B.Tech IT", "BCA"],
        stipend: "₹12,000/month",
        duration: "3 Months",
        eligibility: "Students with Python fundamentals.",
        description: "Develop backend applications and APIs using Python.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Cloud Intern",
        company: "Bhubaneswar Cloud Labs",
        location: "Bhubaneswar",
        workMode: "On-site",
        skills: ["AWS", "Linux", "Docker", "Git", "Cloud Computing"],
        interest: "Cloud and DevOps",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹11,000/month",
        duration: "4 Months",
        eligibility: "Students interested in cloud computing.",
        description: "Assist with cloud deployment and infrastructure projects.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Data Science Intern",
        company: "Guwahati Analytics",
        location: "Guwahati",
        workMode: "Hybrid",
        skills: ["Python", "Pandas", "NumPy", "SQL", "Machine Learning"],
        interest: "Data Science",
        education: ["B.Tech CSE", "B.Tech AI/ML", "B.Sc Data Science"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students interested in data science.",
        description: "Analyze datasets and build basic predictive models.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Java Developer Intern",
        company: "Nagpur Software Labs",
        location: "Nagpur",
        workMode: "On-site",
        skills: ["Java", "Spring", "SQL", "Git", "REST API"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with Java fundamentals.",
        description: "Develop backend services and software modules.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Frontend Developer Intern",
        company: "Surat Web Solutions",
        location: "Surat",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹9,000/month",
        duration: "3 Months",
        eligibility: "Students with frontend development knowledge.",
        description: "Create modern responsive web interfaces.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "Vadodara Tech Labs",
        location: "Vadodara",
        workMode: "Hybrid",
        skills: ["Java", "Python", "SQL", "Git", "OOP"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "4 Months",
        eligibility: "Engineering students with programming knowledge.",
        description: "Work on software development and application testing.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Machine Learning Intern",
        company: "Coimbatore AI Labs",
        location: "Coimbatore",
        workMode: "On-site",
        skills: ["Python", "Machine Learning", "Pandas", "NumPy", "Scikit-learn"],
        interest: "Machine Learning",
        education: ["B.Tech CSE", "B.Tech AI/ML"],
        stipend: "₹12,000/month",
        duration: "4 Months",
        eligibility: "Students with Python and ML knowledge.",
        description: "Build machine learning models and analyze datasets.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Engineer Intern",
        company: "Visakhapatnam TechWorks",
        location: "Visakhapatnam",
        workMode: "Hybrid",
        skills: ["Java", "Python", "SQL", "Git", "DSA"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with programming fundamentals.",
        description: "Contribute to software engineering projects.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Mobile App Developer Intern",
        company: "Mysore Mobile Labs",
        location: "Mysore",
        workMode: "On-site",
        skills: ["Flutter", "Dart", "Firebase", "REST API", "Git"],
        interest: "Mobile Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students interested in mobile development.",
        description: "Develop cross-platform mobile applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Cloud Engineer Intern",
        company: "Dehradun Cloud Technologies",
        location: "Dehradun",
        workMode: "Hybrid",
        skills: ["AWS", "Linux", "Docker", "Git", "CI/CD"],
        interest: "Cloud and DevOps",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹11,000/month",
        duration: "4 Months",
        eligibility: "Students with basic Linux and cloud knowledge.",
        description: "Assist with cloud infrastructure and deployment automation.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Web Developer Intern",
        company: "Amritsar Digital Works",
        location: "Amritsar",
        workMode: "On-site",
        skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
        interest: "Web Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹8,000/month",
        duration: "3 Months",
        eligibility: "Students with basic web development skills.",
        description: "Develop websites and responsive user interfaces.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "React Developer Intern",
        company: "Ludhiana Software Hub",
        location: "Ludhiana",
        workMode: "Hybrid",
        skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
        interest: "Frontend Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with basic React knowledge.",
        description: "Develop frontend components and responsive web applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Backend Developer Intern",
        company: "Nashik Backend Labs",
        location: "Nashik",
        workMode: "On-site",
        skills: ["Node.js", "Express.js", "MongoDB", "REST API", "JavaScript"],
        interest: "Backend Development",
        education: ["B.Tech CSE", "BCA"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with JavaScript and backend knowledge.",
        description: "Develop REST APIs and database-driven applications.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "Software Developer Intern",
        company: "Rajkot Technology Solutions",
        location: "Rajkot",
        workMode: "On-site",
        skills: ["Java", "Python", "SQL", "Git", "Problem Solving"],
        interest: "Software Development",
        education: ["B.Tech CSE", "B.Tech IT"],
        stipend: "₹9,000/month",
        duration: "3 Months",
        eligibility: "Engineering students with programming fundamentals.",
        description: "Assist with software development and testing.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    },

    {
        title: "AI Intern",
        company: "Raipur AI Solutions",
        location: "Raipur",
        workMode: "Hybrid",
        skills: ["Python", "Machine Learning", "NLP", "Pandas", "NumPy"],
        interest: "Artificial Intelligence",
        education: ["B.Tech CSE", "B.Tech AI/ML"],
        stipend: "₹10,000/month",
        duration: "3 Months",
        eligibility: "Students with Python and AI fundamentals.",
        description: "Assist in developing AI-powered applications and prototypes.",
        applicationUrl: "https://unstop.com/",
        source: "Prototype",
        deadline: "30 Sep 2026",
        status: "Active"
    }
];


// =====================================================
// SEED DATABASE
// =====================================================

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Internship.deleteMany({});

        await Internship.insertMany(internships);

        console.log(
            `${internships.length} internship records inserted successfully.`
        );

        await mongoose.disconnect();

        console.log("MongoDB connection closed");

    } catch (error) {

        console.error("Seeding failed:", error);

        process.exit(1);
    }
}

seedDatabase();