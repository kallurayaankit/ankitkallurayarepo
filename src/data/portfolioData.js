export const heroData = {
  name: "Ankit Kalluraya",
  role: "AI QA Engineer, AI SDET & AI Engineer",
  description:
    "I build automation frameworks, validate AI systems, and ensure quality at scale.",
  contactEmail: "kallurayaankit@gmail.com", // 
};

export const aboutData = {
  title: "About Me",
  paragraphs: [
    "I'm a Senior QA Engineer with Multiple years of experience in test automation, CI/CD, and AI quality assurance. I have worked at iTech Labs (GLI Subsidiary) and Gaming Labs International, Australia.",
    "I'm passionate about bridging the gap between traditional testing and AI-driven quality. I've built test frameworks for web, mobile, and LLM-based applications.",
    "Outside of work, I contribute to open-source and explore AI safety, observability, and MLOps."
  ]
};

export const experienceData = [
  {
    company: "iTech Labs (GLI Subsidiary)",
    role: "Senior QA Engineer",
    period: "July 2022 – Aug 2025",
    points: [
      "Lead test automation for gaming compliance platform, reducing regression time by 40%",
      "Implemented CI/CD pipelines with GitHub Actions and Playwright",
      "Mentored junior QA engineers in automation best practices"
    ]
  },
  {
    company: "Gaming Labs International, Australia",
    role: "Test Automation Engineer",
    period: "Nov 2021 – May 2022",
    points: [
      "Designed and maintained cross‑browser test suites using Selenium and Cypress",
      "Integrated test results into Jira and Slack for real‑time visibility",
      "Improved test flakiness by 25% through robust waits and retries"
    ]
  }
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Java"],
  testing: ["Playwright", "Cypress", "Selenium", "Jest", "Postman", "JMeter", "Locust", "OWASP ZAP", "Pact"],
  ciCd: ["GitHub Actions", "GitLab CI", "Jenkins", "Docker"]
};

export const projectsData = [
  // ========== AI & LLM Projects ==========
  {
    title: "AI Agent Quality Sandbox",
    description: "Multi‑agent adversarial testing framework with Doer, Adversary, and Judge agents to evaluate AI systems for security, bias, and correctness.",
    tech: ["Python", "LangChain", "Claude API", "Pytest"],
    repo: "https://github.com/kallurayaankit/ai-agent-quality-sandbox",
    demo: null
  },
  {
    title: "AI Agent Validation Framework",
    description: "LLM‑as‑a‑Judge framework that validates AI agent responses for required content, sentiment, and hallucinations using parameterised JSON tests.",
    tech: ["Python", "Pytest", "TextBlob", "GitHub Actions"],
    repo: "https://github.com/kallurayaankit/ai-agent-validation-framework",
    demo: null
  },
  {
    title: "AI Quality Ops Platform",
    description: "End‑to‑end quality ecosystem with five automated pillars (Data, Accuracy, Security, Performance, Observability) – orchestrates 11 QA microservices.",
    tech: ["Python", "FastAPI", "Docker", "Railway"],
    repo: "https://github.com/kallurayaankit/ai-quality-ops-platform",
    demo: "https://ai-quality-ops.up.railway.app"
  },
  {
    title: "Multi‑agent Sandbox",
    description: "Test sandbox with Doer, Adversary, and Judge agents to evaluate AI responses for security and bias, driven by JSON test scenarios.",
    tech: ["Python", "LangChain", "Pytest"],
    repo: "https://github.com/kallurayaankit/multi-agent-sandbox",
    demo: null
  },

  // ========== MLOps & Production AI ==========
  {
    title: "Churn Prediction Pipeline",
    description: "End‑to‑end churn prediction ML pipeline with data validation, training, and model registry.",
    tech: ["Python", "Scikit-learn", "Pandas", "MLflow"],
    repo: "https://github.com/kallurayaankit/churn-prediction",
    demo: null
  },
  {
    title: "Fraud Detection API",
    description: "Real‑time fraud detection with drift monitoring using FastAPI, Kafka, Evidently, and Prometheus.",
    tech: ["Python", "FastAPI", "Kafka", "Prometheus"],
    repo: "https://github.com/kallurayaankit/fraud-detection-api",
    demo: null
  },
  {
    title: "Medical Q&A API",
    description: "Medical Q&A API using RAG and Hugging Face Inference with FastAPI, Chroma, and Docker.",
    tech: ["Python", "FastAPI", "RAG", "Docker"],
    repo: "https://github.com/kallurayaankit/medical-qa-api",
    demo: null
  },
  {
    title: "Model Hub (Content Moderation API)",
    description: "Real‑time multi‑modal content moderation API for text and images with async inference and explainability.",
    tech: ["Python", "FastAPI", "Transformers"],
    repo: "https://github.com/kallurayaankit/model-hub",
    demo: null
  },
  {
    title: "Active Learning Classifier",
    description: "Live demo of an active learning text classifier that predicts sentiment and improves over time.",
    tech: ["Python", "Scikit-learn", "Streamlit"],
    repo: "https://github.com/kallurayaankit/active-learning-classifier",
    demo: "https://huggingface.co/spaces/kallurayaankit/active-learning"
  },

  // ========== Test Automation Frameworks ==========
  {
    title: "Playwright Test Automation Framework",
    description: "Scalable end‑to‑end testing framework with Page Object Model, visual regression, and parallel execution.",
    tech: ["TypeScript", "Playwright", "Allure", "GitHub Actions"],
    repo: "https://github.com/kallurayaankit/playwright-framework",
    demo: null
  },
  {
    title: "Selenium Java Legacy Test Pack",
    description: "Test automation using Selenium WebDriver, Java, Maven, TestNG, and Page Object Model for SauceDemo.",
    tech: ["Java", "Selenium", "TestNG", "Maven"],
    repo: "https://github.com/kallurayaankit/selenium-java-legacy",
    demo: null
  },
  {
    title: "API Test Suite with Pytest + Schema Validation",
    description: "REST API testing with pytest, Requests, JSON Schema validation, and Allure reporting. Data‑driven from JSON.",
    tech: ["Python", "Pytest", "Requests", "Allure"],
    repo: "https://github.com/kallurayaankit/api-test-suite",
    demo: null
  },
  {
    title: "Locust Performance Test Suite",
    description: "Performance & load testing with Locust, simulating real user traffic, measuring p95 latency, and asserting SLA thresholds.",
    tech: ["Python", "Locust", "Docker", "GitHub Actions"],
    repo: "https://github.com/kallurayaankit/locust-performance-suite",
    demo: null
  },
  {
    title: "Mobile Test Automation with Playwright",
    description: "Mobile web testing using Playwright's device emulation (iPhone 13) – validates responsive UI without Appium.",
    tech: ["Python", "Playwright"],
    repo: "https://github.com/kallurayaankit/mobile-test-automation",
    demo: null
  },
  {
    title: "MongoDB + Playwright Data Validation Pipeline",
    description: "End‑to‑end data validation: seed MongoDB, perform UI action with Playwright, then assert database state changed correctly.",
    tech: ["Python", "MongoDB", "Playwright", "Flask"],
    repo: "https://github.com/kallurayaankit/mongodb-playwright-data-validation",
    demo: null
  },
  {
    title: "Pact Contract Testing",
    description: "Consumer‑driven contract testing using the Pact pattern – consumer generates pact, provider verifies in CI.",
    tech: ["Python", "Pact", "Flask", "GitHub Actions"],
    repo: "https://github.com/kallurayaankit/pact-contract-testing",
    demo: null
  },
  {
    title: "Security Test Automation with OWASP ZAP",
    description: "Automated security scanning pipeline using OWASP ZAP, pytest, and GitHub Actions – fails CI on high/medium risks.",
    tech: ["Python", "OWASP ZAP", "Docker", "GitHub Actions"],
    repo: "https://github.com/kallurayaankit/security-zap-automation",
    demo: null
  },
  {
    title: "Data Quality Validation",
    description: "Lightweight data quality test suite using pandas and pytest – validates CSV for nulls, duplicate IDs, out‑of‑range values.",
    tech: ["Python", "Pandas", "Pytest", "GitHub Actions"],
    repo: "https://github.com/kallurayaankit/data-quality-validation",
    demo: null
  },
  {
    title: "Data Validation Pipeline",
    description: "End‑to‑end data validation pipeline integrating MongoDB, Playwright, and Flask.",
    tech: ["Python", "MongoDB", "Playwright", "Flask"],
    repo: "https://github.com/kallurayaankit/data-validation-pipeline",
    demo: null
  },

  // ========== Hugging Face Spaces (Live Demos) ==========
  {
    title: "OmniServe (Hugging Face Space)",
    description: "Unified interface for serving multiple LLM models with quality metrics tracking.",
    tech: ["Gradio", "Transformers", "FastAPI"],
    repo: null,
    demo: "https://huggingface.co/spaces/kallurayaankit/OmniServe"
  },
  {
    title: "Synapse (Hugging Face Space)",
    description: "Interactive tool for testing prompt robustness and monitoring LLM drift.",
    tech: ["Streamlit", "LangSmith", "OpenAI"],
    repo: null,
    demo: "https://huggingface.co/spaces/kallurayaankit/Synapse"
  }
];

export const socialLinks = {
  github: "https://github.com/kallurayaankit",
  huggingface: "https://huggingface.co/kallurayaankit",
  linkedin: "https://linkedin.com/in/ankit-kalluraya", // ✅ CHANGE THIS
  email: "ankit@example.com" // ✅ CHANGE THIS
};