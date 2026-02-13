import React from 'react';
import {PortableText, PortableTextComponents} from '@portabletext/react';
import {sanityConfig} from '../lib/sanityClient';

const refToImageUrl = (ref?: string) => {
  if (!ref) return undefined;
  const parts = ref.split('-');
  if (parts.length < 3) return undefined;
  const id = parts[1];
  const dim = parts[2];
  const format = parts[3] || 'jpg';
  return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dim}.${format}`;
};

const components: PortableTextComponents = {
  types: {
    image: ({value}) => {
      const url = refToImageUrl(value?.asset?._ref);
      if (!url) return null;
      return <img src={url} alt={value?.alt || ''} style={{maxWidth: '100%'}} />;
    },
  },
};

interface PortableTextRendererProps {
  value?: any;
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({value}) => {
  if (!value) return null;
  
  // If it's a string, render it directly
  if (typeof value === 'string') {
    return <span>{value}</span>;
  }
  
  // If it's an array but empty, return null
  if (Array.isArray(value) && value.length === 0) return null;
  
  // If it's an array, use PortableText
  if (Array.isArray(value)) {
    return <PortableText value={value} components={components} />;
  }
  
  // Fallback for other types
  return <span>{String(value)}</span>;
};
