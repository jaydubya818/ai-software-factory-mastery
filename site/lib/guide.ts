export const guideParts = [
  {
    id: "understand",
    number: "I",
    verb: "Understand",
    title: "See the factory as a system",
    summary: "What an AI Software Factory is, what its parts are, and what principles of trust, evidence, and authority hold it together.",
    question: "What is an AI Software Factory, what are its parts, and what principles hold it together?",
    sectionKeys: ["01-understand"],
  },
  {
    id: "design",
    number: "II",
    verb: "Design",
    title: "Define ownership, records, and authority",
    summary: "The operating model, authoritative records, specifications, governance, economics, and multi-repository decisions that must exist before any agent runs.",
    question: "What records, decisions, authority, and economics must exist before any agent runs?",
    sectionKeys: ["02-design"],
  },
  {
    id: "build",
    number: "III",
    verb: "Build",
    title: "Assemble the capability and execution stack",
    summary: "The Agent Factory, control and execution planes, durable execution, harnesses, environments, agent architecture, models, loops, the 12-layer stack, and autonomous workflows.",
    question: "How do you assemble capabilities, runtime, harnesses, environments, AI layers, and workflows?",
    sectionKeys: ["03-build"],
  },
  {
    id: "prove",
    number: "IV",
    verb: "Prove",
    title: "Verify, govern, and deliver exact outcomes",
    summary: "Quality and evidence architecture, testing, evaluation, proof packages and certificates, progressive delivery, and security.",
    question: "How do you know the factory's output is correct, safe, and releasable?",
    sectionKeys: ["04-prove"],
  },
  {
    id: "operate",
    number: "V",
    verb: "Operate",
    title: "Run the factory as a production platform",
    summary: "The platform, observability and forensics, resilience and incidents, control surfaces and storage, and enterprise adoption.",
    question: "How do you run it as a production platform?",
    sectionKeys: ["05-operate"],
  },
  {
    id: "improve",
    number: "VI",
    verb: "Improve",
    title: "Learn from evidence without self-authorizing change",
    summary: "Production feedback and the merge queue, governed learning, Mission Control as a living case study, mastering the factory, and where this is going.",
    question: "How does it get better without authorizing itself?",
    sectionKeys: ["06-improve"],
  },
] as const;

export type GuidePart = (typeof guideParts)[number];

export const sectionGuidance: Record<string, string> = {
  "00-front-matter": "What this guide is, who it is for, and the conventions every chapter follows.",
  "01-understand": "See the factory as one system: why it exists, what its parts are, and the principles that hold it together.",
  "02-design": "Define the records, decisions, authority, and economics that must exist before any agent runs.",
  "03-build": "Assemble capabilities, runtime, harnesses, environments, AI layers, and autonomous workflows.",
  "04-prove": "Produce independent evidence that the factory's output is correct, safe, and releasable.",
  "05-operate": "Run the factory as a production platform with observability, resilience, and control surfaces.",
  "06-improve": "Let the factory get better from evidence without authorizing its own change.",
  appendix: "Reference material: glossary, labs, Mission Control case studies, research canon, and coverage.",
};
