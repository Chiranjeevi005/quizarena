# Quality Metrics

Quality metrics measure the reliability, security, and correctness of the product being built.

## Metrics Defined

### M-QUAL-001: QA Pass Rate
- **Purpose:** Measures the effectiveness of initial implementation prior to QA verification.
- **Formula:** `(First-Time Passed QA Checks / Total QA Checks) * 100`

### M-QUAL-002: Runtime Success
- **Purpose:** Tracks the stability of the application in execution environments.
- **Formula:** `(Uptime / Total Time) * 100` OR `(Successful Executions / Total Executions) * 100`

### M-QUAL-003: Regression Rate
- **Purpose:** Measures how often new changes break existing, previously validated functionality.
- **Formula:** `(Number of Regression Defects / Total Number of Defects) * 100`

### M-QUAL-004: Security Findings
- **Purpose:** Tracks identified vulnerabilities in the codebase.
- **Formula:** `Count(Critical, High, Medium Security Vulnerabilities Detected)`

### M-QUAL-005: Documentation Completeness
- **Purpose:** Ensures the necessary artifact documentation is generated and accurate.
- **Formula:** `(Required Documents Present and Valid / Total Required Documents) * 100`

### M-QUAL-006: Verification Completeness
- **Purpose:** Measures the extent to which acceptance criteria have been demonstrably verified.
- **Formula:** `(Verified Acceptance Criteria / Total Acceptance Criteria) * 100`
