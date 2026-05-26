'use client';

import React from 'react';
import { useWebVitals } from '../hooks/useWebVitals';

interface MetricCardProps {
  title: string;
  value?: number;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  description: string;
  threshold: { good: number; needsImprovement: number };
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  rating, 
  description, 
  threshold 
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return '✅';
      case 'needs-improvement': return '⚠️';
      case 'poor': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(rating)}`}>
          {getRatingIcon(rating)} {rating.replace('-', ' ')}
        </span>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900">
          {value !== undefined ? value.toFixed(2) : '--'}
        </span>
        <span className="text-sm text-gray-500 ml-1">{unit}</span>
      </div>
      
      <p className="text-xs text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-green-600">Good: ≤{threshold.good}</span>
          <span className="text-yellow-600">Needs Improvement: ≤{threshold.needsImprovement}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              rating === 'good' ? 'bg-green-500' : 
              rating === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ 
              width: value !== undefined 
                ? `${Math.min((value / threshold.needsImprovement) * 100, 100)}%` 
                : '0%' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const WebVitalsDisplay: React.FC = () => {
  const { vitals, refreshMetrics, getMetricRating } = useWebVitals();

  const metrics = [
    {
      key: 'LCP',
      title: 'Largest Contentful Paint',
      unit: 'ms',
      description: 'Time for the largest content element to become visible',
      threshold: { good: 2500, needsImprovement: 4000 },
      value: vitals.LCP?.value
    },
    {
      key: 'INP',
      title: 'Interaction to Next Paint',
      unit: 'ms',
      description: 'Time from user interaction to next paint',
      threshold: { good: 200, needsImprovement: 500 },
      value: vitals.INP?.value
    },
    {
      key: 'CLS',
      title: 'Cumulative Layout Shift',
      unit: 'score',
      description: 'Measure of visual stability during page load',
      threshold: { good: 0.1, needsImprovement: 0.25 },
      value: vitals.CLS?.value
    },
    {
      key: 'FCP',
      title: 'First Contentful Paint',
      unit: 'ms',
      description: 'Time for first content to be painted on screen',
      threshold: { good: 1800, needsImprovement: 3000 },
      value: vitals.FCP?.value
    },
    {
      key: 'TTFB',
      title: 'Time to First Byte',
      unit: 'ms',
      description: 'Time for first byte of response to arrive',
      threshold: { good: 800, needsImprovement: 1800 },
      value: vitals.TTFB?.value
    }
  ];

  if (!vitals.isInitialized) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Initializing Core Web Vitals monitoring...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Core Web Vitals</h2>
          <p className="text-sm text-gray-600">Real-time performance metrics</p>
        </div>
        <button
          onClick={refreshMetrics}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          🔄 Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.key}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            rating={getMetricRating(metric.key, metric.value || 0)}
            description={metric.description}
            threshold={metric.threshold}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Performance Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• <strong>LCP:</strong> Optimize images, reduce server response time, eliminate render-blocking resources</li>
          <li>• <strong>INP:</strong> Reduce JavaScript execution time, implement code splitting, optimize event handlers</li>
          <li>• <strong>CLS:</strong> Set explicit dimensions for images/videos, avoid inserting content above existing content</li>
          <li>• <strong>FCP:</strong> Minimize critical resources, optimize CSS delivery, reduce server response time</li>
          <li>• <strong>TTFB:</strong> Optimize server performance, use CDN, implement caching strategies</li>
        </ul>
      </div>
    </div>
  );
};
