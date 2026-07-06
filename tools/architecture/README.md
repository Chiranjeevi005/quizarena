# Architecture Governance Engine

## Purpose

This engine is the permanent engineering governance tool for QuizArena. It creates a complete structural inventory of the repository, mapping ownership, layers, and dependencies. It forms the baseline for architecture migrations, refactoring, and CI validation.

## Architecture

- **core**: Shared infrastructure (`Logger`, `FileWalker`, `RepositoryContext`).
- **config**: Constant domains, layers, classification enums.
- **ownership**: Logic to map a file to a Feature, Domain, Layer, and assign Responsibility.
- **dependency**: Static import/export analysis using the TypeScript Compiler API (`ts-morph`).
- **inventory**: The classification rules engine and duplicate/shared candidate detectors.
- **reporting**: JSON and Markdown report generators.
- **scripts**: CLI entry points.

## Usage

Run the inventory scan without modifying the application code:

```bash
npm run architecture:inventory
```

Reports will be generated in `reports/`.

## Extending

- Add new CLI commands to `scripts/`
- Update `ownership/` resolvers to refine classifications.
- Customize `dependency/` logic for deeper AST inspections.
