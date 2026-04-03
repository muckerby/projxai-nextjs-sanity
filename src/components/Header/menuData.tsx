import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Services",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "AI Consulting & Strategy",
        path: "/services/ai-consulting",
        newTab: false,
      },
      {
        id: 22,
        title: "AI Implementation",
        path: "/services/ai-implementation",
        newTab: false,
      },
      {
        id: 23,
        title: "AI Content Creation",
        path: "/services/ai-content",
        newTab: false,
      },
      {
        id: 24,
        title: "AI Tools & Automation",
        path: "/services/ai-automation",
        newTab: false,
      },
      {
        id: 25,
        title: "AI Infrastructure & Hosting",
        path: "/services/ai-infrastructure",
        newTab: false,
      },
      {
        id: 26,
        title: "All Services",
        path: "/services",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "Tools",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "ROAS Calculator",
        path: "/tools/roas-calculator",
        newTab: false,
      },
      {
        id: 32,
        title: "Competitor Espionage Engine",
        path: "/tools/competitor-espionage-engine",
        newTab: false,
      },
      {
        id: 33,
        title: "All Tools",
        path: "/tools",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 5,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 6,
    title: "Work With Us",
    path: "/work-with-us",
    newTab: false,
  },
];
export default menuData;
