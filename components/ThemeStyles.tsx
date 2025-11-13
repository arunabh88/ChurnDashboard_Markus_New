'use client';

import { useTheme } from '@/app/providers';
import { useEffect } from 'react';

export default function ThemeStyles() {
  const { theme } = useTheme();

  useEffect(() => {
    // Add light mode specific CSS overrides for Salesforce Lightning Design System
    const style = document.createElement('style');
    style.id = 'light-theme-overrides';
    
    if (theme === 'light') {
      style.textContent = `
        /* Salesforce Lightning Design System (SLDS) Theme */
        
        /* SLDS Color Variables */
        :root.light {
          --slds-brand: #0176D3;
          --slds-brand-dark: #014486;
          --slds-brand-accessible: #0176D3;
          --slds-bg-primary: #FFFFFF;
          --slds-bg-secondary: #FAFAF9;
          --slds-bg-tertiary: #F3F2F2;
          --slds-border-primary: #DDDBDA;
          --slds-border-secondary: #C9C7C5;
          --slds-text-primary: #181818;
          --slds-text-body: #3E3E3C;
          --slds-text-secondary: #706E6B;
          --slds-text-tertiary: #514F4D;
          --slds-success: #027E46;
          --slds-success-bg: #ECFAEC;
          --slds-warning: #FFB75D;
          --slds-warning-bg: #FEF6EC;
          --slds-error: #EA001E;
          --slds-error-bg: #FEDED8;
          --slds-info: #0176D3;
          --slds-info-bg: #EEF4FF;
        }
        
        /* Main Background - SLDS Standard */
        .light {
          background: #F3F2F2 !important;
        }
        
        .light main {
          background: transparent !important;
        }
        
        /* SLDS Typography */
        .light h1, .light h2, .light h3, .light h4, .light h5, .light h6 {
          color: var(--slds-text-primary) !important;
          font-weight: 700 !important;
        }
        
        /* Body text - SLDS Standard */
        .light p {
          color: var(--slds-text-body) !important;
        }
        
        /* White text should become dark in light mode */
        .light .text-white:not(button *):not(.bg-gradient-to-r *):not(.bg-sky-500 *):not(.bg-blue-500 *),
        .light td.text-white,
        .light div.text-white:not(button):not(.bg-gradient-to-r):not(.rounded-full),
        .light span.text-white:not(button *):not(.bg-gradient-to-r *) {
          color: var(--slds-text-primary) !important;
        }
        
        /* Gray text variations - SLDS Secondary & Tertiary */
        .light .text-gray-400,
        .light .text-gray-300,
        .light .text-gray-500,
        .light td.text-gray-400,
        .light td.text-gray-300,
        .light span.text-gray-400:not(button *),
        .light span.text-gray-300 {
          color: var(--slds-text-secondary) !important;
        }
        
        .light .text-gray-200 {
          color: var(--slds-text-body) !important;
        }
        
        /* Large numbers and metrics - SLDS Primary */
        .light .text-3xl,
        .light .text-2xl,
        .light .text-xl {
          color: var(--slds-text-primary) !important;
          font-weight: 700 !important;
        }
        
        /* SLDS Table Styling */
        .light table td,
        .light table th {
          color: var(--slds-text-body) !important;
        }
        
        .light table th {
          color: var(--slds-text-secondary) !important;
          font-weight: 700 !important;
          font-size: 0.75rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }
        
        /* SLDS Card Styling - Classic Lightning Cards */
        .light .bg-navy-900\\/50,
        .light .bg-navy-900,
        .light .glass-card {
          background: var(--slds-bg-primary) !important;
          border: 1px solid var(--slds-border-primary) !important;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07) !important;
          border-radius: 0.25rem !important;
        }
        
        /* SLDS Borders */
        .light .border-sky-500\\/20,
        .light .border-sky-500\\/30,
        .light .border-sky-500\\/10 {
          border-color: var(--slds-border-primary) !important;
        }
        
        /* SLDS Background Accents */
        .light .bg-sky-500\\/20,
        .light .bg-sky-500\\/10 {
          background: var(--slds-info-bg) !important;
        }
        
        /* KPI Widget Icons - Vibrant Gradients */
        .light .kpi-icon-wrapper {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15) !important;
        }
        
        .light .kpi-icon-wrapper svg,
        .light .kpi-icon-wrapper svg *,
        .light .kpi-icon-wrapper svg path {
          color: #FFFFFF !important;
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
        
        /* Ensure gradients work properly in light mode */
        .light .bg-gradient-to-br.from-blue-500 {
          background: linear-gradient(to bottom right, #3b82f6, #06b6d4) !important;
        }
        
        .light .bg-gradient-to-br.from-red-500 {
          background: linear-gradient(to bottom right, #ef4444, #f97316) !important;
        }
        
        .light .bg-gradient-to-br.from-green-500 {
          background: linear-gradient(to bottom right, #22c55e, #10b981) !important;
        }
        
        .light .bg-gradient-to-br.from-purple-500 {
          background: linear-gradient(to bottom right, #a855f7, #ec4899) !important;
        }
        
        .light .bg-gradient-to-br.from-orange-500 {
          background: linear-gradient(to bottom right, #f97316, #eab308) !important;
        }
        
        /* SLDS Brand Text Color */
        .light .text-sky-400,
        .light .text-sky-300,
        .light td.text-sky-400,
        .light span.text-sky-400:not(button *):not(.bg-gradient-to-r *) {
          color: var(--slds-brand) !important;
        }
        
        /* IDs and links - SLDS Brand */
        .light .font-mono {
          color: var(--slds-brand) !important;
          font-weight: 600 !important;
        }
        
        /* SLDS Text Gradient */
        .light .text-gradient {
          background: linear-gradient(135deg, var(--slds-brand) 0%, var(--slds-brand-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* SLDS Status Colors - Success (Green) */
        .light .bg-green-500\\/10,
        .light .border-green-500\\/30 {
          background: var(--slds-success-bg) !important;
          border-color: var(--slds-success) !important;
        }
        
        .light .text-green-400 {
          color: var(--slds-success) !important;
        }

        /* SLDS Status Colors - Info (Blue) */
        .light .bg-blue-500\\/10 {
          background: var(--slds-info-bg) !important;
        }
        
        .light .text-blue-400:not(.bg-blue-500):not(.bg-sky-500):not(.bg-gradient-to-r) {
          color: var(--slds-brand-dark) !important;
        }
        
        /* Blue badges (solid backgrounds) - SLDS Brand with White Text */
        .light span.bg-blue-500,
        .light span.bg-sky-500,
        .light div.bg-blue-500,
        .light div.bg-sky-500 {
          background: var(--slds-brand) !important;
          color: #FFFFFF !important;
        }

        /* SLDS Status Colors - Warning (Orange) */
        .light .bg-orange-500\\/10,
        .light .border-orange-500\\/30 {
          background: var(--slds-warning-bg) !important;
          border-color: #DD7A01 !important;
        }
        
        .light .text-orange-400 {
          color: #DD7A01 !important;
        }

        /* SLDS Status Colors - Error (Red) */
        .light .bg-red-500\\/20,
        .light .border-red-500,
        .light .border-red-500\\/30 {
          background: var(--slds-error-bg) !important;
          border-color: var(--slds-error) !important;
        }
        
        .light .text-red-400 {
          color: var(--slds-error) !important;
        }

        /* Purple accents */
        .light .bg-purple-500\\/10 {
          background: #F6F3FE !important;
        }
        
        .light .text-purple-400 {
          color: #5F3DBD !important;
        }

        /* Yellow accents */
        .light .bg-yellow-500\\/10 {
          background: var(--slds-warning-bg) !important;
        }
        
        .light .text-yellow-400 {
          color: #DD7A01 !important;
        }

        /* SLDS Buttons - Brand Buttons */
        .light button {
          color: #FFFFFF !important;
          font-weight: 600 !important;
          border-radius: 0.25rem !important;
        }
        
        .light button:hover {
          color: #FFFFFF !important;
        }
        
        /* ALL button content MUST be white */
        .light button,
        .light button *,
        .light button span,
        .light button svg,
        .light button svg *,
        .light button path {
          color: #FFFFFF !important;
          fill: #FFFFFF !important;
        }
        
        /* SLDS Brand Buttons - Blue backgrounds */
        .light .bg-sky-500,
        .light .bg-sky-400,
        .light .bg-blue-500,
        .light .bg-blue-600,
        .light .bg-blue-400 {
          background: var(--slds-brand) !important;
          color: #FFFFFF !important;
        }
        
        .light .bg-sky-500:hover,
        .light .bg-sky-400:hover,
        .light .bg-blue-500:hover,
        .light .bg-blue-600:hover,
        .light .bg-blue-400:hover {
          background: var(--slds-brand-dark) !important;
        }
        
        /* SLDS Gradients - Convert to solid brand color */
        .light .bg-gradient-to-r,
        .light .bg-gradient-to-br,
        .light .bg-gradient-to-bl,
        .light .from-sky-400,
        .light .from-sky-500,
        .light .to-blue-500,
        .light .to-blue-600 {
          color: #FFFFFF !important;
        }
        
        /* All children of blue backgrounds MUST have white text */
        .light .bg-sky-500,
        .light .bg-sky-500 *,
        .light .bg-sky-500 span,
        .light .bg-sky-400,
        .light .bg-sky-400 *,
        .light .bg-sky-400 span,
        .light .bg-blue-500,
        .light .bg-blue-500 *,
        .light .bg-blue-500 span,
        .light .bg-blue-600,
        .light .bg-blue-600 *,
        .light .bg-blue-600 span,
        .light .bg-blue-400,
        .light .bg-blue-400 *,
        .light .bg-blue-400 span {
          color: #FFFFFF !important;
        }
        
        /* Gradient backgrounds - white text everywhere */
        .light .bg-gradient-to-r,
        .light .bg-gradient-to-r *,
        .light .bg-gradient-to-r span,
        .light .bg-gradient-to-r svg,
        .light .bg-gradient-to-br,
        .light .bg-gradient-to-br *,
        .light .bg-gradient-to-br span,
        .light .bg-gradient-to-bl,
        .light .bg-gradient-to-bl *,
        .light .bg-gradient-to-bl span {
          color: #FFFFFF !important;
        }
        
        /* Badges with blue backgrounds */
        .light span.bg-sky-500,
        .light span.bg-sky-400,
        .light span.bg-blue-500,
        .light span.bg-blue-600,
        .light span.rounded-full.bg-gradient-to-r,
        .light div.bg-gradient-to-r {
          color: #FFFFFF !important;
        }
        
        .light span.bg-sky-500 *,
        .light span.bg-sky-400 *,
        .light span.bg-blue-500 *,
        .light span.bg-blue-600 * {
          color: #FFFFFF !important;
        }
        
        /* AI Insight badges and inline elements */
        .light .inline-flex.items-center,
        .light .inline-flex.items-center *,
        .light .inline-flex.items-center span,
        .light .inline-flex.items-center svg {
          color: #FFFFFF !important;
        }
        
        .light .flex.items-center.gap-1.bg-gradient-to-r,
        .light .flex.items-center.gap-1.bg-gradient-to-r * {
          color: #FFFFFF !important;
        }
        
        /* Icons in blue elements */
        .light .bg-gradient-to-r svg,
        .light .bg-gradient-to-r svg *,
        .light .bg-gradient-to-r svg path,
        .light .bg-sky-500 svg,
        .light .bg-sky-500 svg *,
        .light .bg-blue-500 svg,
        .light .bg-blue-500 svg *,
        .light button svg,
        .light button svg *,
        .light button svg path {
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
          color: #FFFFFF !important;
        }
        
        /* Action Center Buttons - Force White Text */
        .light .action-center-button,
        .light .action-center-button *,
        .light .action-center-button span,
        .light .action-center-button svg {
          color: #FFFFFF !important;
          fill: #FFFFFF !important;
        }
        
        /* Decision Layer Button - Force White Text */
        .light .decision-layer-button,
        .light .decision-layer-button *,
        .light .decision-layer-button span,
        .light .decision-layer-button svg {
          color: #FFFFFF !important;
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
        
        /* Priority Badges - Force White Text */
        .light .priority-badge,
        .light .priority-badge *,
        .light .priority-badge span,
        .light .priority-badge svg {
          color: #FFFFFF !important;
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
        
        /* Priority Badges - Lighter Backgrounds in Light Theme */
        .light .priority-badge {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }
        
        .light .priority-badge.bg-red-500 {
          background-color: #f87171 !important; /* Lighter red-400 */
          background-image: none !important;
        }
        
        .light .priority-badge.bg-orange-500 {
          background-color: #fb923c !important; /* Lighter orange-400 */
          background-image: none !important;
        }
        
        .light .priority-badge.bg-gray-600 {
          background-color: #64748b !important; /* Lighter slate-500 */
          background-image: none !important;
        }
        
        /* SLDS Shadows - Subtle and Professional */
        .light .shadow-glow {
          box-shadow: 0 0 0 3px rgba(1, 118, 211, 0.1) !important;
        }
        
        /* SLDS A/B Testing Subtitle */
        .light .ab-testing-subtitle {
          color: var(--slds-text-secondary) !important;
        }
        
        /* New Experiment Button - Force White Text */
        .light .new-experiment-button,
        .light .new-experiment-button *,
        .light .new-experiment-button span {
          color: #FFFFFF !important;
        }
        
        /* Sky TV Icon - Force White in Light Theme */
        .light .sky-tv-icon,
        .light .sky-tv-icon *,
        .light .sky-tv-icon path {
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
        
        .light .shadow-lg {
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1) !important;
        }
        
        /* SLDS Rounded Corners - Subtle */
        .light .rounded-xl {
          border-radius: 0.25rem !important;
        }
        
        .light .rounded-lg {
          border-radius: 0.25rem !important;
        }
        
        .light .rounded-full {
          border-radius: 100px !important;
        }
        
        /* SLDS Card Hover Effects - Subtle Lift */
        .light .glass-card:hover {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12) !important;
          transform: translateY(-1px) !important;
          transition: all 0.15s ease;
        }
        
        /* SLDS Multi-Signal Matrix - Source Tags */
        .light .source-tag {
          background: var(--slds-info-bg) !important;
          color: var(--slds-brand) !important;
          border: 1px solid var(--slds-brand) !important;
          border-radius: 0.25rem !important;
          font-weight: 600 !important;
        }

        .light .bg-navy-800 {
          background: var(--slds-info-bg) !important;
          color: var(--slds-brand) !important;
        }

        .light .bg-navy-800.source-tag {
          background: var(--slds-info-bg) !important;
          color: var(--slds-brand) !important;
          border: 1px solid var(--slds-brand) !important;
        }
        
        /* SLDS Decision Layer - Progress Ring */
        .light .text-navy-700 {
          color: var(--slds-bg-tertiary) !important;
        }
        
        /* SLDS Status Colors for Rings */
        .light .text-red-400 {
          color: var(--slds-error) !important;
        }
        
        .light .text-orange-400 {
          color: var(--slds-warning) !important;
        }
        
        .light .text-yellow-400 {
          color: var(--slds-warning) !important;
        }
        
        /* SLDS Input Fields */
        .light input {
          background: var(--slds-bg-primary) !important;
          border: 1px solid var(--slds-border-primary) !important;
          color: var(--slds-text-primary) !important;
          border-radius: 0.25rem !important;
          padding: 0.5rem 0.75rem !important;
        }
        
        .light input:focus {
          border-color: var(--slds-brand) !important;
          box-shadow: 0 0 0 3px rgba(1, 118, 211, 0.1) !important;
        }
        
        .light input::placeholder {
          color: var(--slds-text-secondary) !important;
        }
        
        /* SLDS Links */
        .light a {
          color: var(--slds-brand) !important;
        }
        
        .light a:hover {
          color: var(--slds-brand-dark) !important;
          text-decoration: underline !important;
        }
        
        /* SLDS Chart Text Elements (Recharts) */
        .light .recharts-text {
          fill: var(--slds-text-primary) !important;
        }
        
        .light .recharts-cartesian-axis-tick-value {
          fill: var(--slds-text-body) !important;
        }
        
        .light .recharts-legend-item-text {
          color: var(--slds-text-primary) !important;
        }
        
        /* SLDS Tooltip - Clean and Professional with White Text */
        .light .recharts-tooltip-wrapper {
          color: #FFFFFF !important;
        }
        
        .light .recharts-default-tooltip {
          background: rgba(0, 0, 0, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.25rem !important;
          padding: 0.75rem !important;
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.3) !important;
          color: #FFFFFF !important;
        }
        
        .light .recharts-default-tooltip * {
          color: #FFFFFF !important;
        }
        
        .light .recharts-tooltip-label,
        .light .recharts-tooltip-label * {
          color: #FFFFFF !important;
          font-weight: 700 !important;
          margin-bottom: 0.5rem !important;
        }
        
        .light .recharts-tooltip-item,
        .light .recharts-tooltip-item *,
        .light .recharts-tooltip-item-value,
        .light .recharts-tooltip-item-name {
          color: #FFFFFF !important;
        }
        
        .light .recharts-tooltip-item-list {
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .light .recharts-tooltip-item-list li {
          color: #FFFFFF !important;
        }
        
        /* SLDS Card and Panel Text */
        .light .glass-card p:not(.bg-sky-500 *):not(.bg-blue-500 *):not(.bg-gradient-to-r *),
        .light .glass-card span:not(.text-sky-400):not(.text-green-400):not(.text-red-400):not(.text-orange-400):not(.text-purple-400):not(.text-yellow-400):not(.text-blue-400):not(.bg-sky-500 *):not(.bg-blue-500 *):not(.bg-gradient-to-r *) {
          color: var(--slds-text-primary) !important;
        }
        
        /* SLDS Small Text - Readable and Accessible */
        .light .text-xs:not(.bg-sky-500 *):not(.bg-blue-500 *):not(.bg-gradient-to-r *):not(button *),
        .light .text-sm:not(.bg-sky-500 *):not(.bg-blue-500 *):not(.bg-gradient-to-r *):not(button *) {
          color: var(--slds-text-body) !important;
        }
        
        /* Blue background badges - force white text */
        .light .bg-gradient-to-r.from-sky-400.to-blue-500,
        .light .bg-gradient-to-r.from-sky-400.to-blue-500 span,
        .light .bg-gradient-to-r.from-sky-400.to-blue-500 svg {
          color: #FFFFFF !important;
          fill: #FFFFFF !important;
        }
        
        /* SLDS Font Weight Text */
        .light .font-medium {
          color: var(--slds-text-primary) !important;
        }
        
        .light .font-semibold {
          color: var(--slds-text-primary) !important;
        }
        
        .light .font-bold {
          color: var(--slds-text-primary) !important;
        }
        
        /* SLDS Navigation - Global Header Style */
        .light nav {
          background: var(--slds-bg-primary) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid var(--slds-border-primary) !important;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07) !important;
        }
        
        .light nav .text-gray-400 {
          color: var(--slds-text-secondary) !important;
        }
        
        .light nav .text-white {
          color: var(--slds-text-primary) !important;
        }
        
        /* SLDS Navigation Icons - Default Grey */
        .light nav svg,
        .light nav svg *,
        .light nav svg path,
        .light nav button:not(.bg-gradient-to-r) svg,
        .light nav button:not(.bg-gradient-to-r) svg *,
        .light nav button:not(.bg-gradient-to-r) svg path {
          color: var(--slds-text-secondary) !important;
          fill: var(--slds-text-secondary) !important;
          stroke: var(--slds-text-secondary) !important;
        }
        
        /* SLDS Navigation Buttons */
        .light nav button:not(.bg-gradient-to-r):not(.from-sky-400) {
          background: transparent !important;
          border: 1px solid transparent !important;
          color: var(--slds-text-secondary) !important;
        }
        
        .light nav button:not(.bg-gradient-to-r):hover {
          background: var(--slds-bg-secondary) !important;
          color: var(--slds-brand) !important;
          border-color: transparent !important;
        }
        
        .light nav button:not(.bg-gradient-to-r):hover svg,
        .light nav button:not(.bg-gradient-to-r):hover svg * {
          color: var(--slds-brand) !important;
          fill: var(--slds-brand) !important;
          stroke: var(--slds-brand) !important;
        }
        
        /* SLDS Active Navigation Button */
        .light nav button.bg-sky-500\\/20 {
          background: var(--slds-info-bg) !important;
          color: var(--slds-brand) !important;
          border: 1px solid var(--slds-brand) !important;
          font-weight: 700 !important;
        }
        
        .light nav button.bg-sky-500\\/20 svg,
        .light nav button.bg-sky-500\\/20 svg * {
          color: var(--slds-brand) !important;
          fill: var(--slds-brand) !important;
          stroke: var(--slds-brand) !important;
        }
        
        /* SLDS Pagination Text */
        .light button.text-gray-400 {
          color: var(--slds-text-secondary) !important;
        }
        
        /* SLDS Metric Values */
        .light .text-3xl {
          color: var(--slds-text-primary) !important;
        }
        
        /* SLDS List Items */
        .light li {
          color: var(--slds-text-primary) !important;
        }
        
        /* SLDS Progress Bars */
        .light .bg-gradient-to-r.from-sky-400.to-blue-500:not(button):not(span):not(div) {
          background: linear-gradient(to right, var(--slds-brand), var(--slds-brand-dark)) !important;
        }
        
        /* Round badges with blue backgrounds - white text */
        .light .rounded-full.bg-gradient-to-r,
        .light .rounded-full.bg-gradient-to-r *,
        .light span.rounded-full.text-xs,
        .light span.rounded-full.text-xs * {
          color: #FFFFFF !important;
        }
        
        /* Icon colors in blue elements */
        .light .bg-gradient-to-r svg,
        .light .bg-gradient-to-r svg path,
        .light button svg,
        .light button svg path {
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
      `;
    } else {
      style.textContent = '';
    }
    
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.getElementById('light-theme-overrides');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [theme]);

  return null;
}

