# Leo Loves Travel Website

A fully functional multipage website for Leo Loves Travel, built with React and following the LLT brand guidelines.

## Features

- 9 fully functional pages: Home, Package Tours, Travel Services, Team Building, Events, Romantic Travel, Medical Travel, About Us, and Contact
- Admin interface for managing tours
- Dropdown menu in header for services
- Full-width responsive layout
- Individual tour detail pages
- Light/dark mode toggle
- Live chat widget

## Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

> **Important**: This project requires the `--legacy-peer-deps` flag when installing with npm due to some dependency conflicts.

## Admin Functionality

The admin interface allows you to:
- Add new tours with all details (name, description, price, duration, location, etc.)
- Edit existing tours
- Remove tours
- Mark tours as featured

Access the admin interface at `/admin` and the tour management at `/admin/tour-management`.

## Self-Publishing Instructions

See the included `self_publishing_instructions.md` file for detailed instructions on how to deploy this website.

## Notes on npm Compatibility

This project was originally developed with pnpm but has been converted to work with npm. When installing dependencies with npm, you must use the `--legacy-peer-deps` flag to resolve dependency conflicts:

```bash
npm install --legacy-peer-deps
```

This is necessary because of a conflict between date-fns v4 and react-day-picker which expects date-fns v2 or v3.
