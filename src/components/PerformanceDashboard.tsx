'use client';

import React, { useState, useEffect } from 'react';
import { WebVitalsDisplay } from './WebVitalsDisplay';

interface PerformanceMetrics {
  domLoadTime: number;
  windowLoadTime: number;
  resourceCount: number;
  totalResourceSize: number;
  averageResourceSize: number;
}

export const PerformanceDashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    domLoadTime: 0,
    windowLoadTime: 0,
    resourceCount: 0,
    totalResourceSize: 0,
    averageResourceSize: 0
  });

  useEffect(() => {
    const calculateResourceMetrics = () => {
      const resources = performance.getEntriesByType('resource');
      const totalSize = resources.reduce((acc, resource: any) => {
        return acc + (resource.transferSize || 0);
      }, 0);
      
      setMetrics({
        domLoadTime: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        windowLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        resourceCount: resources.length,
        totalResourceSize: totalSize,
        averageResourceSize: totalSize / resources.length || 0
      });
    };

    if (document.readyState === 'complete') {
      calculateResourceMetrics();
    } else {
      window.addEventListener('load', calculateResourceMetrics);
    }

    return () => window.removeEventListener('load', calculateResourceMetrics);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all duration-300"
        title="Performance Dashboard"
      >
        {isExpanded ? '📊' : '⚡'}
      </button>

      {/* Expanded Dashboard */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-96 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Performance Dashboard</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(metrics.domLoadTime)}
                </div>
                <div className="text-xs text-gray-600">DOM Load</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatTime(metrics.windowLoadTime)}
                </div>
                <div className="text-xs text-gray-600">Window Load</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {metrics.resourceCount}
                </div>
                <div className="text-xs text-gray-600">Resources</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatBytes(metrics.totalResourceSize)}
                </div>
                <div className="text-xs text-gray-600">Total Size</div>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Core Web Vitals</h4>
              <WebVitalsDisplay />
            </div>

            {/* Performance Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">🚀 Quick Wins</h4>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Enable gzip compression</li>
                <li>• Use WebP images with fallbacks</li>
                <li>• Implement lazy loading</li>
                <li>• Minify CSS/JS files</li>
                <li>• Use CDN for static assets</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
