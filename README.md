# Sky TV Retention Intelligence Dashboard 2.0

A next-generation predictive AI dashboard for Sky TV's Subscriber Retention Intelligence, built within Salesforce Media Cloud for B2C.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.7-38bdf8)

## 🚀 Overview

This dashboard empowers sales reps and retention managers to understand subscriber churn, predict risks, and act intelligently through an integrated AI co-pilot experience. The design reflects Salesforce's aesthetic (Lightning / Einstein / Data Cloud) with polished blue gradients, data visual clarity, and AI elements that feel smart but trustworthy.

## ✨ Key Features

### 1. **Header Bar – Overview Metrics**
- Total Subscribers, High-Risk Segment, CLTV/CAC Ratio, Engagement Score
- Real-time AI insights with trend indicators
- Interactive tooltips with actionable recommendations

### 2. **Subscriber Journey Map**
- Visual timeline showing when subscribers churn
- Three phases: Trial/Activation (0-30 days), Engagement (30-90 days), Established (90+ days)
- Color-coded risk zones with AI-powered insights

### 3. **Multi-Signal Churn Matrix**
- Interactive data grid visualizing 6 key churn signals
- Radar chart showing "Churn Intent Profile"
- Tracks Engagement, Billing, Sentiment, Experience, Competitor, and Loyalty dimensions

### 4. **Decision Layer**
- Prioritized subscriber segments with churn risk, CLTV, and ROI
- AI-driven suggestions for each segment
- Priority tags: "Save First", "Needs Attention", "Low ROI"

### 5. **Action Center**
- AI-driven retention recommendations with expected lift percentages
- One-click action triggers with auto-action toggle
- Interactive AI prompts for campaign deployment

### 6. **Agentforce (AI Chat)**
- Einstein-style conversational assistant
- Real-time segment analysis and recommendations
- Quick action buttons for common queries

### 7. **A/B Experimentation**
- Test results with retention lift and ROI metrics
- Track running, completed, and planned experiments
- Continuous learning insights

### 8. **Model Performance Validation**
- Real vs. Predicted churn comparison charts
- 96% model accuracy with detailed metrics
- AI alerts for model drift detection

### 9. **Feedback Simplification Widget**
- One-click exit feedback collection
- Incentivized feedback with reward offers
- Sentiment analysis integration

### 10. **Retention Maturity Tracker**
- Four-stage progression: Crawl → Walk → Run → Fly
- Visual progress tracking with completion percentages
- Current phase focus and roadmap access

## 🎨 Design System

- **Theme**: Deep navy (#0a1929) with vibrant Sky blue gradients (#0ea5e9)
- **Style**: Salesforce Lightning + Einstein Agent inspired
- **Effects**: Glassmorphism, smooth animations, micro-interactions
- **Icons**: Lucide React icons for consistency
- **Layout**: 3-column adaptive grid (Overview / Insights / Actions)

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.5 (React 18.3.1)
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS 3.4.7
- **Charts**: Recharts 2.12.7
- **Animations**: Framer Motion 11.3.28
- **Icons**: Lucide React 0.428.0

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🏗️ Project Structure

```
sky-tv-retention-intelligence/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── HeaderBar.tsx       # Overview metrics
│   ├── JourneyMap.tsx      # Subscriber journey timeline
│   ├── MultiSignalMatrix.tsx  # Churn signals grid
│   ├── DecisionLayer.tsx   # Segment prioritization
│   ├── ActionCenter.tsx    # AI recommendations
│   ├── RetentionCopilot.tsx  # AI chat agent
│   ├── ABExperimentation.tsx  # A/B test results
│   ├── ChurnValidation.tsx  # Model performance
│   ├── FeedbackWidget.tsx  # Exit feedback
│   └── MaturityTracker.tsx  # Retention maturity
├── lib/
│   └── utils.ts            # Utility functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎯 Key Metrics

- **Total Subscribers**: 2.1M (+3%)
- **High-Risk Segment**: 42K (+9%)
- **CLTV/CAC Ratio**: 3.4
- **Engagement Score**: 69%
- **Early Lifecycle Churn**: 16%
- **Model Accuracy**: 96%

## 💬 AI Voice & Tone

The AI agent (Einstein Agent) is:
- **Empathetic**: Understanding subscriber challenges
- **Confident**: Providing data-backed recommendations
- **Conversational**: Clear, jargon-free communication
- **Action-oriented**: Focus on tangible outcomes

Example:
> "Your top 5% high-value subscribers are disengaging. A loyalty campaign could save £1.2M in projected annual revenue."

## 🚀 Deployment

This project is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📊 Performance Optimizations

- Server-side rendering (SSR) with Next.js 14
- Component code splitting
- Optimized animations with Framer Motion
- Lazy loading for heavy components
- Tailwind CSS JIT compilation

## 🔐 Security Considerations

- Environment variables for sensitive data
- API route protection (when integrated with backend)
- Rate limiting for AI interactions
- CSRF protection on form submissions

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Salesforce Einstein](https://www.salesforce.com/einstein/)

## 🤝 Contributing

This is a proprietary project for Sky TV. For internal contributions:
1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Await code review

## 📝 License

© 2025 Sky TV. All rights reserved.

## 📞 Support

For questions or support, contact the Retention Intelligence team.

---

**Built with ❤️ for Sky TV Subscriber Retention**

