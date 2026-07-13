# AI SDLC Enterprise Report Templates

These templates define the canonical engineering reporting standards for the AI SDLC. No AI worker or sprint may invent its own report format. These templates are domain-agnostic and serve as immutable engineering specifications.

## Ownership and Lifecycle
These templates are owned by the **Engineering Documentation & Knowledge Management Agent**. They represent the permanent documentation contracts consumed and produced by all AI workers in the repository. Once a sprint begins, the relevant templates are populated, reviewed, and finalized. They form the canonical, version-independent record of engineering efforts.

## Mandatory Template Structure
Every template and section within it explicitly supports one of the following states to prevent hallucination or fabrication of information:
- `[ ] VERIFIED`
- `[ ] NOT VERIFIED`
- `[ ] NOT APPLICABLE`

## Templates

### 1. Implementation Report Template
- **File:** `ImplementationReport.template.md`
- **Purpose:** Documents the exact changes made during the implementation phase, including files modified, and architectural, frontend, backend, or infrastructure changes.
- **Producing Agent:** Implementation Agent
- **Consuming Agents:** QA Agent, Architecture Review Agent, Documentation Agent

### 2. Evidence Report Template
- **File:** `EvidenceReport.template.md`
- **Purpose:** Captures the raw verification data and proof that the implementation is functional. Contains logs, typescript checks, lints, and test outputs.
- **Producing Agent:** Evidence Collector / QA Agent
- **Consuming Agents:** Architecture Review Agent, QA Agent

### 3. Architecture Review Template
- **File:** `ArchitectureReview.template.md`
- **Purpose:** Evaluates the implementation against architectural guidelines. Assesses boundaries, scalability, and adherence to established patterns.
- **Producing Agent:** Architecture Review Agent
- **Consuming Agents:** Implementation Agent (for fixes), QA Agent, Documentation Agent

### 4. QA Review Template
- **File:** `QAReview.template.md`
- **Purpose:** Assesses software quality across multiple dimensions, including security, performance, validation, and production readiness.
- **Producing Agent:** QA Agent
- **Consuming Agents:** Implementation Agent (for fixes), Documentation Agent

### 5. Documentation Summary Template
- **File:** `DocumentationSummary.template.md`
- **Purpose:** Summarizes the sprint's technical impact on the system, tracking database, UI, and API changes, breaking changes, and changelog updates.
- **Producing Agent:** Documentation Agent
- **Consuming Agents:** Humans, AI SDLC System

### 6. Sprint Manifest Template
- **File:** `SprintManifest.template.md`
- **Purpose:** The permanent, canonical record of a sprint's existence, progress, and metadata (status, dependencies, deliverables, lock status).
- **Producing Agent:** AI SDLC Orchestrator / Documentation Agent
- **Consuming Agents:** All Agents, Humans
