export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  statsQuick: Array<{ value: string; label: string }>;
}

export interface MissionPillar {
  icon: string;
  title: string;
  description: string;
}

export interface AboutContent {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  pillars: MissionPillar[];
  founded: string;
  location: string;
  scientists: string;
}

export interface TechPanel {
  id: string;
  counter: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: string;
  iconName: string;
  patternType: "ribbon" | "bars" | "lattice" | "waveform";
}

export interface CapabilityItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  size: "large" | "standard";
  category: string;
  highlightMetric?: string;
}

export interface StatItem {
  value: string;
  targetNumber: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  description: string;
}

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Platform", href: "#technology" },
  { label: "Research", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Impact", href: "#impact" },
  { label: "Gene Sandbox", href: "#playground" },
];

export const HERO_CONTENT: HeroContent = {
  eyebrow: "// SYNTHETIC BIOLOGY × APPLIED AI",
  headline: "Engineering the Code of Life.",
  subheadline:
    "Codex Bio pairs generative protein architecture with automated wet-lab synthesis to compress a decade of drug discovery into eighteen months — with petabase precision.",
  primaryCta: "Explore Platform",
  secondaryCta: "Watch Mission Briefing",
  statsQuick: [
    { value: "182+", label: "Programs Accelerated" },
    { value: "6.4x", label: "Discovery Speedup" },
    { value: "98.7%", label: "In Silico Accuracy" },
  ],
};

export const ABOUT_CONTENT: AboutContent = {
  eyebrow: "// 01 — THE MISSION",
  headline: "Biology moves at evolution's pace. We execute at computational velocity.",
  paragraphs: [
    "Traditional drug discovery relies on serendipitous screening across billions of candidate molecules over a decade. At Codex Bio, we treat genetic sequences and tertiary protein structures as high-level executable code.",
    "By fusing deep transformer generative models trained on over 250M curated genomic sequences with closed-loop robotic wet labs, we predict molecular dynamics and toxicological profiles before a single pipette touches a test tube.",
  ],
  pillars: [
    {
      icon: "Target",
      title: "Precision Engineering",
      description: "Model-guided target selection and atomic-resolution ligand binding optimization.",
    },
    {
      icon: "Zap",
      title: "Algorithmic Velocity",
      description: "Parallelized cloud bio-simulation reducing multi-year trials into weeks.",
    },
    {
      icon: "Layers",
      title: "Petabase Scale",
      description: "Cloud-native compute pipelines processing petabytes of spatial multi-omics data.",
    },
  ],
  founded: "Est. 2021",
  location: "Boston & Cambridge Labs",
  scientists: "140+ PhD Researchers",
};

export const TECH_PANELS: TechPanel[] = [
  {
    id: "protein-engine",
    counter: "01/04",
    title: "AI Protein Folding Engine",
    subtitle: "De Novo Molecular Design",
    description:
      "Generative diffusion network predicting novelty-optimized 3D protein structures down to 0.4Å backbone root-mean-square deviation.",
    tags: ["Transformer Models", "Diffusion 3D", "Binding Affinity"],
    metrics: "250M+ Sequences Trained",
    iconName: "Dna",
    patternType: "ribbon",
  },
  {
    id: "genomic-pipeline",
    counter: "02/04",
    title: "Genomic Sequencing Pipeline",
    subtitle: "Petabase Data Analytics",
    description:
      "Clinical-grade multi-omics integration engine parsing cellular transcription variants and epigenomic modifications in real time.",
    tags: ["Multi-Omics", "Epigenetics", "Parallel Assembly"],
    metrics: "99.99% Base Call Accuracy",
    iconName: "Atom",
    patternType: "bars",
  },
  {
    id: "synthetic-pathway",
    counter: "03/04",
    title: "Synthetic Pathway Design",
    subtitle: "Automated Biomanufacturing",
    description:
      "Algorithmic enzyme optimization for sustainable metabolic pathways, enabling high-yield biomanufacturing of active pharmaceutical ingredients.",
    tags: ["Metabolic Flux", "CRISPR Multiplex", "Enzyme Kinetics"],
    metrics: "12x Synthesis Yield",
    iconName: "Sprout",
    patternType: "lattice",
  },
  {
    id: "predictive-tox",
    counter: "04/04",
    title: "Predictive Toxicology",
    subtitle: "In Silico Safety Profiling",
    description:
      "Deep neural cellular toxicity simulations evaluating off-target cardiac and hepatic cross-reactivity prior to preclinical animal testing.",
    tags: ["ADMET Analysis", "Organ-on-Chip", "Safety Simulation"],
    metrics: "94% Clinical Correlation",
    iconName: "ShieldCheck",
    patternType: "waveform",
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "drug-discovery",
    iconName: "Sparkles",
    title: "AI-Driven Drug Discovery",
    description:
      "Generative lead compound generation targeting historically 'undruggable' membrane receptors and intrinsically disordered proteins.",
    size: "large",
    category: "Therapeutics",
    highlightMetric: "Sub-Nanomolar Binding",
  },
  {
    id: "genomic-analytics",
    iconName: "Binary",
    title: "Genomic Data Analytics",
    description:
      "High-performance cloud bio-computing cluster executing pan-genome variant analysis across millions of patient genomes.",
    size: "standard",
    category: "Big Data",
  },
  {
    id: "synthetic-design",
    iconName: "Dna",
    title: "Synthetic Biology Design",
    description:
      "Closed-loop DNA synthesis automation translating digital sequence files into physical viral vector constructs overnight.",
    size: "standard",
    category: "Wet Lab Automation",
  },
  {
    id: "clinical-accel",
    iconName: "Activity",
    title: "Clinical Pipeline Acceleration",
    description:
      "Bayesian trial simulation selecting patient bio-stratifications to maximize Phase II efficacy outcomes.",
    size: "large",
    category: "Clinical Trials",
    highlightMetric: "60% Cohort Precision",
  },
  {
    id: "regulatory-intel",
    iconName: "FileCheck",
    title: "Regulatory Intelligence",
    description:
      "Automated IND document synthesis and real-time biomarker verification for streamlined FDA submission workflows.",
    size: "standard",
    category: "Compliance",
  },
  {
    id: "bio-compute",
    iconName: "Cpu",
    title: "Custom Bio-Compute Infrastructure",
    description:
      "GPU-accelerated tensor kernels specifically compiled for quantum molecular dynamics and molecular docking calculations.",
    size: "standard",
    category: "HPC Infrastructure",
  },
];

export const STATS: StatItem[] = [
  {
    value: "182",
    targetNumber: 182,
    suffix: "+",
    label: "Programs Accelerated",
    description: "Therapeutic assets discovered across oncology, neurology, and rare disease pipelines.",
  },
  {
    value: "6.4",
    targetNumber: 6.4,
    suffix: "x",
    decimals: 1,
    label: "Faster Discovery Cycles",
    description: "Reduction in target-to-IND timeline compared to conventional pharmaceutical research.",
  },
  {
    value: "98.7",
    targetNumber: 98.7,
    suffix: "%",
    decimals: 1,
    label: "Model Accuracy",
    description: "In silico binding affinity prediction validated against empirical crystallography data.",
  },
  {
    value: "42",
    targetNumber: 42,
    suffix: "+",
    label: "Global Partnerships",
    description: "Active research collaborations with premier academic institutions and biopharma leaders.",
  },
];

export const FINAL_CTA = {
  eyebrow: "// 05 — INITIATE PARTNERSHIP",
  headline: "Let's Engineer What's Next.",
  subheadline:
    "Partner with Codex Bio to compress your therapeutic timeline from years to months. Access our AI platform or co-develop breakthrough biological targets.",
  ctaButton: "Start a Conversation",
  inputPlaceholder: "Enter your institutional email...",
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "#main" },
      { label: "AI Protein Engine", href: "#technology" },
      { label: "Genomic Sequencing", href: "#technology" },
      { label: "Capabilities", href: "#capabilities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Mission", href: "#about" },
      { label: "Impact & Research", href: "#impact" },
      { label: "Careers (12 Openings)", href: "#" },
      { label: "Press Releases", href: "#" },
    ],
  },
  {
    title: "Legal & Ethics",
    links: [
      { label: "Bio-Safety Charter", href: "#" },
      { label: "Data Privacy Policy", href: "#" },
      { label: "Terms of Access", href: "#" },
      { label: "Security & SOC 2", href: "#" },
    ],
  },
];
