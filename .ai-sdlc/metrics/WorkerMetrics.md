# Worker Performance Metrics

Worker Performance Metrics evaluate the effectiveness and efficiency of individual AI agent personas within the SDLC.

## Target Personas
- Implementation Engineer
- Evidence Engineer
- Architecture Reviewer
- QA
- Documentation
- Engineering Manager
- Chief Architect

## Metrics Defined

### M-WORK-001: Completion Time
- **Purpose:** Measures the speed at which a worker completes its assigned task.
- **Formula:** `Average(Timestamp(Task Complete) - Timestamp(Task Start)) by Worker Persona`

### M-WORK-002: Rework Rate
- **Purpose:** Tracks how often a worker's output is rejected by subsequent review or validation steps.
- **Formula:** `(Tasks Rejected / Total Tasks Completed) * 100 by Worker Persona`

### M-WORK-003: Failure Rate
- **Purpose:** Measures the frequency of hard failures (e.g., syntax errors, unhandled exceptions) caused by a worker's output.
- **Formula:** `(Failed Tasks / Total Tasks Attempted) * 100 by Worker Persona`

### M-WORK-004: Utilization
- **Purpose:** Tracks how much of the SDLC workload is handled by each specific persona.
- **Formula:** `(Tasks Assigned to Persona / Total SDLC Tasks) * 100`

### M-WORK-005: Throughput
- **Purpose:** Measures the volume of artifacts or code units produced by a worker over a given time.
- **Formula:** `Count(Deliverables Produced per Sprint) by Worker Persona`
