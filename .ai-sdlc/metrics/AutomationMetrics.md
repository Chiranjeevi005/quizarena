# Automation Metrics

Automation metrics track the efficiency, reliability, and utilization of the AI SDLC's automated workers and workflow engine.

## Metrics Defined

### M-AUTO-001: Worker Activation Count
- **Purpose:** Tracks the utilization frequency of AI workers.
- **Formula:** `Count(Worker Trigger Events)`

### M-AUTO-002: Automation Success Rate
- **Purpose:** Measures the reliability of automated workflows completing without manual intervention.
- **Formula:** `(Workflows Completed Successfully / Total Workflows Initiated) * 100`

### M-AUTO-003: Retry Frequency
- **Purpose:** Identifies fragile automated steps that require retries to succeed.
- **Formula:** `Count(Workflow Step Retries)`

### M-AUTO-004: Automation Failures
- **Purpose:** Tracks hard failures where an automated workflow could not recover.
- **Formula:** `Count(Workflows Terminated with Error)`

### M-AUTO-005: Worker Idle Time
- **Purpose:** Measures the capacity and downtime of the worker fleet.
- **Formula:** `Total Time - Active Execution Time per Worker`

### M-AUTO-006: Average Workflow Time
- **Purpose:** Measures the speed of standard automation pipelines.
- **Formula:** `Average(Timestamp(Workflow End) - Timestamp(Workflow Start))`

### M-AUTO-007: Automatic Routing Accuracy
- **Purpose:** Evaluates how successfully artifacts are routed to the correct worker based on tags.
- **Formula:** `(Correctly Routed Artifacts / Total Routed Artifacts) * 100`
