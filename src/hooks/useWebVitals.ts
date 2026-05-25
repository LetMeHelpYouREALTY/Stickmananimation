'use client';

import { useState, useEffect, useCallback } from 'react';
import { initWebVitals, onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from '../services/webVitals';

export interface WebVitalsData {
  LCP?: Metric;
  INP?: Metric;
  CLS?: Metric;
  FCP?: Metric;
  TTFB?: Metric;
  isInitialized: boolean;
}

export interface WebVitalsHook {
  vitals: WebVitalsData;
  refreshMetrics: () => void;
  getMetricRating: (metricName: string, value: number) => 'good' | 'needs-improvement' | 'poor';
}

const VITAL_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  INP: { good: 200, needsImprovement: 500 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 }
};

export function useWebVitals(): WebVitalsHook {
  const [vitals, setVitals] = useState<WebVitalsData>({
    isInitialized: false
  });

  const updateMetric = useCallback((metric: Metric) => {
    setVitals(prev => ({
      ...prev,
      [metric.name]: metric
    }));
  }, []);

  const refreshMetrics = useCallback(() => {
    // Re-measure current metrics
    onCLS(updateMetric);
    onINP(updateMetric);
    onFCP(updateMetric);
    onLCP(updateMetric);
    onTTFB(updateMetric);
  }, [updateMetric]);

  const getMetricRating = useCallback((metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = VITAL_THRESHOLDS[metricName as keyof typeof VITAL_THRESHOLDS];
    if (!thresholds) return 'good';
    
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  }, []);

  useEffect(() => {
    // Initialize web vitals monitoring
    initWebVitals();
    
    // Set up metric listeners
    onCLS(updateMetric);
    onINP(updateMetric);
    onFCP(updateMetric);
    onLCP(updateMetric);
    onTTFB(updateMetric);
    
    setVitals(prev => ({ ...prev, isInitialized: true }));
    
    // Cleanup function
    return () => {
      // Note: web-vitals doesn't provide cleanup methods, but the observers
      // will automatically stop when the page unloads
    };
  }, [updateMetric]);

  return {
    vitals,
    refreshMetrics,
    getMetricRating
  };
}
