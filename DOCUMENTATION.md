# 🚦 AetherAi - Next-Gen AI Traffic & Route Intelligence Platform

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Environment Configuration](#environment-configuration)
7. [Database Schema](#database-schema)
8. [API Documentation](#api-documentation)
9. [Component Structure](#component-structure)
10. [Deployment](#deployment)
11. [Development Guidelines](#development-guidelines)
12. [Contributing](#contributing)

---

## 🎯 Project Overview

**AetherAi** is a cutting-edge AI-powered traffic analysis and route intelligence platform that provides real-time traffic insights, predictive analytics, and smart route optimization. The application leverages modern web technologies and AI capabilities to deliver a futuristic, cyberpunk-inspired user experience.

### 🌟 Key Objectives
- **Real-time Traffic Analysis**: Monitor and analyze traffic patterns across cities
- **AI-Powered Predictions**: Provide intelligent route suggestions and traffic forecasts
- **Modern User Experience**: Deliver a responsive, glassmorphic UI with cyberpunk aesthetics
- **Data-Driven Insights**: Present comprehensive metrics and analytics dashboards

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1** - Modern React with Hooks and Context API
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and development server

### **UI/UX Libraries**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful SVG icons
- **Next Themes** - Dark/Light mode support

### **State Management & Data Fetching**
- **TanStack Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form state management
- **Zod 3.25.76** - Schema validation

### **Backend & Database**
- **Supabase** - Backend-as-a-Service (BaaS)
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Edge functions

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting

### **UI Enhancement Libraries**
- **Recharts 2.15.4** - Data visualization charts
- **Embla Carousel** - Touch-friendly carousels
- **React Router DOM** - Client-side routing
- **Sonner** - Toast notifications
- **Class Variance Authority** - Component variants

---

## 🏗️ Architecture

### **Frontend Architecture**
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── CityMap.tsx     # Interactive city map
│   ├── TrafficDisplay.tsx
│   ├── WeatherWidget.tsx
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Dashboard
│   ├── TrafficAnalysis.tsx
│   ├── Auth.tsx
│   └── ...
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── integrations/       # External service integrations
│   └── supabase/      # Supabase client and types
├── lib/               # Utility functions
└── App.tsx            # Main application component
```

### **Backend Architecture (Supabase)**
```
supabase/
├── functions/          # Edge functions
│   └── analyze-city-traffic/
├── migrations/         # Database migrations
└── config.toml        # Supabase configuration
```

---

## ✨ Features

### **🎨 User Interface**
- **Glassmorphic Design**: Modern glass-effect UI components
- **Cyberpunk Theme**: Purple/pink gradient color scheme with neon glows
- **Dark/Light Mode**: Automatic and manual theme switching
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Animations**: Smooth transitions and floating effects

### **📊 Dashboard**
- **Metrics Grid**: Real-time city statistics and KPIs
- **Interactive Map**: Visual representation of traffic data
- **Weather Integration**: Current weather conditions
- **Traffic Display**: Live traffic status and congestion levels
- **Prediction Panel**: AI-powered traffic forecasts

### **🚗 Traffic Analysis**
- **City Search**: Intelligent city selection with autocomplete
- **Route Planning**: Multi-point route optimization
- **Traffic-Free Routes**: Alternative route suggestions
- **AI Insights**: Machine learning-powered recommendations
- **Best Times**: Optimal travel time predictions

### **👤 User Management**
- **Authentication**: Secure user login/registration via Supabase Auth
- **Profile Management**: User preferences and settings
- **Session Persistence**: Automatic login state management

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Step 1: Clone Repository**
```bash
git clone https://github.com/AravinZz69/AetherAii.git
cd AetherAii
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Environment Setup**
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### **Step 4: Start Development Server**
```bash
npm run dev
```

### **Step 5: Build for Production**
```bash
npm run build
```

### **Step 6: Preview Production Build**
```bash
npm run preview
```

---

## 🔧 Environment Configuration

### **Required Environment Variables**
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anonymous key | Yes |

### **Supabase Setup**
1. Create a new Supabase project
2. Configure authentication providers
3. Set up Row Level Security (RLS) policies
4. Deploy database migrations
5. Configure Edge functions

---

## 🗄️ Database Schema

### **Core Tables**
```sql
-- Users table (managed by Supabase Auth)
auth.users (
  id UUID PRIMARY KEY,
  email VARCHAR,
  created_at TIMESTAMP
)

-- City traffic data
public.city_traffic (
  id UUID PRIMARY KEY,
  city_name VARCHAR NOT NULL,
  traffic_data JSONB,
  metrics JSONB,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Route analysis
public.route_analysis (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  from_location VARCHAR NOT NULL,
  to_location VARCHAR NOT NULL,
  analysis_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
)
```

---

## 🔌 API Documentation

### **Supabase Edge Functions**

#### **Analyze City Traffic**
```typescript
// Function: analyze-city-traffic
// Input: { city: string }
// Output: AnalysisData

POST /functions/v1/analyze-city-traffic
Content-Type: application/json

{
  "city": "New York"
}
```

### **Response Format**
```typescript
interface AnalysisData {
  city: string;
  analysis: string;
  cityMetrics: CityMetrics;
  trafficFreeRoutes: RouteData[];
  trafficRoutes: RouteData[];
  aiInsights: string[];
  bestTimes: string;
  prediction: string;
}
```

---

## 🧩 Component Structure

### **Core Components**

#### **Layout Components**
- `App.tsx` - Main application wrapper
- `ThemeProvider.tsx` - Theme context provider
- `AuthProvider.tsx` - Authentication context

#### **Page Components**
- `Index.tsx` - Main dashboard
- `TrafficAnalysis.tsx` - Traffic analysis page
- `Auth.tsx` - Authentication page
- `Profile.tsx` - User profile page

#### **Feature Components**
- `CityMap.tsx` - Interactive map visualization
- `TrafficDisplay.tsx` - Real-time traffic information
- `WeatherWidget.tsx` - Weather data display
- `PredictionPanel.tsx` - AI predictions
- `MetricsGrid.tsx` - Key performance indicators

#### **UI Components**
Located in `src/components/ui/` - shadcn/ui components:
- Forms (Button, Input, Select, etc.)
- Navigation (Tabs, Dialog, Popover, etc.)
- Data Display (Card, Badge, Table, etc.)
- Feedback (Toast, Alert, Progress, etc.)

---

## 🎨 Styling System

### **Design Tokens**
```css
:root {
  --primary: 262 83% 58%;        /* Purple */
  --accent: 292 91% 73%;         /* Pink */
  --secondary: 217 91% 60%;      /* Blue */
  --background: 0 0% 100%;       /* White (light) */
  --foreground: 240 10% 3.9%;   /* Dark text */
}

.dark {
  --background: 240 10% 3.9%;   /* Dark background */
  --foreground: 0 0% 98%;       /* Light text */
}
```

### **Custom CSS Classes**
- `.glass-card` - Glassmorphic card effect
- `.gradient-primary` - Purple to pink gradient
- `.text-glow` - Neon text glow effect
- `.floating` - Floating animation
- `.quantum-flow` - Animated mesh background

---

## 📦 Deployment

### **Build Process**
```bash
# Development build
npm run build:dev

# Production build
npm run build

# Lint code
npm run lint
```

### **Deployment Platforms**
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Custom hosting**

### **Supabase Deployment**
```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy

# Push database changes
supabase db push
```

---

## 👨‍💻 Development Guidelines

### **Code Style**
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Use semantic commit messages

### **Component Guidelines**
- Keep components small and focused
- Use custom hooks for complex logic
- Implement proper prop types
- Follow accessibility standards

### **Performance Optimization**
- Lazy load components when appropriate
- Optimize bundle size
- Implement proper caching strategies
- Use React.memo for expensive components

---

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make changes with proper tests
4. Submit a pull request
5. Code review and merge

### **Commit Message Format**
```
type(scope): description

feat(traffic): add real-time traffic analysis
fix(ui): resolve mobile responsive issues
docs(readme): update installation instructions
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support and questions:
- GitHub Issues: [AetherAii Issues](https://github.com/AravinZz69/AetherAii/issues)
- Email: support@aetherai.com

---

## 🔄 Version History

- **v1.0.0** - Initial release with core traffic analysis features
- **v0.9.0** - Beta release with UI/UX improvements
- **v0.8.0** - Alpha release with basic functionality

---

*Built with ❤️ by the AetherAi Team*