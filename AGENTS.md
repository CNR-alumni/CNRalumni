# AGENTS.md — CNR Alumni Website

## Project overview
- **Project:** CNR Alumni website (เว็บไซต์ศิษย์เก่า)
- **GitHub repository:** https://github.com/CNR-alumni/CNRalumni
- **Goal:** Maintain and improve a responsive, accessible, easy-to-use alumni website.
- **Working language:** Use Thai for user-facing text and project updates unless a task specifies otherwise. Keep code identifiers consistent with existing conventions.

## Source of truth and collaboration
- The GitHub repository is the source of truth for application code and version history.
- ChatGPT Project is used for requirements, design discussions, planning, and feedback; its chat history is **not automatically available** to Codex.
- Capture confirmed decisions in version-controlled files (for example `README.md`, `docs/decisions.md`, or task-specific documentation) so either workflow can refer to them.
- Never assume a decision from a conversation is implemented until it exists in the repository.

## Before making changes
1. Read `README.md`, this file, and relevant files in the repository.
2. Identify the actual tech stack, package manager, build commands, routing, and deployment configuration from the code. **Do not assume** a framework or hosting provider.
3. Inspect the current implementation and follow its patterns. Prefer small, focused changes.
4. For ambiguous requirements, state assumptions in the task summary rather than inventing site content or integrations.

## Development rules
- Preserve working functionality and existing links unless the task explicitly requests a change.
- Prioritize mobile responsiveness, Thai typography, accessibility, keyboard navigation, and readable contrast.
- Reuse existing components, assets, tokens, and styles before introducing new dependencies.
- Avoid unrelated refactors. Keep changes easy to review and revert.
- Never commit secrets, API tokens, passwords, personal information, or `.env` files.
- Treat alumni/student data as sensitive: do not add real personal data, credentials, or public exports without explicit authorization.
- Confirm before destructive operations, schema migrations, changes to authentication/permissions, or production deployments.

## Validation and delivery
1. Run relevant checks (lint, tests, build) using commands discovered in the repository; report what ran and any failures.
2. Check key pages at mobile and desktop sizes when a preview/browser is available.
3. Check links, images, forms, and basic accessibility for changed pages.
4. At the end of each task, report in Thai:
   - What changed and which files were touched
   - Which checks passed or could not run
   - Any remaining risks or next steps
5. Use a descriptive commit message. Create a pull request when the workflow calls for review; do not claim changes are live until deployment is verified.

## Task handoff template
When transferring a request from ChatGPT Project to Codex, include:

- **Objective:** What should change and why
- **Scope:** Pages/files/features in scope
- **Design reference:** Screenshot, mockup, or link (if available)
- **Acceptance criteria:** Observable conditions for completion
- **Constraints:** Existing behaviors, links, data, and styles to preserve
- **Verification:** Tests or browser checks to perform

## Notes for future maintainers
Update this file only when a new project-wide convention has been confirmed. Store feature-specific details in relevant documentation instead of expanding this file indefinitely.
