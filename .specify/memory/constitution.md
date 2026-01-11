<!--
SYNC IMPACT REPORT
==================
Version Change: (new) -> 1.0.0
Rationale: Initial ratification of the project constitution based on existing repository structure and documentation.

Modified Principles:
- N/A (Initial creation)

Added Sections:
- Vision & Scope
- Fundamental Principles
- Governance & Amendment

Templates Requiring Updates:
- .specify/templates/plan-template.md (⚠ Missing - Recommended to create)
- .specify/templates/spec-template.md (⚠ Missing - Recommended to create)
- .specify/templates/tasks-template.md (⚠ Missing - Recommended to create)

Follow-up TODOs:
- Create standard Speckit templates to enforce these principles in workflows.
-->

# Asociatia IDEI Digital Ecosystem Constitution

> **Ratified:** 2026-01-11
> **Version:** 1.0.0
> **Last Amended:** 2026-01-11

## 1. Vision & Scope

The **Asociatia IDEI Digital Ecosystem** is a unified platform comprising a public website, an e-learning platform, and shared digital resources. Its purpose is to support the NGO's mission of education, innovation, and community development through a scalable, maintainable, and user-friendly digital presence.

The ecosystem includes:

- **Website**: Next.js + Builder.io application for content, marketing, and e-commerce.
- **E-learning**: OpenEDX-based platform for course delivery.
- **Shared Infrastructure**: Common UI components, utilities, and types shared across applications.

## 2. Fundamental Principles

### 2.1. Monorepo Modularity

**Rule:** The codebase MUST be organized as a monorepo with clear separation between applications (`apps/`) and shared packages (`packages/`).
**Rationale:** This structure maximizes code reuse (DRY) while allowing applications to evolve independently. Dependency boundaries must be respected to prevent tight coupling between distinct platforms (e.g., Website should not depend on OpenEDX internals).

### 2.2. Platform Specialization

**Rule:** Use the right tool for the job: Next.js/Builder.io for marketing and flexible content; OpenEDX for structured learning experiences.
**Rationale:** Attempting to force one platform to do everything leads to suboptimal user experiences. We leverage the strengths of specialized platforms while bridging them with shared branding and navigation.

### 2.3. Design Consistency

**Rule:** All user-facing interfaces MUST utilize the Shared UI library (`@asociatia-idei/shared-ui`) for core components (buttons, headers, typography).
**Rationale:** A consistent visual identity builds trust and usability. Updates to the brand should propagate from a single source of truth rather than requiring manual updates across multiple applications.

### 2.4. Type Safety & Quality

**Rule:** All custom code (React, Node.js scripts) MUST be written in TypeScript. Strict linting and formatting rules MUST be enforced.
**Rationale:** As a mission-critical platform for the NGO, we prioritize reliability and maintainability. Strong typing reduces runtime errors and serves as self-documentation for future contributors.

### 2.5. Infrastructure as Code

**Rule:** Deployment configurations (Docker, Vercel) and documentation MUST be committed alongside the code.
**Rationale:** The system must be reproducible. Any developer should be able to spin up the environment using standard commands (`npm run ...`, `docker-compose up`) without hidden knowledge.

## 3. Governance & Amendment

### 3.1. Versioning

This constitution follows Semantic Versioning (Major.Minor.Patch):

- **Major**: Fundamental changes to principles or architectural direction.
- **Minor**: Addition of new principles or significant clarifications.
- **Patch**: Wording fixes and non-substantive updates.

### 3.2. Amendment Process

Changes to this constitution require a Pull Request and review by the technical lead / maintainers. Amendments must include a rationale and an impact analysis on existing systems.

### 3.3. Compliance

All new feature specifications and architectural decisions MUST be checked against these principles. Deviations must be explicitly justified and approved.
