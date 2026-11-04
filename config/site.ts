/**
 * SITE CONFIGURATION — the single file to edit for rebranding and repricing.
 *
 * Every page reads brand, instructor, contact, palette and price information from here.
 * Change values below, restart `npm run dev`, and the whole site updates.
 */

export type Currency = "INR" | "USD";

export interface Price {
  INR: number;
  USD: number;
}

export interface CoursePricing {
  /** Self-Study: full course access, no live support. */
  selfStudy: Price;
  /** Premium: Self-Study + instructor Q&A support + extra mocks. */
  premium: Price;
  /** Optional "was" price shown struck through (set to null to hide). */
  listPrice?: Price | null;
  /** Access duration in months. */
  accessMonths: number;
}

export interface BundlePlan {
  id: string;
  name: string;
  description: string;
  courseSlugs: string[];
  price: Price;
  listPrice?: Price | null;
  accessMonths: number;
  highlight?: boolean;
}

/** Brand name — change here; it is reused below (e.g. in the trademark disclaimer). */
const BRAND_NAME = "[BRAND NAME]";

export const siteConfig = {
  brand: {
    name: BRAND_NAME,
    shortName: "[BRAND]",
    tagline: "Clear, rigorous preparation for CFA®, FRM® and real-world finance skills.",
    description:
      "Structured video courses, original practice questions, mock exams, flashcards and calculators for CFA®, FRM® and practical finance skills — taught by a working finance instructor.",
    /** Used for the generated logo mark (initials inside a rounded square). */
    logoInitials: "BN",
    url: "https://example.com", // INTEGRATION: set to the production domain
  },

  instructor: {
    name: "[INSTRUCTOR NAME]",
    title: "Lead Instructor",
    credentials: "[Credentials placeholder - e.g. CFA charterholder, FRM]",
    shortBio:
      "[Instructor bio placeholder] A finance professional and teacher who turns dense curriculum into clear, exam-ready intuition.",
    longBio: [
      "[Instructor bio placeholder - paragraph 1] Describe your professional background: roles, markets, years of experience.",
      "[Instructor bio placeholder - paragraph 2] Describe your teaching background and philosophy: why you explain things the way you do.",
      "[Instructor bio placeholder - paragraph 3] Describe your own exam journey and what you want every student to walk away with.",
    ],
    initials: "IN",
  },

  contact: {
    email: "hello@example.com", // placeholder
    supportEmail: "support@example.com", // placeholder
    phone: "+91 00000 00000", // placeholder
    address: "[Business address placeholder]",
    responseTime: "within 1-2 business days",
  },

  social: {
    youtube: "https://youtube.com/@placeholder",
    linkedin: "https://linkedin.com/in/placeholder",
    instagram: "https://instagram.com/placeholder",
    x: "https://x.com/placeholder",
    telegram: "https://t.me/placeholder",
  },

  /**
   * Colour palette. Values are injected as CSS variables at runtime (see app/layout.tsx),
   * so changing them here recolours the entire site in light and dark mode.
   */
  palette: {
    light: {
      primary: "#1d4ed8", // brand blue
      primaryForeground: "#ffffff",
      accent: "#0f766e", // teal
      accentForeground: "#ffffff",
      highlight: "#b45309", // amber (badges, streaks)
      background: "#f8fafc",
      surface: "#ffffff",
      surfaceMuted: "#f1f5f9",
      foreground: "#0f172a",
      muted: "#475569",
      border: "#e2e8f0",
      success: "#15803d",
      warning: "#b45309",
      danger: "#b91c1c",
    },
    dark: {
      primary: "#60a5fa",
      primaryForeground: "#0b1220",
      accent: "#2dd4bf",
      accentForeground: "#04201d",
      highlight: "#fbbf24",
      background: "#0b1220",
      surface: "#111a2e",
      surfaceMuted: "#17223a",
      foreground: "#e2e8f0",
      muted: "#94a3b8",
      border: "#24314d",
      success: "#4ade80",
      warning: "#fbbf24",
      danger: "#f87171",
    },
  },

  currency: {
    default: "INR" as Currency,
    symbols: { INR: "₹", USD: "$" } as Record<Currency, string>,
    locales: { INR: "en-IN", USD: "en-US" } as Record<Currency, string>,
    /** Prices are charged in INR; USD is a display convenience. */
    note: "Prices are charged in INR. USD amounts are shown for reference only.",
  },

  /** Per-course pricing, keyed by course slug (must match /content/courses/<slug>). */
  coursePricing: {
    "cfa-level-1": {
      selfStudy: { INR: 14999, USD: 179 },
      premium: { INR: 24999, USD: 299 },
      listPrice: { INR: 29999, USD: 359 },
      accessMonths: 12,
    },
    "cfa-level-2": {
      selfStudy: { INR: 17999, USD: 215 },
      premium: { INR: 27999, USD: 335 },
      listPrice: { INR: 32999, USD: 395 },
      accessMonths: 12,
    },
    "cfa-level-3": {
      selfStudy: { INR: 17999, USD: 215 },
      premium: { INR: 27999, USD: 335 },
      listPrice: { INR: 32999, USD: 395 },
      accessMonths: 12,
    },
    "frm-part-1": {
      selfStudy: { INR: 12999, USD: 155 },
      premium: { INR: 21999, USD: 265 },
      listPrice: { INR: 25999, USD: 309 },
      accessMonths: 12,
    },
    "frm-part-2": {
      selfStudy: { INR: 14999, USD: 179 },
      premium: { INR: 23999, USD: 289 },
      listPrice: { INR: 27999, USD: 335 },
      accessMonths: 12,
    },
    "excel-for-finance": {
      selfStudy: { INR: 2999, USD: 39 },
      premium: { INR: 4999, USD: 59 },
      listPrice: null,
      accessMonths: 24,
    },
    "financial-modeling": {
      selfStudy: { INR: 5999, USD: 75 },
      premium: { INR: 8999, USD: 109 },
      listPrice: null,
      accessMonths: 24,
    },
    "python-for-finance": {
      selfStudy: { INR: 4999, USD: 59 },
      premium: { INR: 7999, USD: 95 },
      listPrice: null,
      accessMonths: 24,
    },
  } as Record<string, CoursePricing>,

  planFeatures: {
    selfStudy: [
      "Full video lecture library",
      "Lesson notes with formulas",
      "End-of-lesson quizzes",
      "Question bank + analytics",
      "Flashcards with spaced repetition",
      "Formula library + calculators",
      "Study planner",
    ],
    premium: [
      "Everything in Self-Study",
      "Instructor Q&A on every lesson",
      "Full-length mock exams with topic reports",
      "Monthly live doubt-clearing session",
      "Priority email support",
      "Completion certificate",
    ],
  },

  bundles: [
    {
      id: "cfa-complete",
      name: "CFA® Complete Path",
      description: "Levels I, II and III with Premium support for each level.",
      courseSlugs: ["cfa-level-1", "cfa-level-2", "cfa-level-3"],
      price: { INR: 59999, USD: 719 },
      listPrice: { INR: 83997, USD: 969 },
      accessMonths: 36,
      highlight: true,
    },
    {
      id: "frm-complete",
      name: "FRM® Complete Path",
      description: "Part I and Part II with Premium support.",
      courseSlugs: ["frm-part-1", "frm-part-2"],
      price: { INR: 37999, USD: 455 },
      listPrice: { INR: 45998, USD: 554 },
      accessMonths: 24,
    },
    {
      id: "skills-pro",
      name: "Finance Skills Pro",
      description: "Excel, Financial Modeling and Python for Finance together.",
      courseSlugs: ["excel-for-finance", "financial-modeling", "python-for-finance"],
      price: { INR: 9999, USD: 119 },
      listPrice: { INR: 13997, USD: 173 },
      accessMonths: 24,
    },
  ] as BundlePlan[],

  /** Mock coupon codes for the mock checkout. INTEGRATION: validate coupons server-side. */
  coupons: [
    { code: "WELCOME10", percentOff: 10, description: "10% off any plan", active: true },
    { code: "EARLYBIRD25", percentOff: 25, description: "Launch offer - 25% off", active: true },
    { code: "STUDENT15", percentOff: 15, description: "Student discount", active: true },
  ],

  legal: {
    trademarkDisclaimer:
      `CFA® and Chartered Financial Analyst® are trademarks owned by CFA Institute. FRM® is a trademark of GARP. ${BRAND_NAME} is not affiliated with or endorsed by CFA Institute or GARP.`,
    companyName: "[Legal entity name placeholder]",
    jurisdiction: "[Jurisdiction placeholder - e.g. India]",
    lastUpdated: "2026-11-04",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function formatPrice(price: Price, currency: Currency): string {
  const amount = price[currency];
  return new Intl.NumberFormat(siteConfig.currency.locales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
