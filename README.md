# StartupOps Dashboard

Advanced startup operations dashboard with revenue analytics, customer insights, and team performance tracking. Built with modern React, TypeScript, and a comprehensive UI component library to provide actionable insights for startup growth and operations.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features and Functionalities](#key-features-and-functionalities)
- [Architecture and Design Patterns](#architecture-and-design-patterns)
- [Installation and Setup](#installation-and-setup)
- [Usage Examples](#usage-examples)
- [Dependencies and Requirements](#dependencies-and-requirements)
- [Testing Guidelines](#testing-guidelines)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Changelog](#changelog)
- [Troubleshooting](#troubleshooting)

## Project Overview

StartupOps Dashboard is a comprehensive web application designed to help startups track and analyze their key operational metrics. The dashboard provides real-time insights into revenue performance, customer behavior, team productivity, and growth analytics through an intuitive and responsive interface.

The application is built as a Single Page Application (SPA) using modern web technologies, featuring interactive charts, KPI tracking, and data visualization to support data-driven decision making for startup teams.

## Key Features and Functionalities

### 📊 Revenue Analytics

- **Monthly Recurring Revenue (MRR)** tracking with growth trends
- **Annual Recurring Revenue (ARR)** projections and analysis
- **Churn rate** monitoring and churn analysis
- **Revenue composition** breakdown by customer segments
- **Subscription plan** performance analysis
- **Revenue waterfall** charts showing new, expansion, and churn revenue

### 👥 Customer Analytics

- **Customer growth** tracking with acquisition and churn metrics
- **Customer segmentation** analysis (Enterprise, Professional, Starter)
- **Customer Lifetime Value (CLV)** calculations by segment
- **Retention rate** monitoring and improvement tracking
- **Conversion funnel** visualization from visitors to customers

### 📈 Dashboard Overview

- **Key Performance Indicators (KPIs)** with trend analysis
- **Interactive charts** for revenue growth and customer metrics
- **Real-time data** visualization with responsive design
- **Customizable metric cards** with target tracking

### 👨‍💼 Team Performance

- Team productivity metrics and analytics
- Performance tracking and benchmarking
- Team collaboration insights

### 📊 Advanced Analytics

- **Growth Analytics** for expansion tracking
- **Cohort Analytics** for customer behavior analysis
- **Product performance** metrics and insights

### ⚙️ Additional Features

- **Settings** management for user preferences
- **Help and documentation** integrated within the app
- **Responsive design** optimized for desktop and mobile
- **Dark/light theme** support
- **Toast notifications** for user feedback

## Architecture and Design Patterns

### Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC compiler for fast development
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui built on Radix UI primitives
- **Charts & Visualization**: Recharts for data visualization
- **Routing**: React Router v6 for client-side navigation
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Design Patterns Implemented

#### 1. Component Composition Pattern

The application uses a modular component architecture where complex UIs are built by composing smaller, reusable components:

```typescript
// Example from MetricCard component
<MetricCard
  title="Monthly Recurring Revenue"
  value="$120k"
  change={12.5}
  changeLabel="vs last month"
  icon={DollarSign}
  trend="up"
  target="$150k"
/>
```

#### 2. Layout Composition Pattern

Dashboard pages use a consistent layout structure with `DashboardLayout` wrapper:

```typescript
const Revenue = () => (
  <DashboardLayout>
    <div className="space-y-6 animate-fade-in">{/* Page content */}</div>
  </DashboardLayout>
);
```

#### 3. Provider Pattern

Global state and configuration are managed through React Context providers:

```typescript
<QueryClientProvider client={queryClient}>
  <TooltipProvider>
    <BrowserRouter>{/* Application routes */}</BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
```

#### 4. Custom Hooks Pattern

Reusable logic is extracted into custom hooks (found in `src/hooks/` directory)

#### 5. Component Variants with Class Variance Authority

UI components support multiple variants using the `class-variance-authority` library:

```typescript
// Badge component with variants
<Badge variant="secondary" className="bg-success/10 text-success">
  +12.5% MoM Growth
</Badge>
```

### File Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (Shadcn/ui)
│   ├── dashboard/   # Dashboard-specific components
│   └── layout/      # Layout components
├── pages/           # Route components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
└── types/           # TypeScript type definitions
```

## Installation and Setup

### Prerequisites

- **Node.js** version 18 or higher
- **npm** or **bun** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-revenue-dashboard
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Or using bun
   bun install
   ```

3. **Start the development server**

   ```bash
   # Using npm
   npm run dev

   # Or using bun
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Build for Production

```bash
# Using npm
npm run build

# Or using bun
bun run build
```

### Preview Production Build

```bash
# Using npm
npm run preview

# Or using bun
bun run preview
```

## Usage Examples

### Navigating the Dashboard

1. **Dashboard Overview**: Visit the home page to see key KPIs and overview charts
2. **Revenue Analytics**: Navigate to `/revenue` for detailed revenue metrics
3. **Customer Analytics**: Visit `/customers` for customer insights and segmentation
4. **Team Performance**: Go to `/team` for team productivity metrics

### Viewing Charts and Metrics

```typescript
// Example: Revenue Chart Implementation
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", mrr: 45000, arr: 540000 },
  { month: "Feb", mrr: 52000, arr: 624000 },
  // ... more data
];

<ResponsiveContainer width="100%" height="100%">
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
    <Tooltip
      formatter={(value: number) => [`$${value.toLocaleString()}`, "MRR"]}
    />
    <Line
      type="monotone"
      dataKey="mrr"
      stroke="hsl(var(--primary))"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>;
```

### Customizing Dashboard Components

The dashboard uses a modular component system that allows for easy customization:

```typescript
// Adding a custom metric card
<MetricCard
  title="Custom Metric"
  value="1,234"
  change={5.2}
  changeLabel="vs last week"
  icon={CustomIcon}
  trend="up"
  target="1,500"
/>
```

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb configuration with React and TypeScript rules
- **Prettier**: Code formatting (integrated with ESLint)
- **Import Order**: Organized imports with proper grouping

### Manual Testing Checklist

- [ ] Responsive design across different screen sizes
- [ ] Chart interactions and tooltips
- [ ] Navigation between pages
- [ ] Data loading states and error handling
- [ ] Form validation and submission
- [ ] Theme switching (if implemented)

## Contribution Guidelines

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

   - Follow the existing code style and patterns
   - Add TypeScript types for new functionality
   - Update component documentation if needed

4. **Run linting and tests**

   ```bash
   npm run lint
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: add new dashboard metric"
   ```

6. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes

### Code Style Guidelines

#### TypeScript

- Use strict type checking
- Prefer interfaces over types for object shapes
- Use union types for component variants
- Export types from dedicated type files

#### React Components

- Use functional components with hooks
- Implement proper error boundaries
- Use custom hooks for reusable logic
- Follow component composition patterns

#### Styling

- Use Tailwind CSS utility classes
- Leverage CSS custom properties for theming
- Maintain consistent spacing using Tailwind's space scale
- Use responsive design utilities

### Adding New Features

1. **Plan the feature** with component structure
2. **Create mock data** for development
3. **Implement the UI components**
4. **Add proper TypeScript types**
5. **Ensure responsive design**
6. **Test across different browsers**

**Built with ❤️ using React, TypeScript, and modern web technologies**
