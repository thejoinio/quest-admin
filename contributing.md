# Contributing Guide

This repository is a **private project**. Contributions are limited to company employees with access.
The following standards ensure code quality, maintainability, and smooth collaboration across the team.

---

## Branching

*   **Always create a dedicated branch** for your work — no matter how small the change.
*   If you need to make a quick update while working on something else:
    *   Stash your uncommitted changes.
    *   Checkout a new branch (following the naming convention below).
    *   Rebase on `staging`.
    *   Apply your changes and push.

**Branch Naming Convention:**

```
[wip|feature|chore|bugfix|hotfix]/<app-module>/<descriptive-branch-name>
```

**Examples:**

*   `feature/auth/add-google-sso`
*   `chore/deps/upgrade-nextjs`
*   `bugfix/ui/fix-modal-rendering`

---

## Commit Messages

*   Commits **must be descriptive** and explain *what* and *why*, not just *how*.
*   Keep commits scoped to related changes. Avoid “mixed bag” commits.
*   Use tools like **GitHub Desktop** or local AI helpers to generate well-written commit messages and descriptions.

**Example:**

```
fix(ui): correct alignment on profile avatars

- Updated CSS for avatar component to ensure proper vertical alignment
- Added storybook case for long usernames
```

---

## Pre-Push Checks

*   All code must pass linting, formatting, and tests **before you push**.

Run checks manually if needed:

```bash
npm run lint
npm run test
```

---

## Pull Requests

*   **All work must be merged into `staging` via rebase.**
*   Every PR will be tested automatically via GitHub Actions.

**PR Requirements:**

1.  Clear title.
2.  Use a **standard changelog format** in the description:

```markdown
### What's New
- Added Google SSO support for the login page

### What's Fixed
- Corrected alignment issue on profile avatars

### Additional Notes
- Requires new environment variables for Google OAuth
```

---

## Code Reviews

*   PRs will be reviewed by peers and may require changes before approval.
*   Keep your PRs small and focused to speed up review.
*   Avoid unrelated changes in the same PR.

---

## Summary

*   Work on **branches**, never on `staging` directly.
*   Follow branch naming conventions.
*   Write **clear commit messages**.
*   Pass **linting and tests** before pushing.
*   Submit **documented PRs**.
