# Game Guides

A client-side React application for creating and managing personal game guides. Built for deployment on GitHub Pages with local storage for data persistence.

## Features

- Client-side only application (no backend required)
- Local storage for saving guide data
- Organized by game
- Responsive design for desktop and mobile

## Current Games

- **The Legend of Zelda: Majora's Mask** - In `/guides/majoras-mask/`

## Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment. The built files will be served from the `dist` directory.

To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## Project Structure

```
game-guides/
├── guides/           # Game-specific guide content
│   └── majoras-mask/ # Majora's Mask guide files
├── public/           # Static assets
├── src/              # React application source
└── README.md         # This file
```

## Technology Stack

- React 18
- Vite (build tool)
- Local Storage API for data persistence
