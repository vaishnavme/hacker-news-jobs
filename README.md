# Hacker News Jobs

A job board that aggregates job postings from Hacker News "Who is Hiring?" threads. Built with Next.js and powered by the [Hacker News Algolia API](https://hn.algolia.com/api).

## Features

- **Search Jobs** - Search through job postings with keywords
- **Filter by Date** - Filter jobs by year and month
- **Filter by Role** - Filter by specific job roles (Frontend, Backend, Full Stack, etc.)
- **Remote Filter** - Toggle to show only remote positions
- **Internship Filter** - Toggle to show only internship positions
- **Freelance Filter** - Toggle to show only freelance positions
- **Copy URL** - Share filtered job searches with others
- **Responsive Design** - Collapsible filter panel for mobile devices
- **Pagination** - Browse through multiple pages of job listings

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [React Query](https://tanstack.com/query) - Data fetching & caching
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Base UI](https://base-ui.com) - Headless UI components
- [Hugeicons](https://hugeicons.com) - Icons

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/vaishnavme/hacker-news-jobs.git
cd hacker-news-jobs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API

The app uses the Hacker News Algolia API to fetch job postings from "Who is Hiring?" threads.

### Endpoints

- `GET /api/v1/jobs` - Fetch job postings with optional filters:
  - `page` - Page number (starts from 1)
  - `year` - Filter by year
  - `month` - Filter by month (1-12)
  - `q` - Search query
  - `remote` - Filter remote jobs

## Deploy

Deploy on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vaishnavme/hacker-news-jobs)

## License

MIT
