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

This project uses **GitHub Actions** for automatic deployment to GitHub Pages.

### Automatic Deployment
Every push to the `main` branch automatically triggers a build and deployment workflow. No manual steps required!

### First-Time Setup
To enable GitHub Pages for your repository:
1. Go to your repository on GitHub: `https://github.com/drakeaharper/game-guides`
2. Navigate to **Settings** > **Pages**
3. Under "Source", select **GitHub Actions**
4. Push this code to the `main` branch - the workflow will run automatically

The site will be live at: `https://drakeaharper.github.io/game-guides/`

### Manual Deployment (if needed)
You can also trigger deployment manually:
1. Go to the **Actions** tab in your GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

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
