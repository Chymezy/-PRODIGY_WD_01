# NeuraPulse Landing Page

> This project was developed during my Full Stack Web Development internship at Prodigy Info Tech. It represents Task #1 of my internship projects, demonstrating proficiency in modern web technologies and best practices.

This project is a responsive landing page for NeuraPulse, an AI-powered analytics company. It's built with React, Vite, TypeScript, and Tailwind CSS, featuring an interactive navigation menu, dark mode support, internationalization, and various sections showcasing the company's services and benefits.

![NeuraPulse Landing Page Screenshot](./public/screenshot.png)

## 🎯 Project Context

This project was completed as part of my internship at Prodigy Info Tech, where I:
- Implemented a modern, responsive landing page from scratch
- Utilized industry-standard tools and best practices
- Demonstrated proficiency in React ecosystem and TypeScript
- Implemented advanced features like internationalization and dark mode
- Focused on accessibility and performance optimization

## Features
![NeuraPulse Landing Page Screenshot](./public/revolutionize.png)

- Responsive design that works on desktop and mobile devices
- Interactive navigation menu with smooth scrolling
- Dark mode toggle with persistent state
- Internationalization support for English and Spanish
- Dynamic styling changes based on scroll position and hover states
- Sections for Home, About, Services, Testimonials, FAQ, and Newsletter signup
- Lazy-loaded images for improved performance
- Error boundary for graceful error handling
- Analytics integration
- Form handling with validation

## Technologies Used

- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- Framer Motion
- i18next for internationalization
- React Hook Form for form handling
- Zod for schema validation
- React GA4 for Google Analytics

## Project Structure

```
neuranova-landing-page/
├── public/
│   └── screenshot.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BackToTop.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LazyImage.tsx
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── DarkModeContext.tsx
│   ├── hooks/
│   │   └── useTranslation.ts
│   ├── locales/
│   │   ├── en.json
│   │   └── es.json
│   ├── services/
│   │   └── analytics.ts
│   ├── utils/
│   │   └── translate.ts
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/neuranova-landing-page.git
   ```

2. Navigate to the project directory:
   ```
   cd neuranova-landing-page
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Development Server

To start the development server, run:

```
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Customization

### Modifying Content

- To change the content of the landing page sections, update the `LandingPage.tsx` component and the corresponding translation files in `src/locales/`.
- To modify the navigation menu items, edit the array in the `Navbar.tsx` component.

### Styling

- Tailwind CSS classes can be adjusted in the respective components to change the styling.
- Global styles are defined in `src/index.css`.
- To customize Tailwind, edit the `tailwind.config.js` file.

### Adding New Pages or Components

1. Create a new component in the `src/components/` directory.
2. Import and use the component in `LandingPage.tsx` or create a new route if implementing routing.
3. Add any new text content to the translation files (`en.json` and `es.json`) in the `src/locales/` directory.

### Internationalization

To add a new language:

1. Create a new JSON file in `src/locales/` (e.g., `fr.json` for French).
2. Copy the structure from `en.json` and translate the values.
3. Update the language selector in the `Navbar.tsx` component to include the new language option.

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview the production build locally
- `npm run extract-translations`: Extract translation keys from the codebase

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## 🙋‍♂️ Author

**Joshua Chimenemerem Benjamin**
- Full Stack Web Development Intern at Prodigy Info Tech
- [LinkedIn](your-linkedin-url)
- [GitHub](your-github-url)

---

*This project was developed as part of the Prodigy Info Tech internship program, demonstrating practical implementation of modern web development technologies and best practices.*
