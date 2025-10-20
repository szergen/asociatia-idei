export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: "admin" | "member" | "student";
    createdAt: Date;
    updatedAt: Date;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    category: string;
    inStock: boolean;
    metadata?: Record<string, any>;
}
export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number;
    level: "beginner" | "intermediate" | "advanced";
    tags: string[];
    thumbnail?: string;
    isPublished: boolean;
}
export interface NavigationItem {
    label: string;
    href: string;
    children?: NavigationItem[];
    external?: boolean;
}
export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    navigation: NavigationItem[];
    social: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
}
