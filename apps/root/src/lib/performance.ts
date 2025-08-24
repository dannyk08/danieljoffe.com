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
          entries.forEach(entry => {
            const layoutShiftEntry = entry as PerformanceEntry & {
              value?: number;
              hadRecentInput?: boolean;
            };
            if (
              layoutShiftEntry &&
              !layoutShiftEntry.hadRecentInput &&
              typeof layoutShiftEntry.value === 'number'
            ) {
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
    if (
      typeof window !== 'undefined' &&
      typeof (window as Window).gtag === 'function'
    ) {
      (window as Window).gtag?.('event', 'web_vitals', {
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

export const measurePerformance = () => {
  if (typeof window === 'undefined') return;

  // Measure Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);

      // Send to analytics if needed
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'LCP', {
          value: Math.round(lastEntry.startTime),
          event_category: 'Web Vitals',
        });
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const fidEntry = entry as PerformanceEventTiming;
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);

        if (window.gtag && typeof window.gtag === 'function') {
          window.gtag('event', 'FID', {
            value: Math.round(fidEntry.processingStart - fidEntry.startTime),
            event_category: 'Web Vitals',
          });
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const layoutShiftEntry = entry as PerformanceEntry & {
          value?: number;
          hadRecentInput?: boolean;
        };
        if (
          layoutShiftEntry &&
          !layoutShiftEntry.hadRecentInput &&
          typeof layoutShiftEntry.value === 'number'
        ) {
          clsValue += layoutShiftEntry.value;
        }
      });
      console.log('CLS:', clsValue);

      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'CLS', {
          value: Math.round(clsValue * 1000) / 1000,
          event_category: 'Web Vitals',
        });
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Measure page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      console.log('Page Load Time:', loadTime);

      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'page_load_time', {
          value: Math.round(loadTime),
          event_category: 'Performance',
        });
      }
    }
  });
};

export const measureInteraction = (element: string, action: string) => {
  if (typeof window === 'undefined') return;

  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`${element} ${action} took:`, duration);

    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', 'interaction_time', {
        value: Math.round(duration),
        event_category: 'Performance',
        event_label: `${element}_${action}`,
      });
    }
  };
};

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
