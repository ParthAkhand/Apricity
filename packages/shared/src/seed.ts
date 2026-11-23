import type { ProductInput, Settings } from "./index";

/** Seed + offline fallback for the web app. Facts follow CLAUDE.md section 1 exactly. */
export const seedSettings: Settings = {
  name: "Apricity Digital",
  address: "206, Gulab Bagh Colony, Indore, 452010 MP",
  phone: "+91 9111 8999 09",
  email: "info@apricitydigital.in",
  parentCompany: "Human Matrix Securite",
  founder: { name: "Capt. Sunpreet Singh", title: "CEO" },
  // Old-site stats, kept as given; the Director must confirm them.
  stats: [
    { value: "11+", label: "Cities", verified: false },
    { value: "40+", label: "Communities", verified: false },
    { value: "200+", label: "Team Members", verified: false },
  ],
  tagline: "Redefining Cities with AI-Driven Innovation.",
  brandLine: "Smarter Solutions",
};

const noContent = { headline: "", problem: "", outcome: "", steps: [], faq: [], notes: "" };

export const seedProducts: ProductInput[] = [
  {
    slug: "matrix-track-2",
    name: "Matrix Track 2.0",
    tagline: "Integrated Command & Control Centre for cities and enterprises",
    summary:
      "One platform for attendance, sanitation audits, collection monitoring, processing, surveys and a command dashboard with a Commissioner View.",
    audience: [
      "Municipal commissioners (Nagar Nigam / ULBs)",
      "Enterprise heads",
      "Field supervisors and sector in-charges",
    ],
    modules: [
      { title: "Matrix Track", description: "Facial attendance for the field workforce." },
      { title: "Swachh Parvv", description: "Civic sanitation audit with geo-tagged photos and hygiene scoring." },
      { title: "Task Force", description: "Collection and vehicle monitoring." },
      { title: "MRF and processing", description: "Monitoring for material recovery and processing." },
      { title: "Survekshan", description: "Surveys and ranking." },
      { title: "Command dashboard", description: "Ward scorecards and a Commissioner View." },
    ],
    features: [
      "Live GIS asset map",
      "Facial attendance",
      "Restroom hygiene scoring",
      "Litter-bin monitoring",
      "Ward scorecards",
      "Separate ULB and Commissioner dashboards whose figures match",
    ],
    metrics: [
      { label: "Hygiene score scale", value: "1 to 10" },
      { label: "Daily check coverage", value: "20%" },
    ],
    media: {},
    content: {
      headline: "Every ward, asset and workforce shift in one command view.",
      problem:
        "Sanitation and field operations run across many teams and sources, so leaders see late, partial figures.",
      outcome:
        "One platform where field data, audits and attendance roll up into dashboards that match from ULB to Commissioner.",
      steps: [
        { title: "Capture", description: "A field supervisor takes a geo-tagged photo of the asset." },
        { title: "Score", description: "AI gives a hygiene score from 1 to 10." },
        { title: "Approve", description: "The Sector In-charge reviews and approves." },
        { title: "Review", description: "The City Commissioner reviews. Planned versus actual manpower drives penalty deductions." },
      ],
      faq: [
        {
          q: "How is coverage of assets achieved?",
          a: "Each Daroga covers 20% of assigned assets daily, and the SI checks and approves 20% of those reports daily. This gives 100% coverage 5 times a month.",
        },
        {
          q: "How quickly can a city go live?",
          a: "Go-live on a city's own data takes days. Measurable results appear in about 2 weeks, once all workforce and locations are registered.",
        },
        {
          q: "What counts as an asset?",
          a: "Assets include litter bins, beats and toilets.",
        },
      ],
      notes: "// CONFIRM: module descriptions are summarised from the brief.",
    },
    landingType: "INTERNAL",
    externalUrl: null,
    order: 1,
    published: true,
  },
  {
    slug: "matrix-track",
    name: "Matrix Track",
    tagline: "Face-recognition attendance for field crews, classrooms and enterprises",
    summary:
      "Facial recognition attendance with 1:1 and 1:N group mode, geotagging and leave management. The entry module of Matrix Track 2.0.",
    audience: ["Municipal field workforce", "Enterprises", "Institutions"],
    modules: [
      { title: "1:1 attendance", description: "Individual facial recognition check-in." },
      { title: "1:N group mode", description: "Mark a whole crew or classroom in one capture." },
      { title: "Geotagging", description: "Each mark carries its location." },
      { title: "Leave management", description: "Track and approve leave." },
    ],
    features: ["Facial recognition", "Group attendance", "Geotagged marks", "Leave management"],
    metrics: [],
    media: {},
    content: {
      headline: "Attendance you can verify, wherever the work happens.",
      problem: "Paper and manual registers are slow to compile and easy to dispute.",
      outcome: "Verified, location-stamped attendance that rolls up into reports.",
      steps: [
        { title: "Enrol", description: "Register staff or students." },
        { title: "Capture", description: "Mark attendance one by one or as a group." },
        { title: "Verify", description: "Face match and location are recorded." },
        { title: "Report", description: "Attendance and leave roll up for managers." },
      ],
      faq: [
        { q: "Is Matrix Track part of Matrix Track 2.0?", a: "Yes. It is the entry module of Matrix Track 2.0." },
        { q: "Can it mark a group at once?", a: "Yes, in 1:N group mode." },
      ],
      notes: "",
    },
    landingType: "INTERNAL",
    externalUrl: null,
    order: 2,
    published: true,
  },
  {
    slug: "insstanto",
    name: "Insstanto",
    tagline: "On-demand home cleaning, maid, driver, electrical and security services",
    summary: "An on-demand services marketplace for homes and businesses.", // CONFIRM wording against insstanto.com (client-rendered, only its title was readable)
    audience: [],
    modules: [],
    features: [],
    metrics: [],
    media: {},
    content: noContent,
    landingType: "EXTERNAL",
    externalUrl: "https://insstanto.com/",
    order: 3,
    published: true,
  },
];
