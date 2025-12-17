# Railway Deployment Guide

## Overview

This document outlines the deployment configuration for the Sprout Payroll Vision 2026 prototype on Railway. After 8+ deployment attempts, we identified the correct configuration for deploying a Vite + React application on Railway's infrastructure.

## Final Working Configuration

### package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0 --port $PORT",
    "start": "vite preview --host 0.0.0.0 --port $PORT"
  }
}
```

**Key Points:**
- Use `vite preview` for production serving
- Bind to `0.0.0.0` (all network interfaces), not `localhost`
- Use `$PORT` environment variable that Railway provides
- Railway automatically runs `npm run build` during build phase
- The `start` script runs after build completes

### vite.config.ts

```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      preview: {
        port: parseInt(process.env.PORT || '3000'),
        host: '0.0.0.0',
        strictPort: true,
        allowedHosts: [
          'sprout-prototype-payroll-agent-roadmap-2026-production.up.railway.app',
          '.railway.app'
        ],
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
      }
    };
});
```

**Critical Configuration:**
- `preview.host: '0.0.0.0'` - Allows Railway to route traffic to the container
- `preview.port: parseInt(process.env.PORT || '3000')` - Uses Railway's dynamic port
- `preview.strictPort: true` - Ensures exact port binding
- `preview.allowedHosts` - **CRITICAL:** Vite blocks unknown hosts by default

## Deployment Journey: What We Learned

### Attempt 1-2: Localhost Binding Issue
**Problem:** Server bound to `localhost` instead of `0.0.0.0`

```json
"start": "vite preview --port $PORT"
```

**Error:** Application failed to respond (Railway couldn't reach localhost)

**Lesson:** Railway requires binding to `0.0.0.0` (all network interfaces)

### Attempt 3-4: Serve Package with tcp:// Prefix
**Problem:** Tried using `serve` package with tcp:// protocol

```json
"start": "npm run build && serve -s dist -l tcp://0.0.0.0:$PORT"
```

**Error:** `serve` package doesn't accept `tcp://` prefix in `-l` flag

**Lesson:** Different tools have different flag syntax requirements

### Attempt 5: Serve Without Protocol
**Problem:** Removed protocol but still used short flag

```json
"start": "serve -s dist -l $PORT"
```

**Error:** Still bound to localhost only

**Lesson:** The `-l` flag only accepts port number, not host:port

### Attempt 6-7: Serve with --listen Flag
**Problem:** Used `--listen` with host:port but no protocol

```json
"start": "serve -s dist --listen 0.0.0.0:$PORT"
```

**Error:** `Unknown --listen endpoint scheme (protocol): 0.0.0.0:`

**Lesson:** `serve` package's `--listen` flag expects a full URL with protocol (http:// or tcp://)

### Attempt 8: Vite Preview Without allowedHosts
**Problem:** Server ran but blocked Railway's requests

```json
"start": "vite preview --host 0.0.0.0 --port $PORT"
```

**Error:** `Blocked request. This host is not allowed.`

**Lesson:** Vite has security feature that blocks unknown hostnames

### Attempt 9: SUCCESS
**Solution:** Added Railway domain to Vite's allowedHosts

```typescript
preview: {
  allowedHosts: [
    'sprout-prototype-payroll-agent-roadmap-2026-production.up.railway.app',
    '.railway.app'
  ]
}
```

**Result:** Deployment successful!

## Key Takeaways

### 1. Network Binding
- Railway containers need servers bound to `0.0.0.0`
- `localhost` or `127.0.0.1` won't work
- Railway's proxy needs to reach all network interfaces

### 2. Port Configuration
- Use Railway's `$PORT` environment variable
- Railway assigns dynamic ports (typically 8080)
- Don't hardcode port numbers

### 3. Vite Security
- Vite preview server blocks unknown hosts by default
- Must explicitly allow Railway domains in `allowedHosts`
- Use wildcard `.railway.app` for all Railway deployments

### 4. Build vs Start
- Railway runs `npm run build` automatically during build phase
- Don't include `npm run build` in start script (wastes time, delays health checks)
- Start script should only serve pre-built files

### 5. Tool Choice
- `vite preview` works better than `serve` for Vite projects
- Simple `--host` and `--port` flags
- Native integration with Vite configuration

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway auto-detects Node.js and runs build

### 3. Configure Environment Variables

In Railway dashboard:
- Add any API keys (e.g., `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`)
- Railway automatically provides `PORT` variable

### 4. Update Configuration Files

Ensure your `package.json` has:
```json
{
  "scripts": {
    "start": "vite preview --host 0.0.0.0 --port $PORT"
  }
}
```

Ensure your `vite.config.ts` has:
```typescript
preview: {
  port: parseInt(process.env.PORT || '3000'),
  host: '0.0.0.0',
  strictPort: true,
  allowedHosts: [
    '<your-railway-domain>.railway.app',
    '.railway.app'
  ]
}
```

### 5. Deploy

```bash
git add .
git commit -m "Configure Railway deployment"
git push
```

Railway automatically detects the push and redeploys.

### 6. Verify Deployment

Check Railway logs for:
```
> vite preview --host 0.0.0.0 --port $PORT
→ Local:   http://localhost:8080/
→ Network: http://10.x.x.x:8080/
```

Visit your Railway URL to confirm it's working.

## Common Issues & Solutions

### Issue: "Application failed to respond"
**Cause:** Server not binding to 0.0.0.0
**Solution:** Add `--host 0.0.0.0` to start command

### Issue: "Blocked request. This host is not allowed"
**Cause:** Vite blocking Railway's domain
**Solution:** Add Railway domain to `preview.allowedHosts` in vite.config.ts

### Issue: Container stops after starting
**Cause:** Command exits instead of staying running
**Solution:** Use `vite preview` (stays running) instead of `serve` (may exit)

### Issue: Port already in use
**Cause:** Hardcoded port conflicts with Railway's assignment
**Solution:** Use `$PORT` environment variable

### Issue: Build succeeds but start fails
**Cause:** Missing dependencies or incorrect start script
**Solution:** Ensure all production dependencies are in `dependencies`, not `devDependencies`

## Environment Variables

This project requires:
- `PORT` - Automatically provided by Railway
- `GEMINI_API_KEY` - For Google Gemini API (optional, if using)
- `ANTHROPIC_API_KEY` - For Claude API (add in Railway dashboard)

## Railway-Specific Notes

1. **Build Phase:** Railway automatically runs `npm install` and `npm run build`
2. **Start Phase:** Railway runs `npm start` after successful build
3. **Health Checks:** Railway expects server to respond within timeout period
4. **Logs:** Available in Railway dashboard under "Deployments > Deploy Logs"
5. **Custom Domains:** Can add custom domains in Railway settings

## Testing Locally

To test the production build locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` (or whatever port is set)

## Resources

- [Railway Documentation](https://docs.railway.app/)
- [Vite Preview Server Docs](https://vitejs.dev/guide/cli.html#vite-preview)
- [Vite Config Reference](https://vitejs.dev/config/)

## Project Information

- **Application:** Sprout Payroll Vision 2026 Prototype
- **Tech Stack:** React 19, Vite 6, TypeScript, Claude API
- **Deployment Platform:** Railway
- **Repository:** [GitHub Link]

---

**Last Updated:** November 21, 2025
**Status:** Successfully Deployed ✅
