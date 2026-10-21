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
  {
    "title": "ReleaseRadar",
    "category": "Flagship · AI QA",
    "description": "A focused regression-testing prototype that exposes gaps in a passing checkout test suite. Freeze assertions, challenge three deliberately seeded bugs, review proposed additions, and rerun unchanged assertions against the corrected build.",
    "note": "Prepared and imported cases run in the hosted demo. Live test generation requires a configured local server. Scope: one checkout requirement, not release certification.",
    "tech": [
      "JavaScript",
      "OpenAI",
      "Playwright",
      "GitHub Actions"
    ],
    "repo": "https://github.com/kallurayaankit/release-radar",
    "demo": "https://releaseradar-sydney-demo.glossychar1.chatgpt.site/",
    "demoLabel": "Explore demo",
    "evidence": "https://github.com/kallurayaankit/release-radar#challenge-workflow",
    "evidenceLabel": "Workflow & evidence"
  },
  {
    "title": "Jev Flight Agent",
    "category": "Flagship · Independent AI",
    "description": "A standalone browser agent for natural-language flight searches. Jev selects typed operations and observed DOM targets; a separate language model supplies field text, and Playwright executes the actions. The loop checks stale page state and bounds execution.",
    "note": "Local application requiring API keys and Chrome. Includes recorded demonstrations and search-result verification; it is a search prototype, not a booking service.",
    "tech": [
      "Python",
      "Jev / TypeSafe AI",
      "Playwright"
    ],
    "repo": "https://github.com/kallurayaankit/jev-flight-agent",
    "evidence": "https://github.com/kallurayaankit/jev-flight-agent/blob/main/docs/demo.mp4",
    "evidenceLabel": "Recorded demonstration"
  },
  {
    "title": "Assay",
    "category": "Supporting · AI evaluation",
    "description": "Calibrates an LLM judge against human-labeled examples using Cohen's kappa. The default gate blocks uncalibrated scoring; reports retain calibration provenance and track model-call budgets.",
    "tech": [
      "Python",
      "Ollama",
      "LLM evaluation"
    ],
    "repo": "https://github.com/kallurayaankit/assay"
  },
  {
    "title": "Jev Ticket Router",
    "category": "Supporting · Independent AI",
    "description": "A FastAPI prototype that classifies support tickets by team, urgency, and customer sentiment in a batched Jev call. Department confidence below 0.6 sends the ticket to human review.",
    "note": "Requires a TypeSafe API key. Prototype scope; no production-service claim.",
    "tech": [
      "Python",
      "FastAPI",
      "Jev"
    ],
    "repo": "https://github.com/kallurayaankit/jev-ticket-router"
  },
  {
    "title": "LLMTestKit",
    "category": "Supporting · AI QA",
    "description": "Local-model evaluation and red-team tooling with deterministic checks, a correctness judge, prompt-injection and jailbreak cases, and HTML reports with score provenance.",
    "note": "Early-stage toolkit. RAG, groundedness, and broader agent evaluation remain roadmap items.",
    "tech": [
      "Python",
      "Ollama",
      "Red teaming"
    ],
    "repo": "https://github.com/kallurayaankit/llmtestkit"
  },
  {
    "title": "Playwright Test Automation Framework",
    "category": "Supporting · Test automation",
    "description": "Python and Pytest UI automation for SauceDemo, organized with page objects and JSON test data. Includes parallel test execution and a GitHub Actions workflow.",
    "tech": [
      "Python",
      "Pytest",
      "Playwright"
    ],
    "repo": "https://github.com/kallurayaankit/playwright-framework"
  }
];

export const socialLinks = {
  github: "https://github.com/kallurayaankit",
  huggingface: "https://huggingface.co/kallurayaankit",
  linkedin: "https://linkedin.com/in/ankit-kalluraya", // ✅ CHANGE THIS
  email: "kallurayaankit@gmail.com" // ✅ CHANGE THIS
};
