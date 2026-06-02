import { CONTACT_EMAILS, CONTACT_PHONES, TAX_CLASSIFICATION } from "@/lib/contact-info";
import { MAXLABS_SERVICE_AREAS, MAXLABS_TAGLINE } from "@/lib/brand-messaging";

export const MAXLABS_COMPANY = {
  legalName: "MAXLABS I.T. SOLUTIONS",
  tagline: MAXLABS_TAGLINE,
  description:
    "A Philippine technology startup helping small and medium businesses fix profit leaks, streamline operations, and modernize through practical digitalization, workflow automation, and scalable software.",
  heroSummary:
    "We build scalable, AI-powered apps and practical software systems that streamline operations, reduce manual work, and help small-to-medium businesses and growth-stage teams make faster, clearer decisions.",
  focusAreas: ["Digitalization", "Automation", "Scalable Growth"] as const,
  mission:
    "Help businesses maximize potential through secure, practical digital solutions that simplify operations and deliver measurable results.",
  vision:
    "Be the trusted digital transformation partner for modern Filipino businesses, delivering automation-first systems that improve efficiency and enable sustainable scale.",
  primaryMarket:
    "Small and medium businesses, service-based companies, and growth-stage organizations looking to fix profit leaks and scale operations",
  taxClassification: TAX_CLASSIFICATION,
  commercialCapability:
    "Authorized to issue Service Receipts for qualified client transactions",
  location: "Philippines (PH-Based)",
} as const;

export const MAXLABS_SERVICES = [
  {
    title: "Website Landing Pages",
    summary:
      "Conversion-focused pages that communicate your offer clearly and turn visitors into qualified leads.",
    details:
      "Craft fast, responsive landing experiences with clear messaging, trust signals, and strong calls to action—optimized for discovery, credibility, and inquiry capture from day one.",
  },
  {
    title: "Custom Web Application Development",
    summary: "Tailored systems for operations, administration, and service delivery needs.",
    details:
      "We design and build bespoke web platforms around your workflows—from enrollment and scheduling to internal admin tools—so teams spend less time on spreadsheets and more time serving customers.",
  },
  {
    title: "Mobile Applications",
    summary: "Cross-platform apps for customers and field teams, built for real-world usage and connectivity.",
    details:
      "Ship iOS and Android experiences tailored to how your users work—whether self-service for customers or offline-capable tools for field staff—with secure sync back to your core systems.",
  },
  {
    title: "Cloud and Integration Services",
    summary: "Cloud-ready architecture with API and third-party integration support.",
    details:
      "Deploy on reliable cloud infrastructure with secure APIs and third-party connectors so your systems share data cleanly, scale with demand, and stay maintainable as integrations grow.",
  },
  {
    title: "Dashboards and Reporting",
    summary: "Decision-ready visibility across key functions through practical data views.",
    details:
      "Build focused dashboards that surface the metrics leadership and operations teams need—filtered by branch, period, or role—without wading through raw exports or disconnected reports.",
  },
  {
    title: "Workflow Automation",
    summary: "Automated approvals, task routing, and notifications to remove repetitive overhead.",
    details:
      "Map repetitive handoffs into reliable automated flows with clear ownership, status tracking, and alerts—reducing delays, missed steps, and manual follow-ups across departments.",
  },
  {
    title: "CRM/ERP and Internal Systems",
    summary: "Role-based business modules for records, transactions, and accountable workflows.",
    details:
      "Centralize customer records, transactions, and operational data in role-aware modules so every handoff is traceable, auditable, and accessible to the right people at the right time.",
  },
  {
    title: "Security Audits",
    summary:
      "Structured review of access, data handling, and infrastructure with prioritized remediation guidance.",
    details:
      "Evaluate authentication, permissions, data storage, and deployment practices against practical risk scenarios, then receive a prioritized action plan to close gaps before they become incidents.",
  },
  {
    title: "Business Digitalization Consulting",
    summary: "Workflow assessment, bottleneck analysis, and practical digital transition planning.",
    details:
      "We assess how work actually moves through your organization, identify friction points, and deliver a phased roadmap to digitize processes without disrupting day-to-day operations.",
  },
] as const;

export const MAXLABS_CORE_VALUES = [
  {
    title: "God-Fearing Business",
    body: "We lead with integrity, honesty, and humility before God and man. Client processes and data are handled with confidentiality, professionalism, and faithful stewardship.",
  },
  {
    title: "Practical Innovation",
    body: "We build systems that work in real operations, not just in presentations.",
  },
  {
    title: "Long-Term Partnership",
    body: "We support clients beyond launch through structured continuous improvement.",
  },
  {
    title: "Security Mindset",
    body: "Access control and data protection are treated as foundational requirements.",
  },
  {
    title: "Reliability by Design",
    body: "Maintainability, documentation, and continuity are built in from day one.",
  },
] as const;

export const MAXLABS_DELIVERY_PROCESS = [
  {
    stage: "Discover",
    title: "Clarify the operating reality",
    body: "We start by understanding how work actually flows today — not how it looks on paper. Stakeholder interviews, workflow mapping, and constraint analysis give us a shared baseline.",
  },
  {
    stage: "Design",
    title: "Define architecture before build",
    body: "With clarity on the problem, we shape the solution: module boundaries, data model, role permissions, and phased delivery so scope stays controlled and predictable.",
  },
  {
    stage: "Build",
    title: "Ship in focused milestones",
    body: "Development happens in prioritized modules with regular demos. Each milestone is tested against real scenarios so progress is visible and accountable.",
  },
  {
    stage: "Launch",
    title: "Deploy with confidence",
    body: "Go-live is structured, not rushed. We handle deployment, user onboarding, stabilization windows, and support handoff so teams adopt the system smoothly.",
  },
  {
    stage: "Optimize",
    title: "Improve from real usage",
    body: "After launch, we track adoption and operational impact, then prioritize enhancements that compound value — keeping the system aligned as the business grows.",
  },
] as const;

export const MAXLABS_PROJECTS = [
  {
    client: "De Gala Funeral & Insurance",
    industry: "Funeral & Insurance Services",
    service: "CRM / ERP",
    status: "In Progress",
    description:
      "A unified ERP/CRM platform with role-based workflows for insurance enrollment, claims tracking, and funeral service coordination.",
  },
  {
    client: "MetroLine Logistics Co.",
    industry: "Logistics & Delivery",
    service: "Workflow Automation",
    status: "Completed",
    description:
      "Workflow automation for dispatch routing, delivery confirmations, and driver task handoffs across daily operations.",
  },
  {
    client: "CareFirst Medical Group",
    industry: "Healthcare & Clinics",
    service: "Custom Web App",
    status: "Completed",
    description:
      "Custom web application for appointment scheduling, patient intake, and billing visibility across clinic locations.",
  },
  {
    client: "Summit Retail Distribution",
    industry: "Retail & Distribution",
    service: "Dashboards & Reporting",
    status: "Discovery",
    description:
      "Operational dashboards and inventory reporting to improve stock visibility, reorder decisions, and branch-level performance tracking.",
  },
] as const;

export const MAXLABS_CONTACT = {
  emails: CONTACT_EMAILS,
  phones: CONTACT_PHONES,
  consultationUrl: "/contact",
  trustPoints: [
    "Practical recommendations aligned with business outcomes",
    "Structured solution planning and scoped implementation",
    "Clear timelines, milestones, and communication flow",
    "Support beyond launch for continuous improvement",
  ],
} as const;

export const MAXLABS_SERVICE_AREA_LABELS = MAXLABS_SERVICE_AREAS;

/** Plain-text knowledge base injected into the chatbot system prompt. */
export function buildBrandKnowledgeDocument(): string {
  const sections = [
    `# ${MAXLABS_COMPANY.legalName}`,
    `Tagline: ${MAXLABS_COMPANY.tagline}`,
    "",
    "## About",
    MAXLABS_COMPANY.description,
    MAXLABS_COMPANY.heroSummary,
    `Focus areas: ${MAXLABS_COMPANY.focusAreas.join(", ")}`,
    `Primary market: ${MAXLABS_COMPANY.primaryMarket}`,
    `Location: ${MAXLABS_COMPANY.location}`,
    "",
    "## Mission",
    MAXLABS_COMPANY.mission,
    "",
    "## Vision",
    MAXLABS_COMPANY.vision,
    "",
    "## Business Credentials",
    `Registered trade name: ${MAXLABS_COMPANY.legalName}`,
    `Tax classification: ${MAXLABS_COMPANY.taxClassification}`,
    MAXLABS_COMPANY.commercialCapability,
    "",
    "## Service Areas (Hero Highlights)",
    MAXLABS_SERVICE_AREA_LABELS.map((area) => `- ${area}`).join("\n"),
    "",
    "## Services (9 total)",
    ...MAXLABS_SERVICES.map(
      (service) =>
        `### ${service.title}\n${service.summary}\n${service.details}`,
    ),
    "",
    "## Core Values",
    ...MAXLABS_CORE_VALUES.map((value) => `### ${value.title}\n${value.body}`),
    "",
    "## Delivery Process (5 stages)",
    ...MAXLABS_DELIVERY_PROCESS.map(
      (step) => `### ${step.stage}: ${step.title}\n${step.body}`,
    ),
    "",
    "## Sample Projects / Portfolio",
    ...MAXLABS_PROJECTS.map(
      (project) =>
        `### ${project.client} (${project.industry})\nService: ${project.service} | Status: ${project.status}\n${project.description}`,
    ),
    "",
    "## Contact",
    `Emails: ${MAXLABS_CONTACT.emails.join(", ")}`,
    `Phones: ${MAXLABS_CONTACT.phones.join(", ")}`,
    `Consultation form: ${MAXLABS_CONTACT.consultationUrl}`,
    "",
    "## Why work with MAXLABS",
    ...MAXLABS_CONTACT.trustPoints.map((point) => `- ${point}`),
  ];

  return sections.join("\n");
}
