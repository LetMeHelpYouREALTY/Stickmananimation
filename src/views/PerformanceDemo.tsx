'use client';

import React from 'react';
import { WebVitalsDisplay } from '../components/WebVitalsDisplay';
import { useWebVitals, type WebVitalsData } from '../hooks/useWebVitals';

type VitalMetricKey = 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB';

export default function PerformanceDemo() {
  const { vitals, refreshMetrics, getMetricRating } = useWebVitals();

  const simulatePerformanceIssues = () => {
    // Simulate a long task
    const start = performance.now();
    while (performance.now() - start < 100) {
      // Block the main thread for 100ms
    }
    
    // Simulate layout shift
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.top = '0';
    testElement.style.left = '0';
    testElement.style.width = '100px';
    testElement.style.height = '100px';
    testElement.style.backgroundColor = 'red';
    testElement.style.zIndex = '9999';
    document.body.appendChild(testElement);
    
    setTimeout(() => {
      testElement.style.top = '50px';
      testElement.style.left = '50px';
    }, 100);
    
    setTimeout(() => {
      document.body.removeChild(testElement);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Core Web Vitals Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This page demonstrates real-time monitoring of Google's Core Web Vitals metrics. 
            Watch how your interactions affect performance scores and learn about optimization strategies.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {(['LCP', 'INP', 'CLS', 'FCP', 'TTFB'] as VitalMetricKey[]).map((metric) => {
            const metricData = vitals[metric as keyof WebVitalsData] as import('web-vitals').Metric | undefined;
            const rating = metricData ? getMetricRating(metric, metricData.value) : 'unknown';
            
            return (
              <div key={metric} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric}
                </div>
                <div className="text-lg text-gray-600 mb-2">
                  {metricData ? metricData.value.toFixed(2) : '--'}
                </div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  rating === 'good' ? 'bg-green-100 text-green-800' :
                  rating === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                  rating === 'poor' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {rating.replace('-', ' ')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo</h2>
          <p className="text-gray-600 mb-4">
            Use these buttons to simulate different performance scenarios and see how they affect your Core Web Vitals scores.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={simulatePerformanceIssues}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🐌 Simulate Performance Issues
            </button>
            
            <button
              onClick={refreshMetrics}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Refresh Metrics
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              🚀 Reload Page
            </button>
          </div>
        </div>

        {/* Detailed Metrics Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Metrics</h2>
          <WebVitalsDisplay />
        </div>

        {/* Performance Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Performance Optimization Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Immediate Actions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Enable gzip compression on your server</li>
                <li>• Optimize and compress images (WebP format)</li>
                <li>• Minify CSS, JavaScript, and HTML files</li>
                <li>• Use a CDN for static assets</li>
                <li>• Implement lazy loading for images</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Advanced Optimizations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Implement code splitting and tree shaking</li>
                <li>• Use resource hints (preload, prefetch)</li>
                <li>• Optimize critical rendering path</li>
                <li>• Implement service worker for caching</li>
                <li>• Use modern image formats (AVIF, WebP)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-time Monitoring Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Real-time Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What's Being Monitored</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>LCP:</strong> Largest content element visibility</li>
                <li>• <strong>INP:</strong> User interaction response time</li>
                <li>• <strong>CLS:</strong> Visual layout stability</li>
                <li>• <strong>FCP:</strong> First content paint</li>
                <li>• <strong>TTFB:</strong> Server response time</li>
                <li>• <strong>Long Tasks:</strong> Main thread blocking</li>
                <li>• <strong>Layout Shifts:</strong> Visual instability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Console Output</h3>
              <p className="text-gray-700 mb-3">
                Open your browser's Developer Tools and check the Console tab to see detailed performance metrics and actionable insights.
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono">
                <div>🚀 Web Vital: LCP</div>
                <div>Value: 2500.00</div>
                <div>Rating: good</div>
                <div>✅ LCP is performing well!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
