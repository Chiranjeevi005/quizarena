# SDLC Health Score

The SDLC Health Score provides a high-level, composite indicator of the overall operational health of the AI SDLC.

## Calculation

The Health Score is a weighted average derived from the performance across six core domains:

1. **Architecture** (Adherence to design principles)
2. **Quality** (Defect rates and security posture)
3. **Automation** (Pipeline and worker reliability)
4. **Documentation** (Artifact completeness)
5. **Repository** (Hygiene and standards compliance)
6. **Workflow** (Velocity and sprint throughput)

## Governance Policy

> **[IMPORTANT]**
> The SDLC Health Score is an **informational metric only**.

- A low Health Score indicates friction, tech debt, or inefficiency.
- A low Health Score **never** automatically blocks a Sprint Lock.
- A low Health Score **never** automatically halts automation pipelines.
- It serves as a discussion point for Engineering Management to prioritize continuous improvement initiatives.
