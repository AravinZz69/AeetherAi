# AetherAi Traffic Analysis Dashboard - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Setup & Installation](#setup--installation)
6. [Database Schema](#database-schema)
7. [Authentication System](#authentication-system)
8. [Admin System](#admin-system)
9. [Edge Functions](#edge-functions)
10. [AI Integration](#ai-integration)
11. [Components Structure](#components-structure)
12. [Styling System](#styling-system)
13. [API Reference](#api-reference)
14. [Deployment](#deployment)

---

## Project Overview

**AetherAi** is an advanced traffic analysis dashboard that serves as the single source of truth for consortium members, delivering real-time insights and predictive analytics to optimize urban mobility and drive informed decision-making.

### Key Capabilities
- Real-time traffic monitoring and analysis
- AI-powered predictions and insights
- Location-based data analysis
- Weather integration
- Accident-prone area identification
- Role-based admin access control
- User activity tracking

---

## Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library
- **Recharts** - Charting library
- **React Router DOM 6.30.1** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **next-themes** - Theme management (dark/light mode)

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication & Authorization
  - Row Level Security (RLS)
  - Edge Functions (Deno runtime)
  - Real-time subscriptions

### AI Integration
- **Lovable AI Gateway** - AI model access
  - Google Gemini 2.5 Flash (default)
  - OpenAI GPT-5 models
  - Structured output generation

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **PostCSS** - CSS processing

---

## Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │    Hooks     │      │
│  │              │  │              │  │              │      │
│  │ - Index      │  │ - CityMap    │  │ - useAdmin   │      │
│  │ - Auth       │  │ - Weather    │  │ - useToast   │      │
│  │ - Profile    │  │ - Traffic    │  │ - useMobile  │      │
│  │ - Admin      │  │ - Metrics    │  │ - useLogger  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Supabase Client
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │     Auth     │  │    Edge      │      │
│  │   Database   │  │   System     │  │  Functions   │      │
│  │              │  │              │  │              │      │
│  │ - profiles   │  │ - Users      │  │ - analyze-   │      │
│  │ - user_roles │  │ - Sessions   │  │   city       │      │
│  │ - activity   │  │ - JWT        │  │ - analyze-   │      │
│  │ - search     │  │              │  │   location   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Lovable AI Gateway                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AI Models (Gemini 2.5 Flash, GPT-5, etc.)          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Action** → Frontend component triggers action
2. **Client Request** → Supabase client sends authenticated request
3. **Edge Function** → Processes request, calls AI if needed
4. **AI Processing** → Lovable AI Gateway generates insights
5. **Database** → Data stored/retrieved with RLS protection
6. **Response** → Data flows back to frontend
7. **UI Update** → React components re-render with new data

---

## Features

### 1. Real-time Traffic Monitoring
**Location**: `src/components/TrafficDisplay.tsx`

Displays live traffic status for multiple areas:
- Traffic level (0-100%)
- Status indicators (clear/moderate/busy/congested)
- Trend indicators (up/down)
- Average speed and active vehicles
- Color-coded progress bars

### 2. Location-based Analysis
**Location**: `src/pages/Index.tsx`, `src/components/CityMap.tsx`

Users can fetch their current location to get:
- Real-time weather data
- Population metrics
- Traffic patterns
- Energy usage statistics
- Water supply information
- Network coverage
- Accident-prone areas

**Implementation**:
```typescript
const handleLocationFetch = async (latitude: number, longitude: number) => {
  const { data } = await supabase.functions.invoke('analyze-location', {
    body: { latitude, longitude }
  });
  setLocationData(data.data);
};
```

### 3. AI-Powered Predictions
**Location**: `src/components/PredictionPanel.tsx`

- Traffic forecast charts (24-hour view)
- Peak traffic predictions
- Energy consumption forecasts
- Air quality insights
- AI-generated recommendations

### 4. Weather Integration
**Location**: `src/components/WeatherWidget.tsx`

- Current temperature and conditions
- Humidity, wind speed, pressure
- 3-day forecast
- Dynamic weather icons

### 5. City Metrics Dashboard
**Location**: `src/components/MetricsGrid.tsx`

Displays key urban metrics:
- Population (with growth rate)
- Energy usage (with change percentage)
- Water supply (with variation)
- Network coverage (with status)

### 6. Accident-Prone Areas
**Location**: `src/components/AccidentProneAreas.tsx`

Identifies dangerous locations with:
- Risk level (High/Medium/Low)
- Historical accident count
- Detailed descriptions
- Visual risk indicators

### 7. Authentication System
**Location**: `src/pages/Auth.tsx`, `src/contexts/AuthContext.tsx`

Full authentication flow:
- Email/password signup
- Email/password login
- Session management
- Auto-confirm email for development
- Protected routes
- Logout functionality

### 8. Admin Dashboard
**Location**: `src/pages/AdminDashboard.tsx`, `src/pages/AdminLogin.tsx`

Secure admin portal with:
- User management
- Activity logs viewing
- Search history tracking
- Login history monitoring
- User statistics
- Peak hour analytics

### 9. User Activity Logging
**Location**: `src/hooks/useActivityLogger.ts`

Automatically tracks:
- User actions (page views, searches)
- Search queries (city and route)
- Timestamps
- User attribution

### 10. Theme Support
**Location**: `src/components/ThemeProvider.tsx`, `src/components/ThemeToggle.tsx`

- Dark/Light mode toggle
- System preference detection
- Persistent theme selection
- Smooth transitions

---

## Setup & Installation

### Prerequisites
- Node.js 18+ or Bun
- Git
- Supabase account (handled by Lovable Cloud)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citysight-dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Environment variables are auto-configured by Lovable Cloud:
   - `VITE_SUPABASE_URL` - Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Public API key
   - `VITE_SUPABASE_PROJECT_ID` - Project identifier

4. **Database Setup**
   
   Migrations are automatically applied. Manual migration (if needed):
   ```bash
   # Migrations are in supabase/migrations/
   # They run automatically on deployment
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Access the Application**
   - Local: `http://localhost:5173`
   - Production: `https://your-domain.lovable.app`

---

## Database Schema

### Tables Overview

#### 1. `profiles`
Stores user profile information.

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**RLS Policies**:
- Users can view their own profile
- Users can insert their own profile
- Users can update their own profile

#### 2. `user_roles`
Manages user roles for access control.

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);
```

**RLS Policies**:
- Users can view their own roles
- Admins can view all roles
- Admins can insert/update/delete roles

#### 3. `activity_logs`
Tracks user activities throughout the application.

```sql
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**RLS Policies**:
- Users can insert their own activity
- Users can view their own activity
- Admins can view all activity

#### 4. `search_history`
Records all search queries made by users.

```sql
CREATE TABLE public.search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  search_type TEXT NOT NULL, -- 'city' or 'route'
  search_query TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

**RLS Policies**:
- Users can insert their searches
- Users can view their own history
- Admins can view all history

#### 5. `login_history`
Tracks user login events.

```sql
CREATE TABLE public.login_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  login_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);
```

**RLS Policies**:
- Users can view their own login history
- Admins can view all login history

### Database Functions

#### `has_role()`
Security definer function to check user roles without RLS recursion.

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

#### `handle_new_user_role()`
Trigger function to assign default roles on user signup.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Assign 'user' role to all new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Assign 'admin' role to specific emails
  IF LOWER(NEW.email) IN ('aravindz9790@gmail.com', 'deekshithabonthu15@gmail.com', 'anuradhazzz@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;
```

#### `update_updated_at_column()`
Automatically updates the `updated_at` timestamp.

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

### Triggers

```sql
-- Auto-update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-assign roles on user signup
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();
```

---

## Authentication System

### Implementation Overview

The authentication system uses Supabase Auth with custom role management.

### Auth Context
**Location**: `src/contexts/AuthContext.tsx`

Provides authentication state and methods globally:

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
}
```

### Key Features

1. **Session Management**
   - Persistent sessions using localStorage
   - Auto token refresh
   - Real-time auth state changes

2. **Sign Up Flow**
   ```typescript
   const signUp = async (email: string, password: string, userData: any) => {
     const { error } = await supabase.auth.signUp({
       email,
       password,
       options: {
         emailRedirectTo: `${window.location.origin}/`,
         data: userData
       }
     });
     return { error };
   };
   ```

3. **Sign In Flow**
   ```typescript
   const signIn = async (email: string, password: string) => {
     const { error } = await supabase.auth.signInWithPassword({
       email,
       password
     });
     return { error };
   };
   ```

4. **Auth State Listener**
   ```typescript
   useEffect(() => {
     const { data: { subscription } } = supabase.auth.onAuthStateChange(
       (event, session) => {
         setSession(session);
         setUser(session?.user ?? null);
       }
     );
     return () => subscription.unsubscribe();
   }, []);
   ```

### Protected Routes

Routes are protected using the AuthContext:

```typescript
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <PreLoader />;
  if (!user) return <Navigate to="/auth" />;
  
  return children;
};
```

### Email Configuration

**Important**: Auto-confirm email is enabled for development.

To configure in production:
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Confirm email" for production security
3. Configure email templates
4. Set up custom SMTP (optional)

---

## Admin System

### Admin Authorization

Admins are identified by email addresses stored in `src/utils/adminEmails.ts`:

```typescript
export const ADMIN_EMAILS = [
  'aravindz9790@gmail.com',
  'deekshithabonthu15@gmail.com',
  'anuradhazzz@gmail.com'
];
```

### Admin Access Hook
**Location**: `src/hooks/useAdminAccess.ts`

```typescript
export const useAdminAccess = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();
        
        setIsAdmin(!!data);
      }
      setLoading(false);
    };
    
    checkAdminAccess();
  }, []);

  return { isAdmin, loading };
};
```

### Admin Dashboard Features

**Location**: `src/pages/AdminDashboard.tsx`

1. **User Statistics**
   - Total registered users
   - Activity log count
   - Search query count
   - Peak usage hours

2. **Activity Logs**
   - Real-time activity feed
   - User attribution
   - Action timestamps
   - Detailed information

3. **Search History**
   - All user searches
   - Search type (city/route)
   - Query details
   - Timestamps

4. **User Management**
   - View all users
   - Role management (future feature)
   - User status monitoring

### Admin Login Flow

Separate admin login portal at `/admin/login`:
1. User enters credentials
2. System verifies authentication
3. Checks for admin role
4. Redirects to admin dashboard or denies access

---

## Edge Functions

Edge functions run on Deno runtime at the edge, close to users.

### Configuration
**Location**: `supabase/config.toml`

```toml
project_id = "vhmgsasnycrfgnnpjufm"

[functions.analyze-city-traffic]
verify_jwt = false

[functions.analyze-location]
verify_jwt = false
```

### 1. analyze-city-traffic
**Location**: `supabase/functions/analyze-city-traffic/index.ts`

Analyzes traffic for cities or specific routes.

**Endpoint**: `/functions/v1/analyze-city-traffic`

**Request Body**:
```json
{
  "city": "New York",
  "from": "Manhattan",  // Optional
  "to": "Brooklyn"      // Optional
}
```

**Response**:
```json
{
  "city": "New York",
  "overallAnalysis": "AI analysis text...",
  "keyInsights": ["insight1", "insight2"],
  "bestTravelTimes": ["8-10 AM", "2-4 PM"],
  "trafficPredictions": ["prediction1", "prediction2"],
  "cityMetrics": {
    "population": "8.3M",
    "energyUsage": "11 GW",
    ...
  },
  "trafficFreeRoutes": [...],
  "highTrafficRoutes": [...]
}
```

**Implementation**:
- Calls Lovable AI Gateway
- Uses structured output with tool calling
- Returns comprehensive traffic analysis

### 2. analyze-location
**Location**: `supabase/functions/analyze-location/index.ts`

Provides detailed analysis for GPS coordinates.

**Endpoint**: `/functions/v1/analyze-location`

**Request Body**:
```json
{
  "latitude": 17.4358528,
  "longitude": 78.4203776
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "locationName": "Hyderabad, India",
    "weather": {...},
    "metrics": {...},
    "traffic": {...},
    "predictions": {...},
    "accidentProneAreas": [...]
  }
}
```

**Features**:
- Real GPS coordinate analysis
- Location-specific data
- Actual street names and landmarks
- Weather forecasting
- Accident hotspot identification

### Error Handling

Both functions handle:
- Rate limiting (429)
- Payment required (402)
- Invalid requests (400)
- Server errors (500)

Example:
```typescript
if (response.status === 429) {
  return new Response(
    JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
    { status: 429, headers: corsHeaders }
  );
}
```

### CORS Configuration

All functions include CORS headers:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

---

## AI Integration

### Lovable AI Gateway

The project uses Lovable AI Gateway for intelligent analysis.

**Base URL**: `https://ai.gateway.lovable.dev/v1/chat/completions`

### Configuration

**API Key**: Auto-configured in Supabase secrets as `LOVABLE_API_KEY`

### Default Model

`google/gemini-2.5-flash` - Balanced performance and cost

### Available Models

1. **Google Gemini**
   - `google/gemini-2.5-pro` - Highest quality
   - `google/gemini-2.5-flash` - Balanced (default)
   - `google/gemini-2.5-flash-lite` - Fastest

2. **OpenAI GPT**
   - `openai/gpt-5` - Most capable
   - `openai/gpt-5-mini` - Efficient
   - `openai/gpt-5-nano` - Speed optimized

### Usage Example

```typescript
const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${LOVABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
  }),
});
```

### Structured Output

The AI returns structured JSON for reliable parsing:

```typescript
const systemPrompt = `Return ONLY valid JSON with this structure:
{
  "locationName": "City Name",
  "weather": {...},
  "metrics": {...},
  ...
}`;
```

### Rate Limiting

- Monitor usage in Lovable Dashboard
- Handle 429 errors gracefully
- Display user-friendly messages
- Implement request throttling if needed

---

## Components Structure

### Component Hierarchy

```
src/
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── AccidentProneAreas.tsx   # Displays danger zones
│   ├── AIInsightsPanel.tsx      # AI-generated insights
│   ├── CityMap.tsx              # Interactive map component
│   ├── CitySearchBar.tsx        # City search input
│   ├── MetricsGrid.tsx          # City metrics display
│   ├── PredictionPanel.tsx      # Future predictions
│   ├── PreLoader.tsx            # Animated loading screen
│   ├── RouteSearchBar.tsx       # Route search input
│   ├── ThemeProvider.tsx        # Theme context
│   ├── ThemeToggle.tsx          # Dark/light toggle
│   ├── TrafficDisplay.tsx       # Live traffic status
│   ├── TrafficRouteCard.tsx     # Route cards
│   ├── UserAvatar.tsx           # User profile avatar
│   └── WeatherWidget.tsx        # Weather display
├── contexts/
│   └── AuthContext.tsx          # Authentication state
├── hooks/
│   ├── useActivityLogger.ts     # Activity tracking
│   ├── useAdminAccess.ts        # Admin check
│   ├── use-mobile.tsx           # Mobile detection
│   └── use-toast.ts             # Toast notifications
├── pages/
│   ├── AdminDashboard.tsx       # Admin portal
│   ├── AdminLogin.tsx           # Admin auth
│   ├── Auth.tsx                 # User auth
│   ├── Index.tsx                # Main dashboard
│   ├── NotFound.tsx             # 404 page
│   ├── Profile.tsx              # User profile
│   └── TrafficAnalysis.tsx      # AI analysis page
└── utils/
    └── adminEmails.ts           # Admin list
```

### Key Component Props

#### CityMap
```typescript
interface CityMapProps {
  onLocationFetch: (lat: number, lon: number) => void;
  isLoading?: boolean;
  locationName?: string;
}
```

#### MetricsGrid
```typescript
interface MetricsGridProps {
  metrics?: {
    population: string;
    populationChange: string;
    energyUsage: string;
    energyChange: string;
    waterSupply: string;
    waterChange: string;
    networkCoverage: string;
    networkStatus: string;
  };
}
```

#### WeatherWidget
```typescript
interface WeatherWidgetProps {
  weather?: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    forecast: Array<{
      day: string;
      high: number;
      low: number;
    }>;
  };
}
```

#### TrafficDisplay
```typescript
interface TrafficDisplayProps {
  traffic?: {
    areas: Array<{
      area: string;
      level: number;
      status: string;
      trend: string;
    }>;
    averageSpeed: string;
    activeVehicles: string;
  };
}
```

---

## Styling System

### Design System

The project uses a comprehensive design system with semantic tokens.

**Location**: `src/index.css`

### Color Tokens (HSL Format)

#### Light Mode
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 346.8 77.2% 49.8%;
  --secondary: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
}
```

#### Dark Mode
```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 346.8 77.2% 49.8%;
  --secondary: 240 3.7% 15.9%;
  --accent: 240 3.7% 15.9%;
  --muted: 240 3.7% 15.9%;
  --destructive: 0 62.8% 30.6%;
  --success: 142 71% 45%;
  --warning: 38 92% 50%;
}
```

### Custom Classes

#### Glass Card Effect
```css
.glass-card {
  @apply bg-card/50 backdrop-blur-xl border border-border/50;
}
```

#### Gradient Effects
```css
.gradient-primary {
  @apply bg-gradient-to-r from-primary via-accent to-secondary;
}

.gradient-mesh {
  @apply bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_0%,_transparent_50%),_radial-gradient(circle_at_80%_20%,_hsl(var(--accent))_0%,_transparent_50%)];
}
```

#### Glow Effects
```css
.glow-effect {
  box-shadow: 0 0 20px -5px hsl(var(--primary));
}

.text-glow {
  text-shadow: 0 0 20px hsl(var(--primary) / 0.5);
}
```

#### Animations
```css
.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### Responsive Design

Mobile-first approach using Tailwind breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

---

## API Reference

### Supabase Client Methods

#### Authentication
```typescript
// Sign up
supabase.auth.signUp({ email, password, options })

// Sign in
supabase.auth.signInWithPassword({ email, password })

// Sign out
supabase.auth.signOut()

// Get current user
supabase.auth.getUser()

// Get session
supabase.auth.getSession()

// Auth state change listener
supabase.auth.onAuthStateChange((event, session) => {})
```

#### Database Queries
```typescript
// Select
supabase.from('table').select('*')

// Insert
supabase.from('table').insert({ data })

// Update
supabase.from('table').update({ data }).eq('id', id)

// Delete
supabase.from('table').delete().eq('id', id)

// Single record
supabase.from('table').select('*').eq('id', id).single()

// With filters
supabase.from('table').select('*').eq('field', value).gte('date', date)
```

#### Edge Functions
```typescript
// Invoke function
supabase.functions.invoke('function-name', {
  body: { data }
})
```

### Activity Logger API
```typescript
import { useActivityLogger } from '@/hooks/useActivityLogger';

const { logActivity, logSearch } = useActivityLogger();

// Log generic activity
logActivity('page_view', { page: '/dashboard' });

// Log search
logSearch('city', 'New York');
```

---

## Deployment

### Lovable Cloud Deployment

The project is automatically deployed on Lovable Cloud.

1. **Auto-deployment**: Every push to main branch triggers deployment
2. **Edge Functions**: Automatically deployed with code
3. **Database Migrations**: Applied automatically
4. **Environment Variables**: Auto-configured

### Manual Deployment Steps

If deploying elsewhere:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

3. **Deploy edge functions**
   ```bash
   supabase functions deploy analyze-city-traffic
   supabase functions deploy analyze-location
   ```

4. **Run migrations**
   ```bash
   supabase db push
   ```

### Production Checklist

- [ ] Enable email confirmation in Supabase
- [ ] Set up custom domain
- [ ] Configure SMTP for emails
- [ ] Review RLS policies
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test admin access
- [ ] Verify AI rate limits
- [ ] Check CORS settings
- [ ] Review security headers

---

## Security Best Practices

### Implemented Security Measures

1. **Row Level Security (RLS)**
   - All tables have RLS enabled
   - Policies enforce user-based access
   - Admin checks use security definer functions

2. **Role-Based Access Control**
   - Roles stored in separate table
   - Server-side validation
   - No client-side role manipulation

3. **Authentication**
   - Secure password hashing (Supabase default)
   - JWT tokens with auto-refresh
   - Session persistence in localStorage

4. **Input Validation**
   - Form validation with Zod
   - SQL injection prevention (parameterized queries)
   - XSS prevention (React auto-escaping)

5. **API Security**
   - CORS headers configured
   - Rate limiting on AI gateway
   - Error messages sanitized

### Security Recommendations

1. **Production Setup**
   - Enable email confirmation
   - Use custom SMTP provider
   - Set up 2FA for admin accounts
   - Implement IP whitelisting for admin

2. **Monitoring**
   - Track failed login attempts
   - Monitor API usage
   - Set up alerts for suspicious activity

3. **Regular Maintenance**
   - Update dependencies regularly
   - Review RLS policies
   - Audit user permissions
   - Rotate API keys

---

## Troubleshooting

### Common Issues

#### Authentication Issues
**Problem**: Users can't log in
**Solution**: 
- Check if email confirmation is required
- Verify Supabase URL and keys
- Clear browser localStorage
- Check auth state listener

#### Edge Function Errors
**Problem**: Functions timing out
**Solution**:
- Check Lovable AI credits
- Verify API key is set
- Review function logs
- Check rate limits

#### UI Not Updating
**Problem**: Data doesn't refresh
**Solution**:
- Check React state updates
- Verify Supabase client calls
- Review error handling
- Check network requests

#### Admin Access Denied
**Problem**: Can't access admin dashboard
**Solution**:
- Verify email in adminEmails.ts
- Check user_roles table
- Confirm database trigger ran
- Check RLS policies

### Debug Tools

1. **Browser Console**: Check for JavaScript errors
2. **Network Tab**: Monitor API calls
3. **React DevTools**: Inspect component state
4. **Supabase Dashboard**: View logs and data
5. **Edge Function Logs**: Check Lovable Cloud logs

---

## Support & Resources

### Documentation Links
- [Lovable Docs](https://docs.lovable.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Project Links
- Repository: [Your GitHub URL]
- Live Demo: [Your Lovable URL]
- Admin Portal: [Your URL]/admin/login

### Contact
For issues or questions:
- Email: aravindz9790@gmail.com
- Admin: deekshithabonthu15@gmail.com
- Support: anuradhazzz@gmail.com

---

## License

[Your License Here]

---

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Supabase](https://supabase.com)
- AI by Lovable AI Gateway
- UI components by [shadcn/ui](https://ui.shadcn.com)

---

**Last Updated**: October 2025
**Version**: 1.0.0
