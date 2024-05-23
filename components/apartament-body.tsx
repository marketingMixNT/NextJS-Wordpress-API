import React from 'react';

export default function ApartamentBody({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
