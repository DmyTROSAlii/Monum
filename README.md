# Monum

Monum is a project and task management system built with [Next.js](https://nextjs.org) using modern technologies for team collaboration.

## Table of Contents

- [Main Features](#main-features)
- [Technologies](#technologies)
- [Examples](#examples)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Useful Scripts](#useful-scripts)
- [Learn More](#learn-more)

## Main Features

- Manage workspaces, projects, and tasks
- Assign responsible users and set priorities
- Task comments and email notifications
- Project analytics (completed, overdue, active tasks)
- Member avatars and project image uploads
- Responsive interface with dark mode

## Technologies

- **Next.js** (App Router)
- **React** & **TypeScript**
- **Appwrite** (database, users, files)
- **React Query** (data caching and synchronization)
- **Tailwind CSS** (styling)
- **Zod** (form validation)
- **Nodemailer** (email notifications)
- **Sonner** (toast notifications)

## Examples

- **Authentication:**
  ![Release slider](https://photos.app.goo.gl/tVX11CxFMQFiyEXM6)
- **Main Page:**
  ![Top anime](./img/preview/list-section.png)
- **Table View:**
  ![Contact form](./img/preview/contact-section.png)
- **Kanban View:**
  ![Contact form](./img/preview/contact-section.png)
- **Calendar View:**
  ![Contact form](./img/preview/contact-section.png)
- **Task View:**
  ![Contact form](./img/preview/contact-section.png)

## Project Structure

```
src/
  app/                # Pages and layout
  components/         # UI components
  features/           # Features: auth, members, projects, tasks, workspaces
  hooks/              # Custom hooks
  lib/                # Utilities, integrations (appwrite, email)
  config.ts           # Appwrite and other configs
public/               # Static files
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

2. Create a `.env.local` file and add the required environment variables (Appwrite, email, etc).

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Setup

You need to configure Appwrite (endpoint, projectId, API key) and email (SMTP for Nodemailer). Example `.env.local`:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=...
NEXT_PUBLIC_APPWRITE_PROJECT=...
NEXT_APPWRITE_KEY=...
EMAIL_USER=...
EMAIL_PASS=...
```

## Useful Scripts

- `npm run build` — build the project
- `npm run lint` — lint the code
- `npm run test` — run tests (if configured)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Monum** — a modern tool for team collaboration and effective project management.
