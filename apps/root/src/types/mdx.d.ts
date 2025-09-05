declare module '*.mdx' {
  import type { ComponentProps, ComponentType, ReactElement } from 'react';

  export interface MDXMetadata {
    title: string;
    description: string;
    tags: string[];
    author: string;
    created: string;
    updated: string;
  }

  export const metadata: MDXMetadata;

  const MDXComponent: ComponentType<ComponentProps<'div'>>;
  export default MDXComponent;
}

declare module 'mdx/types' {
  export interface MDXComponents {
    [key: string]: React.ComponentType<any>;
  }
}
