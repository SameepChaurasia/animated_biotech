export interface ResearchDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  counter?: string;
  abstract: string;
  highlights: string[];
  specs: Array<{ label: string; value: string; detail: string }>;
  interactiveParams?: {
    bindingAffinity: { min: number; max: number; default: number; unit: string };
    foldingRmsd: { min: number; max: number; default: number; unit: string };
    throughputSpeed: { min: number; max: number; default: number; unit: string };
    offTargetTox: { min: number; max: number; default: number; unit: string };
  };
  whitepaper: {
    doi: string;
    journal: string;
    publicationDate: string;
    authors: string[];
    citations: number;
    downloadUrl: string;
    keyFindings: string[];
  };
  labProtocol?: {
    assayType: string;
    temperature: string;
    ph: string;
    roboticPlatform: string;
    incubationTime: string;
  };
}

export interface ResearchPaper {
  id: string;
  title: string;
  category: "Protein Design" | "Genomic Omics" | "Wet-Lab Robotics" | "Toxicology & Safety" | "Clinical Simulation";
  journal: string;
  doi: string;
  year: string;
  authors: string;
  abstract: string;
  readTime: string;
  impactFactor: string;
  keyTakeaway: string;
  downloadSize: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "paper-01",
    title: "De Novo Transformer Synthesis of Sub-Angstrom Affinity Receptors",
    category: "Protein Design",
    journal: "Nature Biotechnology (2026)",
    doi: "10.1038/s41587-026-0892-x",
    year: "2026",
    authors: "Chaurasia S., Vance E., Chen L. et al.",
    abstract:
      "We report a 1.4B parameter spatial diffusion transformer trained on 250 million genomic sequence representations. The model generates tertiary backbone constructs achieving 0.38Å RMSD alignment against empirical X-ray crystallographic structures, compressing de novo ligand binding search times from years to 72 hours.",
    readTime: "8 min read",
    impactFactor: "46.9",
    keyTakeaway: "Achieves sub-nanomolar affinity for previously undruggable GPCR membrane targets.",
    downloadSize: "4.2 MB PDF",
  },
  {
    id: "paper-02",
    title: "Closed-Loop Robotic Epigenomic Variant Mapping at Petabase Scale",
    category: "Genomic Omics",
    journal: "Science Translational Medicine (2025)",
    doi: "10.1126/scitranslmed.adf4412",
    year: "2025",
    authors: "Chaurasia S., Al-Mansoor K., Gupta R.",
    abstract:
      "Integrating automated microfluidic cell sorters with cloud-native variant assembly pipelines allows continuous single-cell RNA-seq throughput exceeding 100,000 cells per hour with 99.99% base call accuracy.",
    readTime: "12 min read",
    impactFactor: "17.1",
    keyTakeaway: "Reduces genomic variant identification latency by 85% across pan-cancer datasets.",
    downloadSize: "6.8 MB PDF",
  },
  {
    id: "paper-03",
    title: "Algorithmic CRISPR-Cas12a Multiplexing for Metabolic Pathway Engineering",
    category: "Wet-Lab Robotics",
    journal: "Cell Systems (2025)",
    doi: "10.1016/j.cels.2025.04.009",
    year: "2025",
    authors: "Vance E., Chaurasia S., Thorne P.",
    abstract:
      "High-throughput automated synthesis of multiplexed guide RNA libraries targeting 48 metabolic enzymes simultaneously, achieving 12-fold yield improvement in synthetic biofuel precursor biosynthesis.",
    readTime: "10 min read",
    impactFactor: "11.5",
    keyTakeaway: "Enables continuous 24/7 automated strain evolution without human intervention.",
    downloadSize: "5.1 MB PDF",
  },
  {
    id: "paper-04",
    title: "Deep In Silico ADMET & Off-Target Cardiac Toxicity Prediction",
    category: "Toxicology & Safety",
    journal: "Journal of Medicinal Chemistry (2025)",
    doi: "10.1021/acs.jmedchem.5b00192",
    year: "2025",
    authors: "Gupta R., Chaurasia S., Martinez A.",
    abstract:
      "A graph neural network architecture simulating hERG ion channel blockades and human hepatocyte membrane integrity with 94.2% correlation to empirical clinical trial data.",
    readTime: "9 min read",
    impactFactor: "8.0",
    keyTakeaway: "Eliminates toxic lead candidate compounds prior to preclinical animal trials.",
    downloadSize: "3.9 MB PDF",
  },
  {
    id: "paper-05",
    title: "High-Throughput Acoustic Droplet Ejection for 24/7 Robotic Synthesis",
    category: "Wet-Lab Robotics",
    journal: "Cell Systems & Automation (2026)",
    doi: "10.1016/j.cels.2025.04.009",
    year: "2026",
    authors: "Chaurasia S., Vance E., Thorne P.",
    abstract:
      "Acoustic nanoliter liquid handling coupled with closed-loop mass spectrometry achieves 50,000 automated enzymatic reactions daily with zero manual pipetting.",
    readTime: "11 min read",
    impactFactor: "14.2",
    keyTakeaway: "Increases reaction optimization speed by 8x while reducing plastic consumable waste by 99%.",
    downloadSize: "4.8 MB PDF",
  },
  {
    id: "paper-06",
    title: "Bayesian Synthetic Patient Twin Cohorts for Phase I/II Trial Simulation",
    category: "Clinical Simulation",
    journal: "Nature Medicine & Clinical AI (2025)",
    doi: "10.1038/s41587-026-0892-x",
    year: "2025",
    authors: "Chaurasia S., Gupta R., Martinez A.",
    abstract:
      "Generative Bayesian stratifiers construct digital twins from multi-center EHR registries to optimize Phase I/II oncology trial design and cohort sizing.",
    readTime: "14 min read",
    impactFactor: "38.9",
    keyTakeaway: "Reduces clinical trial failure risk by 60% through proactive responder subgroup identification.",
    downloadSize: "5.5 MB PDF",
  },
];

export const RESEARCH_DETAILS: Record<string, ResearchDetail> = {
  // --- PLATFORM ENGINES ---
  "protein-engine": {
    id: "protein-engine",
    title: "AI Protein Folding Engine",
    subtitle: "De Novo Generative 3D Structural Modeling",
    category: "Platform Engine",
    counter: "01/04",
    abstract:
      "The AI Protein Folding Engine utilizes a multi-scale spatial diffusion model trained on over 250 million evolutionary sequence embeddings from UniProt and PDB. By unifying sequence autoregression with 3D equivariant graph neural networks, Codex Bio generates novel high-affinity binder proteins targeting intrinsically disordered domains and multi-pass transmembrane GPCRs.",
    highlights: [
      "0.38Å Backbone Root-Mean-Square Deviation (RMSD) precision.",
      "De novo binder generation targeting historically 'undruggable' proteins.",
      "Parallel GPU tensor inference generating 50,000 candidates per hour.",
      "Closed-loop feedback integration with automated surface plasmon resonance (SPR).",
    ],
    specs: [
      { label: "Model Architecture", value: "Diffusion Transformer (1.4B Params)", detail: "Conditioned on target binding pocket point clouds." },
      { label: "Training Dataset", value: "250M+ Sequences / 210K PDB Structures", detail: "Enriched with high-resolution cryo-EM density maps." },
      { label: "Inference Speed", value: "420 ms / Molecule", detail: "Optimized with custom TensorRT bio-kernels." },
      { label: "Experimental Validation", value: "98.7% In Vitro Match", detail: "Confirmed via X-ray crystallography and NMR." },
    ],
    interactiveParams: {
      bindingAffinity: { min: 0.01, max: 10.0, default: 0.42, unit: "nM" },
      foldingRmsd: { min: 0.1, max: 2.0, default: 0.38, unit: "Å" },
      throughputSpeed: { min: 1000, max: 100000, default: 50000, unit: "mol/hr" },
      offTargetTox: { min: 0.1, max: 5.0, default: 0.8, unit: "%" },
    },
    whitepaper: {
      doi: "10.1038/s41587-026-0892-x",
      journal: "Nature Biotechnology",
      publicationDate: "February 2026",
      authors: ["Sameep Chaurasia", "Dr. E. Vance", "Dr. L. Chen"],
      citations: 142,
      downloadUrl: "#",
      keyFindings: [
        "Predicted 3D structures match wet-lab X-ray structures within sub-angstrom thresholds.",
        "Zero-shot binding optimization reduces hit-to-lead evolution cycles by 90%.",
      ],
    },
    labProtocol: {
      assayType: "Surface Plasmon Resonance (SPR) & Mass Spec",
      temperature: "25.0°C ± 0.1°C",
      ph: "7.40 (Tris-HCl Buffer)",
      roboticPlatform: "Tecan Fluent 1080 Liquid Handling Station",
      incubationTime: "45 Minutes",
    },
  },

  "genomic-pipeline": {
    id: "genomic-pipeline",
    title: "Genomic Sequencing Pipeline",
    subtitle: "Cloud-Native Multi-Omics Analysis Engine",
    category: "Platform Engine",
    counter: "02/04",
    abstract:
      "Our petabase genomic sequencing pipeline integrates long-read nanopore sequencing with short-read Illumina error correction in real time. Processing raw base-call signals at petabyte scale, it detects single-nucleotide variants (SNVs), structural copy number variations (CNVs), and chromatin accessibility signatures across diverse clinical cohorts.",
    highlights: [
      "99.99% Base call precision with deep transformer signal decoding.",
      "Real-time epigenomic methylation detection (5mC, 6mA).",
      "Cloud-native serverless architecture processing 10,000 genomes simultaneously.",
      "Automated Variant Effect Predictor (VEP) with clinical pathogenicity scoring.",
    ],
    specs: [
      { label: "Sequencing Depth", value: "100x Whole Genome Coverage", detail: "Exceeds standard clinical diagnostic benchmarks." },
      { label: "Data Throughput", value: "2.4 Petabytes / Month", detail: "Distributed across AWS Bio-HPC clusters." },
      { label: "Variant Call Accuracy", value: "Q40 Score (>99.99%)", detail: "Validated against GIAB reference standards." },
      { label: "Latency", value: "14 Minutes / WGS Sample", detail: "From raw FASTQ to annotated VCF." },
    ],
    interactiveParams: {
      bindingAffinity: { min: 0.1, max: 20.0, default: 1.2, unit: "nM" },
      foldingRmsd: { min: 0.2, max: 3.0, default: 0.5, unit: "Å" },
      throughputSpeed: { min: 500, max: 20000, default: 10000, unit: "samples/day" },
      offTargetTox: { min: 0.01, max: 2.0, default: 0.05, unit: "%" },
    },
    whitepaper: {
      doi: "10.1126/scitranslmed.adf4412",
      journal: "Science Translational Medicine",
      publicationDate: "November 2025",
      authors: ["Sameep Chaurasia", "Dr. K. Al-Mansoor", "Dr. R. Gupta"],
      citations: 98,
      downloadUrl: "#",
      keyFindings: [
        "Petabase multi-omics integration identifies 34 novel oncogenic promoter mutations.",
        "Reduces variant classification time from 3 weeks to under 15 minutes.",
      ],
    },
    labProtocol: {
      assayType: "Single-Cell RNA-seq & Epigenomic Assay",
      temperature: "4.0°C (Storage) / 37.0°C (Enzyme Reaction)",
      ph: "8.0 (10x Enzymatic Master Mix)",
      roboticPlatform: "Hamilton Microlab STAR Automated Workstation",
      incubationTime: "120 Minutes",
    },
  },

  "synthetic-pathway": {
    id: "synthetic-pathway",
    title: "Synthetic Pathway Design",
    subtitle: "Automated Metabolic Engineering & Biomanufacturing",
    category: "Platform Engine",
    counter: "03/04",
    abstract:
      "Automated metabolic pathway design algorithms compute optimal multi-enzyme cascades for recombinant protein expression and small-molecule biomanufacturing. By multiplexing CRISPR-Cas12a gene editing tools into automated bioreactors, we achieve up to 12-fold yield enhancements for bio-therapeutics.",
    highlights: [
      "12x Synthesis yield boost for complex secondary metabolites.",
      "Multiplexed CRISPR editing of up to 48 genomic locus targets in one cycle.",
      "Real-time metabolic flux balance analysis (FBA) simulation.",
      "Scale-up validation from 250mL micro-reactors to 1,000L pilot tanks.",
    ],
    specs: [
      { label: "CRISPR Editing Density", value: "48 Loci Parallel Multiplex", detail: "Using engineered Cas12a-Ultra enzymes." },
      { label: "Metabolic Yield Enhancement", value: "12.4x Baseline Strain", detail: "Measured in g/L bioreactor titer." },
      { label: "Fermentation Time", value: "36 Hours Run Time", detail: "Optimized carbon source feeding strategy." },
      { label: "Host Organisms", value: "E. coli, S. cerevisiae, P. pastoris", detail: "Custom engineered chassis strains." },
    ],
    interactiveParams: {
      bindingAffinity: { min: 0.1, max: 5.0, default: 0.8, unit: "nM" },
      foldingRmsd: { min: 0.1, max: 1.5, default: 0.4, unit: "Å" },
      throughputSpeed: { min: 10, max: 1000, default: 500, unit: "runs/mo" },
      offTargetTox: { min: 0.05, max: 3.0, default: 0.2, unit: "%" },
    },
    whitepaper: {
      doi: "10.1016/j.cels.2025.04.009",
      journal: "Cell Systems",
      publicationDate: "August 2025",
      authors: ["Dr. E. Vance", "Sameep Chaurasia", "Dr. P. Thorne"],
      citations: 76,
      downloadUrl: "#",
      keyFindings: [
        "Metabolic flux modeling predicts bottleneck enzymes with 96% accuracy.",
        "Automated strain selection reduces biomanufacturing pilot setup costs by 70%.",
      ],
    },
    labProtocol: {
      assayType: "Bioreactor Micro-Fermentation & HPLC Titer Assay",
      temperature: "30.0°C Continuous",
      ph: "6.8 (Automated Acid/Base Injection)",
      roboticPlatform: "Sartorius Ambr 250 Automated Bioreactor System",
      incubationTime: "36 Hours",
    },
  },

  "predictive-tox": {
    id: "predictive-tox",
    title: "Predictive Toxicology Engine",
    subtitle: "In Silico ADMET & Organ-on-Chip Safety Profiling",
    category: "Platform Engine",
    counter: "04/04",
    abstract:
      "Predictive Toxicology integrates 3D organ-on-chip microfluidic assays with deep graph neural network ADMET models. We evaluate hepatic metabolism, renal clearance, cardiac hERG ion channel inhibition, and blood-brain barrier permeability prior to initiating animal studies.",
    highlights: [
      "94% Correlation with Phase I human clinical toxicity metrics.",
      "Zero-animal-testing computational toxicity screen.",
      "Comprehensive hERG cardiac arrhythmia risk scoring.",
      "Multi-organ microfluidic chip validation (Liver, Heart, Kidney).",
    ],
    specs: [
      { label: "Clinical Correlation", value: "94.2% Empirical Match", detail: "Benchmarked against historic FDA IND submissions." },
      { label: "ADMET Attributes", value: "48 Micro-Safety Indicators", detail: "Including CYP450 inhibition and membrane transport." },
      { label: "Assay Latency", value: "4 Hours / Compound", detail: "In silico screening completed in milliseconds." },
      { label: "False Positive Rate", value: "< 2.1%", detail: "Prevents premature drop-outs of promising leads." },
    ],
    interactiveParams: {
      bindingAffinity: { min: 0.05, max: 10.0, default: 0.3, unit: "nM" },
      foldingRmsd: { min: 0.1, max: 2.0, default: 0.45, unit: "Å" },
      throughputSpeed: { min: 5000, max: 500000, default: 250000, unit: "compounds/day" },
      offTargetTox: { min: 0.01, max: 1.0, default: 0.15, unit: "%" },
    },
    whitepaper: {
      doi: "10.1021/acs.jmedchem.5b00192",
      journal: "Journal of Medicinal Chemistry",
      publicationDate: "May 2025",
      authors: ["Dr. R. Gupta", "Sameep Chaurasia", "Dr. A. Martinez"],
      citations: 112,
      downloadUrl: "#",
      keyFindings: [
        "In silico ADMET profiling flags off-target cardiotoxicity with 94% sensitivity.",
        "Saves an estimated $14M per therapeutic candidate by avoiding failed Phase I trials.",
      ],
    },
    labProtocol: {
      assayType: "Human iPSC Organ-on-Chip Microfluidic Perfusion",
      temperature: "37.0°C / 5% CO2",
      ph: "7.35 (Cell Culture Medium)",
      roboticPlatform: "CN Bio PhysioMimix Microfluidic Organ Platform",
      incubationTime: "72 Hours",
    },
  },

  "robotic-synthesis": {
    id: "robotic-synthesis",
    title: "Closed-Loop Robotic Synthesis",
    subtitle: "High-Throughput Microfluidics & Liquid Handling",
    category: "Platform Engine",
    counter: "05/06",
    abstract:
      "Integrated microfluidic synthesis workstations execute 50,000 parallel enzymatic reactions daily. Machine learning sensors monitor optical density and mass spectra, autonomously adjusting reagent ratios in real time to maximize purity and yield.",
    highlights: [
      "50,000 Automated microfluidic assays per day.",
      "Real-time mass-spec reaction optimization.",
      "Zero-human-intervention 24/7 continuous synthesis.",
      "Seamless integration with generative AI sequence design.",
    ],
    specs: [
      { label: "Assay Throughput", value: "50,000 / Day", detail: "Parallelized multi-well micro-dispensing." },
      { label: "Dispensing Precision", value: "50 nL ± 0.5 nL", detail: "Acoustic liquid transfer technology." },
      { label: "Purity Yield", value: "99.4% Analytical Purity", detail: "HPLC and Q-TOF mass spectrometry verified." },
    ],
    whitepaper: {
      doi: "10.1016/j.cels.2025.04.009",
      journal: "Cell Systems & Automation",
      publicationDate: "January 2026",
      authors: ["Sameep Chaurasia", "Dr. E. Vance", "Dr. P. Thorne"],
      citations: 84,
      downloadUrl: "#",
      keyFindings: [
        "Acoustic liquid dispensing eliminates 99% of tip waste while increasing assay speed 8x.",
        "Closed-loop feedback loops improve reaction yields by 40% in first-pass runs.",
      ],
    },
    labProtocol: {
      assayType: "Automated High-Throughput Micro-Reaction Synthesis",
      temperature: "37.0°C ± 0.2°C",
      ph: "7.40",
      roboticPlatform: "Tecan Fluent 1080 / Labcyte Echo 655T",
      incubationTime: "24 Hours Continuous",
    },
  },

  "clinical-simulator": {
    id: "clinical-simulator",
    title: "Bayesian Clinical Trial Simulator",
    subtitle: "In Silico Patient Cohorts & Adaptive Design",
    category: "Platform Engine",
    counter: "06/06",
    abstract:
      "Our Bayesian Clinical Trial Simulator constructs synthetic patient cohorts derived from multi-center EHR and genomic biobanks. By modeling pharmacokinetic variation and biomarker stratifications prior to protocol execution, we reduce Phase I/II clinical trial failure rates by 60%.",
    highlights: [
      "60% Reduction in Phase I/II trial attrition.",
      "Synthetic control arm modeling using 500,000+ patient records.",
      "Adaptive dose-escalation algorithm minimizing toxicity risks.",
      "Instant FDA eCTD Module 3/4 compliance export.",
    ],
    specs: [
      { label: "Cohort Accuracy", value: "96.4% Biomarker Match", detail: "Benchmarked against Phase II oncology trials." },
      { label: "Simulation Speed", value: "10,000 Cohorts / Hour", detail: "Monte Carlo Markov Chain GPU sampling." },
      { label: "Failure Reduction", value: "60% Attrition Reduction", detail: "Early identification of non-responder subgroups." },
    ],
    whitepaper: {
      doi: "10.1038/s41587-026-0892-x",
      journal: "Nature Medicine & Clinical AI",
      publicationDate: "December 2025",
      authors: ["Sameep Chaurasia", "Dr. R. Gupta", "Dr. A. Martinez"],
      citations: 104,
      downloadUrl: "#",
      keyFindings: [
        "Synthetic patient twin control arms reduce phase II sample size requirements by 40%.",
        "Predicts adverse event frequency with 95% clinical fidelity.",
      ],
    },
  },

  // --- CAPABILITIES ---
  "drug-discovery": {
    id: "drug-discovery",
    title: "AI-Driven Drug Discovery",
    subtitle: "De Novo Therapeutic Lead Generation",
    category: "Therapeutics Capability",
    abstract:
      "Our AI-Driven Drug Discovery capability integrates generative molecular diffusion algorithms with sub-nanomolar affinity validation. We design macrocyclic peptides, bispecific antibodies, and small-molecule degraders targeting historically intractable membrane receptors.",
    highlights: [
      "Generates 100,000 novel binder candidates per target.",
      "Automated lead optimization balancing binding affinity and solubility.",
      "Integrated micro-scale thermophoresis (MST) binding verification.",
    ],
    specs: [
      { label: "Target Classes", value: "GPCRs, Ion Channels, PROTACs", detail: "Includes intrinsically disordered proteins." },
      { label: "Hit Rate", value: "18.4% Empirical Hit Rate", detail: "Compared to < 0.1% for random HTS screening." },
      { label: "Optimization Cycle", value: "3 Weeks / Optimization Round", detail: "Iterative wet-lab closed-loop feedback." },
    ],
    whitepaper: {
      doi: "10.1038/s41587-026-0892-x",
      journal: "Nature Biotechnology",
      publicationDate: "2026",
      authors: ["Sameep Chaurasia", "Codex Bio Research Team"],
      citations: 88,
      downloadUrl: "#",
      keyFindings: ["Generates potent leads for membrane receptors in under 18 days."],
    },
  },

  "genomic-analytics": {
    id: "genomic-analytics",
    title: "Genomic Data Analytics",
    subtitle: "Pan-Genome Variant Analysis at Cloud Scale",
    category: "Big Data Capability",
    abstract:
      "High-performance bio-computing infrastructure executing pan-genome variant analysis across millions of patient genomes. Uncovers cryptic disease-associated haplotypes and non-coding regulatory mutations.",
    highlights: [
      "Processes 1,000 whole genomes per hour.",
      "Deep learning variant effect classification.",
      "Integrated GWAS and single-cell expression QTL (eQTL) mapping.",
    ],
    specs: [
      { label: "Cluster Capacity", value: "50,000 Parallel GPU Cores", detail: "Optimized with NVIDIA Clara Parabricks." },
      { label: "Storage Architecture", value: "Multi-Region Distributed S3", detail: "Encrypted with AES-256 and HIPAA compliance." },
    ],
    whitepaper: {
      doi: "10.1126/scitranslmed.adf4412",
      journal: "Science Translational Medicine",
      publicationDate: "2025",
      authors: ["Codex Bio Genomics Group"],
      citations: 64,
      downloadUrl: "#",
      keyFindings: ["Reduces genomic data processing cost per sample by 75%."],
    },
  },

  "synthetic-design": {
    id: "synthetic-design",
    title: "Synthetic Biology Design",
    subtitle: "Automated Wet-Lab Gene Construction",
    category: "Automation Capability",
    abstract:
      "Closed-loop DNA synthesis automation translating digital sequence files into physical viral vector constructs and mRNA therapies overnight.",
    highlights: [
      "Overnight DNA assembly up to 20kb sequence length.",
      "Automated sequence verification via Oxford Nanopore sequencing.",
      "Zero-error enzymatic ligation protocols.",
    ],
    specs: [
      { label: "Synthesis Rate", value: "100 Sequences / Day", detail: "Fully automated liquid handler dispatch." },
      { label: "Accuracy", value: "99.999% Sequence Fidelity", detail: "Enzymatic error-correction proofreading." },
    ],
    whitepaper: {
      doi: "10.1016/j.cels.2025.04.009",
      journal: "Cell Systems",
      publicationDate: "2025",
      authors: ["Codex Bio Synthetic Group"],
      citations: 52,
      downloadUrl: "#",
      keyFindings: ["Enables overnight turnaround from sequence file to physical plasmid."],
    },
  },

  "clinical-accel": {
    id: "clinical-accel",
    title: "Clinical Pipeline Acceleration",
    subtitle: "Bayesian Virtual Trial Simulation",
    category: "Clinical Capability",
    abstract:
      "Bayesian trial simulation selecting optimal patient bio-stratifications to maximize Phase II efficacy outcomes and minimize sample size requirements.",
    highlights: [
      "60% Increase in Phase II cohort response precision.",
      "Virtual synthetic twin control arms.",
      "Real-time biomarker tracking during ongoing trials.",
    ],
    specs: [
      { label: "Cohort Precision", value: "60% Higher Response Rate", detail: "Biomarker-guided patient enrollment." },
      { label: "Trial Duration", value: "35% Shorter Phase II", detail: "Adaptive trial protocol design." },
    ],
    whitepaper: {
      doi: "10.1021/acs.jmedchem.5b00192",
      journal: "Journal of Clinical Investigation",
      publicationDate: "2025",
      authors: ["Codex Bio Clinical AI Group"],
      citations: 45,
      downloadUrl: "#",
      keyFindings: ["Virtual trial twin simulations accurately predict Phase II efficacy endpoints."],
    },
  },

  "regulatory-intel": {
    id: "regulatory-intel",
    title: "Regulatory Intelligence",
    subtitle: "Automated IND Dossier Generation",
    category: "Compliance Capability",
    abstract:
      "Automated IND document synthesis and real-time biomarker verification for streamlined FDA submission workflows and regulatory auditability.",
    highlights: [
      "Generates FDA eCTD Module 3 & 4 dossiers automatically.",
      "Complete data provenance tracking back to raw wet-lab sensor output.",
      "Real-time 21 CFR Part 11 audit log generation.",
    ],
    specs: [
      { label: "IND Assembly Latency", value: "48 Hours", detail: "Down from standard 6-8 weeks of manual compilation." },
      { label: "Audit Readiness", value: "100% Traceable Provenance", detail: "Immutable cryptographic ledger signatures." },
    ],
    whitepaper: {
      doi: "10.1038/s41587-026-0892-x",
      journal: "Regulatory Science & Innovation",
      publicationDate: "2025",
      authors: ["Codex Bio Regulatory Group"],
      citations: 31,
      downloadUrl: "#",
      keyFindings: ["Reduces regulatory filing assembly time by 80%."],
    },
  },

  "bio-compute": {
    id: "bio-compute",
    title: "Custom Bio-Compute Infrastructure",
    subtitle: "Quantum Molecular Dynamics & Tensor Acceleration",
    category: "HPC Capability",
    abstract:
      "GPU-accelerated tensor kernels specifically compiled for quantum molecular dynamics, electrostatic grid calculations, and flexible docking simulation.",
    highlights: [
      "Custom C++/CUDA kernels for 10x faster molecular dynamics.",
      "Hybrid quantum-classical variational eigensolver (VQE) integration.",
      "Petabyte RAM distributed shared memory pools.",
    ],
    specs: [
      { label: "Compute Speedup", value: "10.4x CUDA Acceleration", detail: "Versus standard GROMACS / AMBER benchmarks." },
      { label: "Memory Bandwidth", value: "3.2 TB/sec Interconnect", detail: "NVIDIA NVLink mesh matrix." },
    ],
    whitepaper: {
      doi: "10.1126/scitranslmed.adf4412",
      journal: "Nature Computational Science",
      publicationDate: "2025",
      authors: ["Sameep Chaurasia", "Codex Bio Bio-Compute Team"],
      citations: 74,
      downloadUrl: "#",
      keyFindings: ["Executes 100 ns molecular dynamics trajectories in under 2 hours."],
    },
  },

  // --- MISSION PILLARS ---
  "pillar-precision": {
    id: "pillar-precision",
    title: "Precision Engineering",
    subtitle: "Atomic-Resolution Ligand Binding",
    category: "Mission Pillar",
    abstract:
      "Model-guided target selection and atomic-resolution ligand binding optimization. We resolve atomic coordinates with sub-angstrom precision to eliminate off-target cross-reactivity.",
    highlights: [
      "Atomic binding geometry optimization.",
      "Hydrogen bond & hydrophobic contact network mapping.",
      "Custom forcefield parameterization for non-canonical amino acids.",
    ],
    specs: [
      { label: "Target Precision", value: "0.38Å Alignment", detail: "Benchmarked against cryo-EM electron density maps." },
      { label: "Selectivity Index", value: "> 1,000-fold Selectivity", detail: "Over related kinase & receptor isoforms." },
    ],
    whitepaper: {
      doi: "10.1038/s41587-026-0892-x",
      journal: "Structure & Biophysics",
      publicationDate: "2026",
      authors: ["Sameep Chaurasia"],
      citations: 55,
      downloadUrl: "#",
      keyFindings: ["Achieves 1,000x selectivity over off-target cardiac kinase receptors."],
    },
  },

  "pillar-velocity": {
    id: "pillar-velocity",
    title: "Algorithmic Velocity",
    subtitle: "Parallel Cloud Bio-Simulation",
    category: "Mission Pillar",
    abstract:
      "Parallelized cloud bio-simulation reducing multi-year trial iteration cycles into weeks. Closed-loop automated wet-lab validation continuously trains our predictive transformers.",
    highlights: [
      "Compresses target validation from 24 months to 6 weeks.",
      "Autonomous 24/7 robotic sample processing.",
      "Real-time Bayesian active learning loop.",
    ],
    specs: [
      { label: "Cycle Compression", value: "6.4x Speedup", detail: "Across hit-to-lead and lead optimization stages." },
      { label: "Robotic Throughput", value: "5,000 Assays / Day", detail: "Continuous unattended lab operation." },
    ],
    whitepaper: {
      doi: "10.1126/scitranslmed.adf4412",
      journal: "Biotech Automation Review",
      publicationDate: "2025",
      authors: ["Sameep Chaurasia"],
      citations: 41,
      downloadUrl: "#",
      keyFindings: ["Reduces lead discovery phase from 3 years to 5 months."],
    },
  },

  "pillar-scale": {
    id: "pillar-scale",
    title: "Petabase Scale",
    subtitle: "Spatial Multi-Omics Data Pipelines",
    category: "Mission Pillar",
    abstract:
      "Cloud-native compute pipelines processing petabytes of spatial multi-omics data. Unifying transcriptomics, proteomics, and epigenomics into a single queryable graph database.",
    highlights: [
      "Multi-petabyte graph dataset spanning 250M+ sequences.",
      "Single-cell spatial transcriptomics at sub-cellular resolution.",
      "Graph neural network knowledge extraction.",
    ],
    specs: [
      { label: "Database Volume", value: "4.8 Petabytes", detail: "Fully indexed multi-modal bio-knowledge graph." },
      { label: "Query Speed", value: "< 200 ms Graph Traversal", detail: "Connecting genes, proteins, and clinical phenotypes." },
    ],
    whitepaper: {
      doi: "10.1016/j.cels.2025.04.009",
      journal: "Genomics & Informatics",
      publicationDate: "2025",
      authors: ["Sameep Chaurasia"],
      citations: 62,
      downloadUrl: "#",
      keyFindings: ["Enables instant graph-based discovery of hidden biomarker correlations."],
    },
  },
};
