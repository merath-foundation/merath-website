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
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return <PortableText value={value} components={components} />;
};
