'use client';

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

// Core Web Vitals thresholds
const VITAL_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint (ms)
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint (ms)
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift (score)
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, needsImprovement: 1800 }  // Time to First Byte (ms)
};

// Performance rating function
function getRating(value: number, thresholds: { good: number; needsImprovement: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}

// Enhanced metric logging with detailed analysis
function logMetric(metric: Metric) {
  const { name, value, rating, delta, id } = metric;
  const thresholds = VITAL_THRESHOLDS[name as keyof typeof VITAL_THRESHOLDS];
  
  if (thresholds) {
    const performanceRating = getRating(value, thresholds);
    
    console.group(`🚀 Web Vital: ${name}`);
    console.log(`Value: ${value.toFixed(2)}`);
    console.log(`Rating: ${performanceRating}`);
    console.log(`Delta: ${delta.toFixed(2)}`);
    console.log(`ID: ${id}`);
    
    // Provide actionable insights
    if (performanceRating === 'poor') {
      console.warn(`⚠️  ${name} needs immediate attention!`);
      if (name === 'LCP') {
        console.info('💡 Consider: optimizing images, reducing server response time, eliminating render-blocking resources');
      } else if (name === 'INP') {
        console.info('💡 Consider: reducing JavaScript execution time, code splitting, optimizing event handlers');
      } else if (name === 'CLS') {
        console.info('💡 Consider: setting explicit dimensions for images/videos, avoiding inserting content above existing content');
      }
    } else if (performanceRating === 'needs-improvement') {
      console.info(`📈 ${name} could be improved for better user experience`);
    } else {
      console.log(`✅ ${name} is performing well!`);
    }
    console.groupEnd();
  }
  
  // Send to analytics (if configured)
  sendToAnalytics(metric);
}

// Analytics integration function
function sendToAnalytics(metric: Metric) {
  const w = typeof window !== 'undefined' ? window : undefined;
  const gtag = w && 'gtag' in w ? (w as Window & { gtag?: (...args: unknown[]) => void }).gtag : undefined;
  const dataLayer = w && 'dataLayer' in w ? (w as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer : undefined;

  // Google Analytics 4
  if (typeof gtag === 'function') {
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
  
  // Google Tag Manager
  if (Array.isArray(dataLayer)) {
    dataLayer.push({
      event: 'web_vitals',
      web_vitals: {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: Math.round(metric.delta),
        id: metric.id,
      },
    });
  }
  
  // Custom analytics endpoint (if you have one)
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    }).catch(() => {
      // Silently fail if analytics endpoint is not available
    });
  }
}

// Performance observer for additional metrics
function setupPerformanceObserver() {
  if ('PerformanceObserver' in window) {
    // Long Tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`🐌 Long Task detected: ${entry.duration.toFixed(2)}ms`, entry);
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long Task observer not supported');
    }
    
    // Layout Shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as any;
          if (layoutShift.value > 0.1) {
            console.warn(`📐 Layout Shift detected: ${layoutShift.value.toFixed(3)}`, layoutShift);
          }
        }
      });
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Layout Shift observer not supported');
    }
  }
}

// Initialize Core Web Vitals monitoring
export function initWebVitals() {
  console.log('🔍 Initializing Core Web Vitals monitoring...');
  
  try {
    // Monitor all Core Web Vitals
    onCLS(logMetric);
    onINP(logMetric);
    onFCP(logMetric);
    onLCP(logMetric);
    onTTFB(logMetric);
    
    // Setup additional performance monitoring
    setupPerformanceObserver();
    
    // Report initial page load performance
    if (document.readyState === 'complete') {
      reportPageLoadPerformance();
    } else {
      window.addEventListener('load', reportPageLoadPerformance);
    }
  } catch (error) {
    console.warn('⚠️ Error initializing Core Web Vitals:', error);
    console.log('📊 Falling back to basic performance monitoring...');
    
    // Fallback: basic performance monitoring
    if (document.readyState === 'complete') {
      reportPageLoadPerformance();
    } else {
      window.addEventListener('load', reportPageLoadPerformance);
    }
  }
}

// Report overall page load performance
function reportPageLoadPerformance() {
  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
        firstPaint: 0,
        firstContentfulPaint: 0,
      };
      
      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-paint') {
          metrics.firstPaint = entry.startTime;
        }
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
      });
      
      console.group('📊 Page Load Performance Summary');
      console.log('DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
      console.log('Load Complete:', `${metrics.loadComplete.toFixed(2)}ms`);
      console.log('DOM Interactive:', `${metrics.domInteractive.toFixed(2)}ms`);
      console.log('First Paint:', `${metrics.firstPaint.toFixed(2)}ms`);
      console.log('First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`);
      console.groupEnd();
    }
  } catch (error) {
    console.warn('⚠️ Error reporting page load performance:', error);
    
    // Fallback: basic timing
    if (performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      console.log('📊 Basic Page Load Time:', `${loadTime}ms`);
    }
  }
}

// Export individual metric functions for manual monitoring
export { onCLS, onINP, onFCP, onLCP, onTTFB };

// Export types for use in other components
export type { Metric };
