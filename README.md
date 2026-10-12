# Barnabas Kipruto — Portfolio

A responsive personal portfolio for Barnabas Kipruto, a mechanical technician and web developer. The site brings together a profile, work experience, academic qualifications, and a live view of public GitHub repositories.

**Live site:** <https://barrysang.github.io/vue_portfolio/>

## Features

- **Responsive layout:** Adapts from mobile to desktop, with work history and qualifications arranged alongside the profile on wider screens.
- **Light and dark themes:** The site follows the visitor's system preference on their first visit. The theme toggle lets them choose a theme, and that selection is saved in browser `localStorage`.
- **Portfolio sections:** Displays profile details, work history, academic qualifications, and GitHub repositories. On smaller screens, the work and education sections can be expanded or collapsed.
- **Live GitHub repositories:** Loads public repositories from the GitHub users API, sorted by most recently updated. Filter repositories in place by their primary language; cards show descriptions, languages, star counts, and an optional GitHub link.
- **Experience and coursework:** Work-history cards expand inline to show CV-based responsibilities and skills. Relevant mechanical engineering coursework appears under the university qualification.
- **Loading and error states:** Shows placeholders while repositories load and an error message if the request fails.
- **Theme control accessibility:** Exposes the selected theme with `aria-pressed` and supports keyboard focus.

## Built with

- [Vue 3](https://vuejs.org/) with Single-File Components and `<script setup>`
- [Vite](https://vite.dev/) for local development and production builds
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## Getting started

### Prerequisites

Install Node.js and npm. The project uses Vite 7, so use a Node.js version supported by your installed Vite release.

### Install dependencies

```sh
npm install
```

### Run locally

```sh
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Build and preview

Create a production build:

```sh
npm run build
```

Preview the generated build locally:

```sh
npm run preview
```

## Deployment

The Vite base path is configured as `/vue_portfolio/` for the project's GitHub Pages URL. The deploy script builds the site and publishes the `dist` directory using `gh-pages`:

```sh
npm run deploy
```

Ensure the repository is configured to serve its GitHub Pages site from the `gh-pages` branch, and that your Git credentials allow publishing before deploying.

## Project structure

```text
.
├── index.html                 # HTML entry point and early theme initialization
├── tailwind.config.js         # Tailwind content paths, semantic colors, and dark mode
├── src/
│   ├── main.js                # Creates and mounts the Vue application
│   ├── App.vue                # Page layout and theme toggle
│   ├── style.css              # Global styles and light/dark color variables
│   ├── data/
│   │   └── portfolio.js       # Work, education, and GitHub API data access
│   └── components/
│       ├── HeroSection.vue    # Introduction and project/contact links
│       ├── ProfileHeader.vue  # Profile image and personal details
│       ├── WorkHistory.vue    # Work experience
│       ├── AcademicHistory.vue # Education and qualifications
│       ├── SectionToggle.vue  # Responsive collapsible section heading
│       ├── GithubRepos.vue    # Repository loading, errors, and cards
│       └── AppFooter.vue      # Footer and social links
└── public/
    └── profile/               # Profile image assets
```

## Updating portfolio content

- Edit the work experience and academic qualification lists in `src/data/portfolio.js`.
- Update the name, location, profile image, and social links in `src/components/ProfileHeader.vue` and `src/components/AppFooter.vue`.
- Update the introduction and profile links in `src/components/HeroSection.vue`.
- The repository list is fetched from `https://api.github.com/users/BarrySang/repos`; update the username in `src/data/portfolio.js` if the GitHub account changes. The request uses the public API without authentication, so GitHub's unauthenticated API rate limits apply.
- Update the semantic light and dark palettes in `src/style.css`. Tailwind's semantic color names are mapped to those variables in `tailwind.config.js`.

## License

No license is currently specified for this repository. Contact the owner before reusing its content or assets.
