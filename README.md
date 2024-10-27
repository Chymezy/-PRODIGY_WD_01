# InsightAI Landing Page

This project is a responsive landing page for InsightAI, a fictional AI-powered analytics company. It's built with React, Vite, TypeScript, and Tailwind CSS, featuring an interactive navigation menu, dark mode support, and various sections showcasing the company's services and benefits.

![InsightAI Landing Page Screenshot](./screenshot.png)

## Features

- Responsive design that works on desktop and mobile devices
- Interactive navigation menu with smooth scrolling
- Dark mode toggle with persistent state
- Dynamic styling changes based on scroll position and hover states
- Sections for Home, About, Services, Testimonials, FAQ, and Newsletter signup
- Lazy-loaded images for improved performance
- Error boundary for graceful error handling

## Technologies Used

- React: A JavaScript library for building user interfaces
- Vite: A fast build tool and development server
- TypeScript: A typed superset of JavaScript
- Tailwind CSS: A utility-first CSS framework
- Framer Motion: For smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/insightai-landing-page.git
   ```

2. Navigate to the project directory:
   ```
   cd insightai-landing-page
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

## Project Structure

- `src/components`: Contains all React components
- `src/contexts`: Contains the DarkModeContext for managing dark mode state
- `src/assets`: Contains images and other static assets
- `src/App.tsx`: Main application component
- `src/main.tsx`: Entry point of the application

## Customization

- To modify the navigation menu items, edit the array in the `Navbar` component.
- To change the content of the landing page sections, update the `LandingPage` component.
- Tailwind CSS classes can be adjusted in the respective components to change the styling.
- To update the background image, replace the `application-bg.jpg` file in the `src/assets` directory.

## Adding a Screenshot

To add a screenshot of your application to the README:

1. Take a screenshot of your landing page
2. Save the screenshot as `screenshot.png` in the root directory of your project
3. The image will now appear in the README as shown above

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
