'use client';

interface PerformanceMetrics {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
  TTI?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initObservers();
    }
  }

  private initObservers() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(
            entry => entry.name === 'first-contentful-paint'
          );
          if (fcpEntry) {
            this.metrics.FCP = fcpEntry.startTime;
            this.logMetric('FCP', fcpEntry.startTime);
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            this.metrics.LCP = lastEntry.startTime;
            this.logMetric('LCP', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            // 'processingStart' is not on PerformanceEntry, so cast to PerformanceEventTiming
            const event = entry as PerformanceEventTiming;
            if (
              typeof event.processingStart === 'number' &&
              typeof event.startTime === 'number'
            ) {
              this.metrics.FID = event.processingStart - event.startTime;
              this.logMetric('FID', this.metrics.FID);
            }
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver(list => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const layoutShiftEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
            if (layoutShiftEntry && !layoutShiftEntry.hadRecentInput && typeof layoutShiftEntry.value === 'number') {
              clsValue += layoutShiftEntry.value;
            }
          });
          this.metrics.CLS = clsValue;
          this.logMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }

    // Time to First Byte
    if ('performance' in window) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.TTFB = navigation.responseStart - navigation.requestStart;
        this.logMetric('TTFB', this.metrics.TTFB);
      }
    }
  }

  private logMetric(name: string, value: number) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}:`, value.toFixed(2));
    }

    // Send to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(name, value);
    }
  }

  private sendToAnalytics(name: string, value: number) {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        non_interaction: true,
      });
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logCustomMetric(name: string, value: number) {
    this.logMetric(name, value);
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Hook for React components
export const usePerformanceMonitor = () => {
  return performanceMonitor;
};
