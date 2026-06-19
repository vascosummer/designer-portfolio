/**
 * Content data — Lorem ipsum placeholders.
 * Will be hydrated from backend /api/projects on mount.
 * This file provides the structure and fallback content.
 */

export const SITE = {
  designerName: "Atelier Nomine",
  role: "Senior UI Lead",
  discipline: "Brand Designer",
  location: "Lisbon",
  availability: "Q2",
  email: "hello@ateliernomine.studio",
  thesisStart: "I design the",
  thesisAccent: "surfaces",
  thesisEnd: "people trust.",
  subline:
    "Twelve years building product interfaces and brand systems for teams that ship to millions. Lorem ipsum dolor sit amet, consectetur adipiscing.",
};

export const ACTS = [
  { roman: "I", name: "Opening Frame" },
  { roman: "II", name: "The Reel" },
  { roman: "III", name: "Selected Work" },
  { roman: "IV", name: "The Practice" },
  { roman: "V", name: "Recognition" },
  { roman: "VI", name: "Closing Frame" },
];

export const PROJECTS_FALLBACK = [
  {
    id: "p1",
    slug: "lorem-protocol",
    index: 1,
    year: 2025,
    title: "Lorem Protocol",
    role: "UI Lead, System Architecture",
    disciplines: ["Product", "Design System"],
    outcome:
      "Rebuilt the identity system that now ships across fourteen markets.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    hero_image: "https://images.unsplash.com/photo-1635776063043-ca3d420fac39?w=1600&q=80",
    color: "#2A2520",
    is_featured: true,
  },
  {
    id: "p2",
    slug: "ipsum-financial",
    index: 2,
    year: 2024,
    title: "Ipsum Financial",
    role: "Creative Direction",
    disciplines: ["Brand", "Product"],
    outcome: "A complete brand reposition that doubled qualified inbound.",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    hero_image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1600&q=80",
    color: "#1A2128",
    is_featured: true,
  },
  {
    id: "p3",
    slug: "dolor-studio",
    index: 3,
    year: 2024,
    title: "Dolor Studio",
    role: "UI Lead",
    disciplines: ["Product", "UI"],
    outcome: "Shipped the editor surface used by 40k creators daily.",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    hero_image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=1600&q=80",
    color: "#2A1B1B",
    is_featured: true,
  },
  {
    id: "p4",
    slug: "consectetur-os",
    index: 4,
    year: 2023,
    title: "Consectetur OS",
    role: "Design Systems Lead",
    disciplines: ["Design System", "UI"],
    outcome: "One library, 280 components, twelve teams. Documented end-to-end.",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    hero_image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1600&q=80",
    color: "#152120",
    is_featured: true,
  },
  {
    id: "p5",
    slug: "adipiscing-labs",
    index: 5,
    year: 2023,
    title: "Adipiscing Labs",
    role: "Brand & Identity",
    disciplines: ["Brand"],
    outcome: "A wordmark and identity adopted across seven product surfaces.",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    hero_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    color: "#28210F",
    is_featured: true,
  },
  {
    id: "p6",
    slug: "elit-foundation",
    index: 6,
    year: 2022,
    title: "Elit Foundation",
    role: "Creative Direction, UI",
    disciplines: ["Brand", "Product", "UI"],
    outcome: "A non-profit platform now serving more than 2M monthly.",
    description:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
    hero_image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1600&q=80",
    color: "#0E0E0E",
    is_featured: true,
  },
];

export const PRACTICE_CHAPTERS = [
  {
    id: "c1",
    number: "01",
    title: "On systems that disappear",
    discipline: "Design Systems",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The best systems are the ones nobody notices — they hold the work up without asking to be admired. Sed do eiusmod tempor incididunt.",
  },
  {
    id: "c2",
    number: "02",
    title: "On products that earn trust",
    discipline: "Product Design",
    body:
      "Ut enim ad minim veniam, quis nostrud exercitation. Trust compounds, slowly, in details no roadmap will name. Laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "c3",
    number: "03",
    title: "On interfaces with posture",
    discipline: "UI Design",
    body:
      "Duis aute irure dolor in reprehenderit in voluptate velit. An interface has a stance long before it has a feature. Esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "c4",
    number: "04",
    title: "On brands that endure",
    discipline: "Branding",
    body:
      "Excepteur sint occaecat cupidatat non proident. Brands are not built; they are deposited, season after season, by the consistency of small decisions.",
  },
  {
    id: "c5",
    number: "05",
    title: "On directing the room",
    discipline: "Creative Direction",
    body:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum. To direct is to subtract — to leave only the moves that say what the work is for.",
  },
];

export const CLIENTS = [
  "LOREM",
  "IPSUM CO.",
  "DOLOR LABS",
  "AMET INC.",
  "ELIT GROUP",
  "TEMPOR",
  "INCIDIDUNT",
  "MAGNA",
  "ALIQUA",
  "VENIAM",
];

export const AWARDS =
  "AWWWARDS SOTD  ·  FWA  ·  TYPE DIRECTORS CLUB  ·  2023–2025";

export const QUOTE = {
  body: "The most rigorous designer I have worked with. Builds systems the way an architect builds buildings.",
  attribution: "Lorem Director, Ipsum Studio",
};
