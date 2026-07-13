# Metric Definitions Standard

This document establishes the required format for all metrics added to the Enterprise Engineering Metrics Framework.

## Template

Every metric must contain the following fields:

- **Metric ID:** Unique identifier for tracking (e.g., `M-ARCH-001`).
- **Name:** Human-readable name of the metric.
- **Purpose:** A concise explanation of *why* this metric is valuable and what behavior it measures.
- **Formula:** The explicit, mathematical method of calculation.
- **Data Source:** Where the data originates (e.g., Jira, Git history, CI/CD pipeline, AI Worker logs).
- **Owner:** The persona responsible for reviewing the metric (e.g., Engineering Manager, Chief Architect).
- **Frequency:** When the metric is calculated (e.g., Per Sprint, Per PR, Real-time).
- **Target:** The optimal threshold or acceptable range for the metric.
- **Interpretation:** Guidance on how to read the metric (e.g., higher is better, spikes indicate instability).
- **Example:** A hypothetical calculation to demonstrate the formula.

## Governance
New metrics cannot be added without an approved update to this framework via standard SDLC governance processes.
