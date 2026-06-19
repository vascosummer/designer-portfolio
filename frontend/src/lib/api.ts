import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  timeout: 15000,
});

export interface Project {
  id: string;
  slug: string;
  index: number;
  year: number;
  title: string;
  role: string;
  disciplines: string[];
  outcome: string;
  description: string;
  hero_image: string;
  color: string;
  is_featured: boolean;
}

export interface PracticeChapter {
  id: string;
  number: string;
  title: string;
  discipline: string;
  body: string;
}

export interface StudioInfo {
  name: string;
  title: string;
  location: string;
  availability: string;
  email: string;
  bio: string;
  principles: string[];
  tools: string[];
  now: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  engagement_type: string;
  budget_range?: string;
  timeline?: string;
  message: string;
}
