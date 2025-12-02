# Sky TV Churn Dashboard - Information Architecture

## Overview
This document provides a comprehensive view of the application's information architecture, including navigation hierarchy, component structure, user flows, and data relationships.

---

## 1. Main Navigation Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Root                          │
│                    (app/page.tsx)                            │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Dashboard   │    │   Analyse    │    │    Act       │
│     Tab      │    │     Tab      │    │    Tab       │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Global Components (Always Visible)
- **Navigation Header** (`components/Navigation.tsx`)
  - Tab switcher (Dashboard, Analyse, Act)
  - Theme toggle
  - AI Co-Pilot toggle
  - User profile
  - Notifications

- **AI Co-Pilot Panel** (`components/RetentionCopilot.tsx`)
  - Sticky right-side panel (30-35% width)
  - Context-aware suggestions
  - Chat interface
  - Quick actions
  - Docked/Floating modes

---

## 2. Dashboard Tab Structure

```
Dashboard Tab
│
├── HeaderBar (KPI Cards)
│   ├── Total Subscribers → SubscriberListView
│   ├── Monthly Churn Rate → ChurnRateDeepDive
│   ├── High-Risk Subscribers → HighRiskSubscribersDeepDive
│   ├── Early Lifecycle Churn → EarlyLifecycleChurnDeepDive
│   └── Avg CLTV / CAC → CltvCacDeepDive
│
├── Journey Map
│   ├── Trial Users → Analyse (trial-triggers mode)
│   ├── New Users → Analyse (new-users-triggers mode)
│   └── Established Users → Analyse (established-users-triggers mode)
│
└── Priority Alerts
    ├── Alert Cards
    ├── "Analyse" CTA → Analyse Tab
    └── "Take Action" CTA → Act Tab
```

### Components:
- `components/HeaderBar.tsx` - KPI cards
- `components/JourneyMap.tsx` - Funnel visualization
- `components/dashboard/PriorityAlerts.tsx` - Alert cards

---

## 3. Deep Dive Views (From Dashboard KPIs)

### 3.1 SubscriberListView
**Trigger:** Click "Total Subscribers" KPI card

**Features:**
- Search by name, email, or ID
- Advanced filters (Risk, Plan, Tenure, Engagement, Status)
- Bulk actions toolbar
- Individual subscriber actions
- Pagination
- Summary statistics

**Navigation:**
- Back → Dashboard
- Actions → Act Tab (with pre-filled data)

### 3.2 ChurnRateDeepDive
**Trigger:** Click "Monthly Churn Rate" KPI card

**Features:**
- Summary stats (Current rate, Target, Gap, Monthly churned, Trend)
- Churn trend chart (vs target)
- Root cause analysis (top drivers)
- Segment breakdown chart
- Filters (Date range, Plan, Region, Segment)
- Churned subscribers table
- Action buttons (Create Campaign, Analyze Root Causes)

**Navigation:**
- Back → Dashboard
- Create Campaign → Act Tab
- Analyze Root Causes → Analyse Tab

### 3.3 HighRiskSubscribersDeepDive
**Trigger:** Click "High-Risk Subscribers" KPI card

**Features:**
- Summary stats (Total, Critical, High, Revenue at risk, Avg churn probability)
- Risk distribution chart (pie)
- Top risk signals breakdown
- Filters (Risk level, Plan, Tenure, Engagement, Risk signal, Region)
- High-risk subscribers table with bulk selection
- Bulk action toolbar
- Individual subscriber actions

**Navigation:**
- Back → Dashboard
- Create Intervention → Act Tab
- Individual/Bulk Actions → Act Tab

### 3.4 EarlyLifecycleChurnDeepDive
**Trigger:** Click "Early Lifecycle Churn" KPI card

**Features:**
- Summary stats (Churn rate, Total affected, Revenue at risk, Avg days to churn)
- Churn timeline chart (0-30, 31-60, 61-90 days)
- Top churn triggers breakdown
- Segment breakdown (Trial, New)
- Filters (Lifecycle stage, Trigger type, Plan, Region, Sign-up date)
- Affected subscribers table
- Action buttons (View Trial Triggers, Create Intervention)

**Navigation:**
- Back → Dashboard
- View Trial Triggers → Analyse Tab (trial-triggers mode)
- View New User Triggers → Analyse Tab (new-users-triggers mode)
- Create Intervention → Act Tab

### 3.5 CltvCacDeepDive
**Trigger:** Click "Avg CLTV / CAC" KPI card

**Features:**
- Summary stats (Current ratio, Avg CLTV, Avg CAC, Target ratio, Gap)
- CLTV vs CAC trend chart
- Optimization opportunities panel
- Filters (Segment, Plan, Acquisition source, Region, Date range)
- Segment performance table (sortable)
- Action buttons (Optimize Low-Ratio, Create Campaign)

**Navigation:**
- Back → Dashboard
- Create Campaign → Act Tab

---

## 4. Analyse Tab Structure

```
Analyse Tab
│
├── Mode: Overview
│   ├── Problem Context Summary
│   ├── Multi-Signal Churn Matrix
│   ├── Journey Friction Analysis (Drilldown View)
│   ├── Decision Layer (Segment Prioritization)
│   ├── KPI & Trend Overview
│   └── Model vs Real
│
├── Mode: Segments
│   └── DecisionSegmentsView
│       └── Full segment portfolio view
│
├── Mode: Trial Triggers
│   └── TrialTriggersDrilldown
│       ├── Trigger breakdown cards
│       ├── Subscriber tables per trigger
│       └── Overlap analysis
│
├── Mode: New Users Triggers
│   └── NewUsersTriggersDrilldown
│       ├── Trigger breakdown cards
│       ├── Subscriber tables per trigger
│       └── Overlap analysis
│
└── Mode: Established Users Triggers
    └── EstablishedUsersTriggersDrilldown
        ├── Trigger breakdown cards
        ├── Subscriber tables per trigger
        └── Overlap analysis
```

### Components:
- `components/analyse/ProblemContextSummary.tsx`
- `components/MultiSignalMatrix.tsx`
- `components/analyse/JourneyDrilldownView.tsx`
- `components/DecisionLayer.tsx`
- `components/analyse/KpiTrendOverview.tsx`
- `components/analyse/ModelVsReal.tsx`
- `components/views/DecisionSegmentsView.tsx`
- `components/analyse/TrialTriggersDrilldown.tsx`
- `components/analyse/NewUsersTriggersDrilldown.tsx`
- `components/analyse/EstablishedUsersTriggersDrilldown.tsx`
- `components/analyse/CreateInterventionFlow.tsx` (Modal)

---

## 5. Act Tab Structure

```
Act Tab
│
├── Performance Alert Banner
│   └── Underperforming/At-risk actions alerts
│
├── Action Performance Dashboard
│   ├── Summary cards (Total, On-Track, Underperforming, At-Risk)
│   ├── Active Campaigns Summary
│   └── Quick actions (View All, Pause, Clone)
│
├── Problem Context & Tackling Strategy
│   └── Challenge-Strategy pairs
│
├── KPI Tiles
│   ├── At-risk value protected
│   ├── Projected churn this month
│   └── Avg campaign ROI
│
├── Action History List
│   ├── Campaign table
│   ├── Performance status
│   ├── Actual vs Expected
│   └── Action buttons (Review, Pause, Clone, View in Analyse)
│
├── Recommended Playbooks
│   └── ActionCenter component
│
├── A/B Experimentation
│   └── ABExperimentation component
│
└── Model Performance
    └── ChurnValidation component
```

### Components:
- `components/actions/PerformanceAlertBanner.tsx`
- `components/actions/ActionPerformanceDashboard.tsx`
- `components/actions/ActionHistoryList.tsx`
- `components/ActionCenter.tsx`
- `components/ABExperimentation.tsx`
- `components/ChurnValidation.tsx`
- `components/actions/CreateActionPlanWizard.tsx` (Modal)

---

## 6. Component Hierarchy

### 6.1 Shared Components
```
components/shared/
├── FilterPanel.tsx          # Reusable filter panel with search
└── SummaryStatsBar.tsx      # Reusable stats display bar
```

### 6.2 UI Components
```
components/ui/
└── Breadcrumb.tsx           # Breadcrumb navigation
```

### 6.3 Subscriber Components
```
components/subscribers/
├── BulkActionToolbar.tsx    # Bulk action toolbar
└── SubscriberActionMenu.tsx # Individual subscriber actions dropdown
```

### 6.4 Dashboard Components
```
components/dashboard/
├── PriorityAlerts.tsx       # Alert cards
├── DashboardPulse.tsx       # Pulse metrics
├── KpiPulseBar.tsx          # KPI bar
└── TopSignalsHighlight.tsx  # Top signals
```

### 6.5 Analyse Components
```
components/analyse/
├── ProblemContextSummary.tsx
├── JourneyDrilldownView.tsx
├── KpiTrendOverview.tsx
├── ModelVsReal.tsx
├── CreateInterventionFlow.tsx
├── TrialTriggersDrilldown.tsx
├── NewUsersTriggersDrilldown.tsx
└── EstablishedUsersTriggersDrilldown.tsx
```

### 6.6 Actions Components
```
components/actions/
├── ActionHistoryList.tsx
├── ActionPerformanceDashboard.tsx
├── PerformanceAlertBanner.tsx
└── CreateActionPlanWizard.tsx
```

---

## 7. Data Structure

### 7.1 Data Files
```
lib/data/
├── subscribers.ts              # Subscriber data and filters
├── churnRateData.ts           # Churn trends, root causes, churned subscribers
├── highRiskData.ts            # High-risk subscribers, risk signals
├── earlyLifecycleData.ts      # Early lifecycle churn data, triggers
├── cltvCacData.ts            # CLTV/CAC data by segment
└── segments.ts                # Segment definitions and priorities
```

### 7.2 Data Flow
```
User Interaction
    │
    ▼
Component State
    │
    ▼
Filter Functions (lib/data/*.ts)
    │
    ▼
Filtered Data
    │
    ▼
Component Rendering
    │
    ▼
User Actions → Navigation/State Updates
```

---

## 8. Navigation Flows

### 8.1 Dashboard → Deep Dive Flow
```
Dashboard KPI Card Click
    │
    ▼
Deep Dive View Opens
    │
    ├── Search/Filter
    ├── View Details
    ├── Take Action → Act Tab
    └── Back → Dashboard
```

### 8.2 Dashboard → Analyse Flow
```
Dashboard
    │
    ├── Journey Map Stage Click → Analyse (drilldown mode)
    ├── Priority Alert "Analyse" → Analyse (overview with focus)
    └── KPI Card → Analyse (overview with filter)
```

### 8.3 Analyse → Act Flow
```
Analyse Tab
    │
    ├── "Launch Action" button → Act Tab
    ├── "Take Action" on signal → Act Tab
    ├── "Create Intervention" → Act Tab (with pre-filled segment)
    └── Decision Layer "Activate" → Act Tab
```

### 8.4 Act → Analyse Flow
```
Act Tab
    │
    ├── "Review in Analyse" → Analyse Tab (with segment focus)
    └── "View in Analyse" → Analyse Tab
```

### 8.5 Cross-Tab Navigation
```
Any Tab
    │
    ├── Navigation Header → Switch Tabs
    ├── AI Co-Pilot Quick Actions → Navigate to sections
    └── Breadcrumbs → Navigate back
```

---

## 9. State Management

### 9.1 Main App State (app/page.tsx)
```typescript
- activeTab: 'dashboard' | 'analyse' | 'act'
- copilotOpen: boolean
- analyseMode: 'overview' | 'segments' | 'trial-triggers' | 'new-users-triggers' | 'established-users-triggers'
- analyseFocus: string | null
- actionsFocus: string | null
- navigationSource: 'dashboard' | 'analyse' | null
- subscribersView: boolean
- churnRateView: boolean
- highRiskView: boolean
- earlyLifecycleView: boolean
- cltvCacView: boolean
```

### 9.2 Component-Level State
- Filter states (managed in each deep dive view)
- Pagination states
- Selection states (bulk actions)
- Modal states (wizards, interventions)

---

## 10. User Journey Maps

### 10.1 Retention Manager - Daily Workflow
```
1. Land on Dashboard
   │
   ├── Review KPI Cards
   │   └── Click KPI → Deep Dive → Analyze → Take Action
   │
   ├── Review Journey Map
   │   └── Click Stage → Analyse Drilldown → Create Intervention
   │
   └── Review Priority Alerts
       └── Click Alert → Analyse/Action Tab
```

### 10.2 Deep Investigation Workflow
```
1. Dashboard → Analyse Tab
   │
   ├── Review Problem Context
   ├── Analyze Signal Matrix
   ├── Drill into Journey Friction
   ├── Review Decision Layer
   └── Check Model Performance
       │
       └── Take Action → Act Tab
```

### 10.3 Action Creation Workflow
```
1. Identify Problem (Dashboard/Analyse)
   │
   ├── Navigate to Act Tab
   │
   ├── Review Performance Dashboard
   ├── Check Action History
   ├── Select Recommended Playbook OR
   └── Create Custom Action Plan
       │
       └── Launch → Monitor in Action History
```

---

## 11. Key Features by Section

### Dashboard
- ✅ 5 KPI cards with deep dive access
- ✅ Journey visualization (funnel to retention pond)
- ✅ Priority alerts with CTAs
- ✅ Quick navigation to Analyse/Act

### Analyse
- ✅ Problem context summary
- ✅ Multi-signal churn matrix
- ✅ Journey friction analysis
- ✅ Decision layer (segment prioritization)
- ✅ KPI trends with functional filters
- ✅ Model performance validation
- ✅ Drill-down views for each lifecycle stage

### Act
- ✅ Performance alerts
- ✅ Action performance dashboard
- ✅ Problem context & strategy
- ✅ Action history with performance tracking
- ✅ Recommended playbooks
- ✅ A/B experimentation
- ✅ Model performance

### Deep Dives
- ✅ Functional search
- ✅ Working filters
- ✅ Summary statistics
- ✅ Charts and visualizations
- ✅ Detailed tables with pagination
- ✅ Action buttons
- ✅ Back navigation

---

## 12. Component Dependencies

```
app/page.tsx (Root)
    │
    ├── Navigation
    ├── ThemeStyles
    ├── RetentionCopilot
    │
    └── Conditional Views
        ├── DashboardView
        │   ├── HeaderBar
        │   ├── JourneyMap
        │   └── PriorityAlerts
        │
        ├── AnalyseView
        │   ├── ProblemContextSummary
        │   ├── MultiSignalMatrix
        │   ├── JourneyDrilldownView
        │   ├── DecisionLayer
        │   ├── KpiTrendOverview
        │   └── ModelVsReal
        │
        ├── ActionView
        │   ├── PerformanceAlertBanner
        │   ├── ActionPerformanceDashboard
        │   ├── ActionHistoryList
        │   ├── ActionCenter
        │   ├── ABExperimentation
        │   └── ChurnValidation
        │
        └── Deep Dive Views
            ├── SubscriberListView
            ├── ChurnRateDeepDive
            ├── HighRiskSubscribersDeepDive
            ├── EarlyLifecycleChurnDeepDive
            └── CltvCacDeepDive
```

---

## 13. Responsive Design

### Desktop (≥1024px)
- 3-column layout with AI Co-Pilot sidebar
- Full table views
- Side-by-side filters and search
- Sticky navigation header

### Tablet (768px - 1023px)
- 2-column layout
- Collapsible AI Co-Pilot
- Responsive tables with horizontal scroll
- Stacked filters

### Mobile (<768px)
- Single column layout
- Bottom AI Co-Pilot panel
- Card-based layouts
- Stacked filters and search

---

## 14. Accessibility Features

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Color contrast compliance
- ✅ Responsive text sizing

---

## 15. Performance Optimizations

- ✅ Dynamic imports for large components
- ✅ useMemo for filtered data
- ✅ Pagination for large datasets
- ✅ Lazy loading of charts
- ✅ Optimized re-renders
- ✅ Code splitting

---

## Summary

The Sky TV Churn Dashboard is a comprehensive retention management application with:

- **3 Main Tabs**: Dashboard, Analyse, Act
- **5 Deep Dive Views**: Subscriber List, Churn Rate, High Risk, Early Lifecycle, CLTV/CAC
- **Multiple Analyse Modes**: Overview, Segments, Trial Triggers, New Users Triggers, Established Users Triggers
- **Comprehensive Filtering**: Search and filters on all deep dive views
- **Action Workflows**: Campaign creation, intervention flows, A/B testing
- **AI Co-Pilot**: Context-aware assistance across all tabs
- **Full Navigation**: Seamless flow between all sections

The architecture supports retention managers in identifying churn risks, analyzing root causes, and taking targeted actions to improve subscriber retention.

