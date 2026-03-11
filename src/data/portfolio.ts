export type ZoneKey = 'entry' | 'about' | 'skills' | 'projects' | 'timeline' | 'blog' | 'contact';

export const ZONE_VISIBILITY_THRESHOLD = 50;

export const zonePositions: Record<ZoneKey, { z: number }> = {
    entry: { z: 0 },
    about: { z: -80 },
    skills: { z: -160 },
    projects: { z: -260 },
    timeline: { z: -340 },
    blog: { z: -420 },
    contact: { z: -500 }
};

export const personalInfo = {
    name: 'Saumay Pathak',
    role: 'Full Stack Architect',
    title: 'Full Stack Architect',
    email: 'Rajgkp2932002@gmail.com',
    phone: '+91-7905789690',
    location: 'Gurugram, India',
    status: 'Available for freelance',
    description: 'Specializing in scalable backend systems and modern web architectures.',
    bio: [
        'I\'m Saumay Pathak, a Full-Stack Architect based in Gurugram, India. With a deep passion for open-source and scalable systems, I bridge the gap between complex backend logic and intuitive frontend design.',
        'My journey began with PHP and MySQL, but has since evolved into a comprehensive mastery of modern web technologies. I don\'t just write code; I architect solutions that solve real-world business problems efficiently.'
    ],
    social: {
        github: 'https://github.com/saumay',
        linkedin: 'https://linkedin.com/in/saumay',
        twitter: 'https://twitter.com/saumay'
    }
};

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: 'server' | 'layout' | 'smartphone';
}

export const services: Service[] = [
    {
        id: '1',
        title: 'Backend Engineering',
        description: 'Scalable microservices and robust API architectures using Laravel and Node.js.',
        icon: 'server'
    },
    {
        id: '2',
        title: 'Frontend Development',
        description: 'Immersive and responsive user interfaces with React and Next.js.',
        icon: 'layout'
    },
    {
        id: '3',
        title: 'Mobile Applications',
        description: 'Cross-platform mobile apps for iOS and Android using React Native.',
        icon: 'smartphone'
    }
];

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'tools';
}

export const skills: Skill[] = [
    // Backend & Architecture
    { id: '1', name: 'PHP', category: 'backend' },
    { id: '2', name: 'Laravel', category: 'backend' },
    { id: '3', name: 'MySQL', category: 'backend' },
    { id: '4', name: 'RESTful APIs', category: 'backend' },
    { id: '5', name: 'Webhooks', category: 'backend' },
    { id: '6', name: 'PostgreSQL', category: 'backend' },
    { id: '7', name: 'Redis', category: 'backend' },
    { id: '8', name: 'Go', category: 'backend' },
    // Frontend & UI
    { id: '9', name: 'Next.js', category: 'frontend' },
    { id: '10', name: 'React', category: 'frontend' },
    { id: '11', name: 'TypeScript', category: 'frontend' },
    { id: '12', name: 'Tailwind CSS', category: 'frontend' },
    { id: '13', name: 'Vue.js', category: 'frontend' },
    // Mobile & Tools (mapped to tools for now or split if needed)
    { id: '14', name: 'React Native', category: 'frontend' },
    { id: '15', name: 'Docker', category: 'tools' },
    { id: '16', name: 'Git', category: 'tools' },
    { id: '17', name: 'Nginx', category: 'tools' },
    { id: '18', name: 'Linux', category: 'tools' }
];

export interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string[];
}

export const experiences: Experience[] = [
    {
        id: '1',
        role: 'PHP Developer',
        company: 'Codeforge Developers IT Solutions',
        duration: 'Mar 2025 – Present',
        description: [
            'Developing Laravel backend systems for HRMS and recruitment platforms.',
            'Implementing secure REST APIs, authentication, RBAC, and scalable architecture.'
        ]
    },
    {
        id: '2',
        role: 'Web Developer',
        company: 'Limetray',
        duration: 'Nov 2024 – Feb 2025',
        description: [
            'Built PHP & MySQL backend services.',
            'Optimized React UI for SEO and performance.'
        ]
    },
    {
        id: '3',
        role: 'Backend Developer',
        company: 'Nector Foods Pvt. Ltd.',
        duration: 'Oct 2023 – Nov 2024',
        description: [
            'Developed WMS & EMS systems.',
            'Implemented WhatsApp automation and Webhooks integration.'
        ]
    }
];

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    link?: string;
    github?: string;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'HRMS & Recruitment',
        category: 'Backend',
        description: 'A comprehensive backend system for managing human resources and recruitment processes. Built with Laravel, featuring complex RBAC and secure API endpoints.',
        techStack: ['Laravel', 'MySQL', 'PHP', 'REST API']
    },
    {
        id: '2',
        title: 'Warehouse Management',
        category: 'Backend',
        description: 'Real-time inventory and warehouse management system with automated WhatsApp notifications via Webhooks.',
        techStack: ['PHP', 'MySQL', 'WhatsApp API', 'WebSockets']
    },
    {
        id: '3',
        title: 'Mobile E-commerce',
        category: 'Mobile',
        description: 'API-driven backend for a mobile application built with React Native. Handles payments via Razorpay and shipping via Shiprocket.',
        techStack: ['Laravel', 'React Native', 'Razorpay', 'Shiprocket']
    }
];

export interface BlogPost {
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
    tags: string[];
    link?: string;
}

export const blogPosts: BlogPost[] = [
    {
        title: 'Scalable Architecture with Laravel',
        date: 'Oct 15, 2025',
        readTime: '5 min read',
        excerpt: 'Best practices for building robust and scalable applications using the Laravel framework.',
        tags: ['Laravel', 'PHP', 'Architecture']
    },
    {
        title: 'Real-time Systems with WebSockets',
        date: 'Sep 28, 2025',
        readTime: '8 min read',
        excerpt: 'Implementing real-time features in PHP applications without heavy overhead.',
        tags: ['WebSockets', 'Real-time', 'Backend']
    },
    {
        title: 'Optimizing Database Queries',
        date: 'Aug 10, 2025',
        readTime: '6 min read',
        excerpt: 'Techniques for improving database performance in high-traffic applications.',
        tags: ['MySQL', 'Database', 'Performance']
    }
];
