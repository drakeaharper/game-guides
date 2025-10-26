# Game Guides - Claude Context

## Project Overview

This is a client-side React application for creating and managing personal game guides. The application is designed to be deployed on GitHub Pages and uses browser local storage for data persistence.

## Key Design Decisions

### Client-Side Only Architecture
- No backend server or database
- All data stored in browser's local storage
- Enables free hosting on GitHub Pages
- User data stays on their device

### Technology Choices
- **React 18**: Modern UI framework with hooks
- **Vite**: Fast development and build tool
- **Local Storage API**: Simple, persistent data storage in the browser
- **GitHub Pages**: Free static site hosting

## Project Structure

```
game-guides/
├── guides/              # Game-specific guide content and assets
│   └── majoras-mask/   # The Legend of Zelda: Majora's Mask guides
├── src/                # React application source code
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components (Home, GameGuide, etc.)
│   ├── utils/         # Utility functions (localStorage helpers, etc.)
│   └── App.jsx        # Main application component
├── public/            # Static assets (images, icons, etc.)
└── dist/              # Production build output (generated)
```

## Application Features

### Planned Features
1. **Home/Landing Page**: Lists all available game guides
2. **Game Guide Pages**: Detailed guides for each game
3. **Local Storage**: Save user progress, notes, and custom data
4. **Responsive Design**: Works on desktop and mobile devices

### Games
- **The Legend of Zelda: Majora's Mask**: First game guide being developed

## Development Guidelines

### Adding a New Game Guide
1. Create a new directory in `/guides/{game-slug}/`
2. Add game-specific content (markdown files, images, etc.)
3. Create a React component for the game guide
4. Add route in the main App component
5. Update the home page to link to the new guide

### Local Storage Usage
- Store user-specific data (progress, notes, checklists)
- Use consistent key naming: `game-guides:{game}:{dataType}`
- Implement proper error handling for storage limits
- Provide export/import functionality for user data

### GitHub Pages Deployment
- Build with: `npm run build`
- Deploy the `dist/` directory to GitHub Pages
- Ensure base URL is configured correctly in `vite.config.js`
- Test the production build with `npm run preview`

## Code Conventions

- Use functional React components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent file structure

## Future Enhancements

Potential features to add:
- Dark mode toggle
- Search functionality across guides
- Export/import data (JSON format)
- Print-friendly guide views
- Checklist/progress tracking per game
- Multiple game guides

## Notes

- This project does not require a database or API
- All game guide content is static and version-controlled
- Users can clone and customize their own version
- Data privacy: everything stays on the user's device
