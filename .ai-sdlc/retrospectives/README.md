# AI SDLC Retrospectives

This directory contains observational, data-driven retrospective reports generated after executing real engineering sprints using the AI SDLC framework.

## Purpose
Retrospectives are the engine of Continuous Improvement. They analyze actual usage data, metrics, and outcomes to identify friction, overhead, and areas for optimization. They ensure the SDLC evolves based on empirical evidence rather than theoretical assumptions.

## Directory Structure
Retrospectives are organized by SDLC major version, then chronologically (e.g., quarterly or after a major release):

```text
.ai-sdlc/retrospectives/
└── v1/
    ├── Quarter-1.md
    └── ...
```

## Mandatory Analytical Questions
Every retrospective document must answer the following questions based on aggregated metrics and explicit feedback:

1. **Worker Reliability:** Which agent/persona failed most often?
2. **Process Efficiency:** Which checklist produced the most rework or bottlenecks?
3. **Review Efficacy:** Which review (Architecture, QA) caught the highest-value defects?
4. **Compliance Friction:** Which engineering standards were most frequently violated?
5. **Operational Drag:** Which parts of the SDLC caused unnecessary overhead?
6. **Instruction Quality:** Which prompts/instructions required the most refinement?

## Governance Rule
> **[IMPORTANT]**
> Retrospective findings must be based strictly on **actual usage data and metrics**, not assumptions. Findings from retrospectives feed directly into the Continuous Improvement Framework to authorize versioned updates to the SDLC.
