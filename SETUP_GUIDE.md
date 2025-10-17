# 🚀 AetherAi - Complete Setup Guide

## 📋 Step-by-Step Project Initialization

### Phase 1: Environment Preparation

#### 1.1 System Requirements
```bash
# Check Node.js version (required: 18+)
node --version

# Check npm version
npm --version

# Install Git (if not installed)
git --version
```

#### 1.2 Install Global Dependencies
```bash
# Install Supabase CLI (optional but recommended)
npm install -g supabase

# Install TypeScript globally (optional)
npm install -g typescript

# Install Vite CLI (optional)
npm install -g vite
```

### Phase 2: Project Setup

#### 2.1 Clone and Initialize
```bash
# Clone the repository
git clone https://github.com/AravinZz69/AetherAii.git

# Navigate to project directory
cd AetherAii

# Check project structure
ls -la
```

#### 2.2 Install Dependencies
```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

#### 2.3 Environment Configuration
```bash
# Create environment file
cp .env.example .env.local

# Edit environment variables
# Add your Supabase credentials:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Phase 3: Database Setup (Supabase)

#### 3.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy project URL and anon key
4. Update `.env.local` file

#### 3.2 Database Schema Setup
```sql
-- Create traffic analysis table
CREATE TABLE city_traffic (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    city_name VARCHAR NOT NULL,
    traffic_data JSONB,
    metrics JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create route analysis table
CREATE TABLE route_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    from_location VARCHAR NOT NULL,
    to_location VARCHAR NOT NULL,
    analysis_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE city_traffic ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read city traffic" ON city_traffic FOR SELECT USING (true);
CREATE POLICY "Users can manage their routes" ON route_analysis FOR ALL USING (auth.uid() = user_id);
```

#### 3.3 Setup Edge Functions
```bash
# Initialize Supabase in project
supabase init

# Create traffic analysis function
supabase functions new analyze-city-traffic

# Deploy functions
supabase functions deploy analyze-city-traffic
```

### Phase 4: Development Workflow

#### 4.1 Start Development Server
```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:8080
```

#### 4.2 Development Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Phase 5: Feature Configuration

#### 5.1 Authentication Setup
```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Authentication is already configured in the project
// Users can sign up/login through the Auth page
```

#### 5.2 Theme Configuration
```typescript
// Themes are pre-configured with:
// - Dark mode (default)
// - Light mode
// - System preference detection
// - Cyberpunk color scheme
```

#### 5.3 API Integration
```typescript
// Traffic analysis API is integrated via Supabase Edge Functions
// Located in: supabase/functions/analyze-city-traffic/
```

### Phase 6: Testing & Quality Assurance

#### 6.1 Testing Setup
```bash
# Install testing dependencies (if needed)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests (when implemented)
npm run test
```

#### 6.2 Code Quality
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type check
npx tsc --noEmit
```

### Phase 7: Deployment

#### 7.1 Build for Production
```bash
# Create production build
npm run build

# Check build output
ls -la dist/

# Test production build locally
npm run preview
```

#### 7.2 Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_PUBLISHABLE_KEY
```

#### 7.3 Alternative Deployment Options

**Netlify:**
```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: Add in Netlify dashboard
```

**GitHub Pages:**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Phase 8: Monitoring & Maintenance

#### 8.1 Performance Monitoring
- Monitor bundle size with `npm run build`
- Check Lighthouse scores
- Monitor Core Web Vitals

#### 8.2 Database Monitoring
- Monitor Supabase dashboard
- Check API usage
- Review error logs

#### 8.3 Updates & Maintenance
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update major versions carefully
npm install package@latest
```

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

#### Issue 2: TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

#### Issue 3: Supabase Connection Issues
```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_PUBLISHABLE_KEY

# Test Supabase connection
supabase status
```

### Performance Optimization

#### Bundle Size Optimization
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer

# Implement code splitting
# Use dynamic imports for large components
const LazyComponent = lazy(() => import('./Component'));
```

#### Development Performance
```bash
# Use SWC for faster builds (already configured)
# Enable HMR for instant updates
# Use Vite's fast refresh
```

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### UI Components
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Performance Optimization](https://web.dev/fast/)

## 🎯 Next Steps

1. **Customize the application** to your specific needs
2. **Add new features** using the established patterns
3. **Implement testing** for critical components
4. **Set up CI/CD** for automated deployments
5. **Monitor performance** and optimize as needed

---

*This guide provides a complete walkthrough for setting up and running the AetherAi project. Follow the steps sequentially for the best experience.*