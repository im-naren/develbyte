# Develbyte

Personal blog and knowledge base built with [Docusaurus](https://docusaurus.io/).

## Local Development

```bash
npm install
npm start
```

This command starts a local development server and opens up a browser window at http://localhost:3000. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory.

## Deployment

This site uses GitHub Actions for automated deployment to GitHub Pages. Simply push to the `main` branch and the site will automatically build and deploy.

The workflow is defined in `.github/workflows/deploy.yml`.

## Makefile Commands

For convenience, you can use the Makefile:

```bash
make start    # Start development server
make stop     # Stop development server
make restart  # Restart server
make build    # Build production site
make serve    # Serve production build locally
make clean    # Clean build artifacts
make status   # Check server status
```
