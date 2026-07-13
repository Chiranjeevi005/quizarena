# Repository Metrics

Repository metrics assess the overall health, hygiene, and compliance of the codebase and its documentation.

## Metrics Defined

### M-REPO-001: Sprint Count
- **Purpose:** Tracks the maturity and iteration volume of the project.
- **Formula:** `Total Number of Completed Sprints`

### M-REPO-002: Documentation Coverage
- **Purpose:** Measures the presence of required documentation (READMEs, Architecture diagrams) against the codebase size.
- **Formula:** `(Documented Components / Total Components) * 100`

### M-REPO-003: Artifact Completeness
- **Purpose:** Ensures that governance artifacts (like Sprint Lock, Architecture Review) are properly stored and formatted.
- **Formula:** `(Compliant Artifacts / Total Artifacts) * 100`

### M-REPO-004: Standards Compliance
- **Purpose:** Measures alignment with `.ai-sdlc/standards/` requirements.
- **Formula:** `(Standards Adhered To / Total Applicable Standards) * 100`

### M-REPO-005: Repository Hygiene
- **Purpose:** Tracks the cleanliness of the repository (e.g., absence of stale branches, unresolved merge conflicts, missing tags).
- **Formula:** `Count(Hygiene Violations Detected)`
