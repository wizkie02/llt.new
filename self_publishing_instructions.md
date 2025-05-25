# Self-Publishing Instructions for Leo Loves Travel Website

This document provides detailed instructions for self-publishing the Leo Loves Travel website and explains how the admin functionality works when self-published.

## Admin Functionality in Self-Published Environment

The admin functionality in this website uses browser's local storage to store tour data. Here's what you need to know:

1. **Local Storage Persistence**:
   - Tour data is stored in the browser's local storage
   - Data persists between sessions on the same device and browser
   - Each user/device will have their own separate data store
   - Data will not sync between different devices or browsers

2. **Admin Features Available**:
   - Adding new tours with the template form
   - Editing existing tours
   - Deleting tours
   - Marking tours as featured
   - Viewing tour statistics in the dashboard

3. **Limitations**:
   - No user authentication (anyone who accesses the admin URL can make changes)
   - No data synchronization between devices
   - Data is limited to the browser's local storage capacity
   - If a user clears their browser data, the tour information will be reset to default

## Self-Publishing Instructions

### Option 1: Deploy to Netlify (Recommended)

1. **Create a Netlify Account**:
   - Sign up at [netlify.com](https://www.netlify.com/)

2. **Prepare Your Project**:
   - Extract the provided ZIP file to a local folder
   - Make sure you have Node.js installed on your computer

3. **Build the Project**:
   - Open a terminal/command prompt
   - Navigate to the project folder
   - Run `npm install` or `npm install --legacy-peer-deps` to install dependencies
   - Run `npm run build` or `npm run build` to create the production build

4. **Deploy to Netlify**:
   - In the Netlify dashboard, click "Add new site" > "Import an existing project"
   - Drag and drop the `dist` folder from your project
   - Configure your site settings (domain name, etc.)
   - Click "Deploy site"

5. **Configure Redirects for React Router**:
   - Create a file named `_redirects` in the `public` folder with this content:
     ```
     /* /index.html 200
     ```
   - This ensures that all routes are handled by React Router

### Option 2: Deploy to GitHub Pages

1. **Create a GitHub Repository**:
   - Sign up or log in to [github.com](https://github.com/)
   - Create a new repository

2. **Prepare Your Project**:
   - Extract the provided ZIP file to a local folder
   - Initialize a Git repository: `git init`
   - Add the GitHub repository as remote: `git remote add origin YOUR_REPO_URL`

3. **Configure for GitHub Pages**:
   - In the project's `vite.config.ts` file, add a base path:
     ```typescript
     export default defineConfig({
       base: '/your-repo-name/',
       // other config...
     });
     ```

4. **Build and Deploy**:
   - Install dependencies: `npm install` or `npm install --legacy-peer-deps`
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Add this script to package.json: `"deploy": "gh-pages -d dist"`
   - Build the project: `npm run build` or `npm run build`
   - Deploy: `npm run deploy`

5. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "GitHub Pages" section
   - Select the `gh-pages` branch as the source

### Option 3: Deploy to Any Static Hosting

1. **Build the Project**:
   - Extract the provided ZIP file to a local folder
   - Install dependencies: `npm install` or `npm install --legacy-peer-deps`
   - Build the project: `npm run build` or `npm run build`

2. **Upload to Hosting**:
   - Upload the contents of the `dist` folder to your web hosting
   - Configure your server to redirect all requests to index.html for client-side routing

## Enhancing the Admin Functionality

If you want to enhance the admin functionality beyond local storage:

1. **Add a Backend API**:
   - Create a simple API using Node.js/Express, PHP, or any backend technology
   - Replace the ToursContext.tsx file with one that uses API calls instead of localStorage
   - Add proper authentication to protect admin routes

2. **Use a Headless CMS**:
   - Services like Contentful, Sanity, or Strapi can provide a managed backend
   - They offer authentication, content management, and APIs
   - You would need to modify the ToursContext.tsx to fetch data from the CMS API

3. **Use Firebase**:
   - Firebase offers authentication, real-time database, and hosting
   - It's relatively easy to integrate with React applications
   - Would require modifying the ToursContext.tsx to use Firebase services

## Troubleshooting

1. **Routing Issues**:
   - If pages don't load on refresh, make sure you've configured redirects properly
   - For Netlify, use the `_redirects` file as mentioned above
   - For Apache servers, use an .htaccess file with RewriteRules
   - For Nginx, configure the server block to serve index.html for all routes

2. **Local Storage Issues**:
   - If tours aren't saving, check if your browser has cookies/local storage enabled
   - Try using a different browser to verify if it's a browser-specific issue
   - Check browser console for any JavaScript errors

3. **Build Issues**:
   - If the build fails, make sure all dependencies are installed
   - Check for any TypeScript errors in the console output
   - Verify that Node.js is updated to a recent version

For any other issues or questions, please reach out for support.
