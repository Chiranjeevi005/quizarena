# Architecture Metrics

Architecture metrics evaluate the adherence to structural integrity, layer boundaries, and the effectiveness of the Architecture Review process.

## Metrics Defined

### M-ARCH-001: Architecture Review Pass Rate
- **Purpose:** Measures the frequency at which implementation plans are approved on the first review.
- **Formula:** `(First-Time Approved Plans / Total Submitted Plans) * 100`

### M-ARCH-002: Architecture Violations
- **Purpose:** Tracks the total number of identified architecture violations over a given period.
- **Formula:** `Sum(Architecture Violations Detected)`

### M-ARCH-003: Rule Violations by Category
- **Purpose:** Identifies which types of architectural rules are broken most frequently.
- **Formula:** `Count(Violations grouped by Category)`

### M-ARCH-004: Re-review Frequency
- **Purpose:** Measures the churn in the review cycle due to required revisions.
- **Formula:** `Average(Number of Review Cycles per Implementation Plan)`

### M-ARCH-005: Layer Boundary Violations
- **Purpose:** Tracks specific instances where code crosses forbidden architectural boundaries (e.g., UI directly accessing Database).
- **Formula:** `Count(Layer Boundary Violations Detected via static analysis)`

### M-ARCH-006: Dependency Violations
- **Purpose:** Measures unauthorized or circular dependencies introduced in the codebase.
- **Formula:** `Count(Unauthorized Dependencies + Circular Dependencies)`
