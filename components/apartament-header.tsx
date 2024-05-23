import React from 'react';

export default function ApartamentHeader({ title, coverImage, description, capacity, size }) {
  return (
    <div>
      <h1>{title}</h1>
      {coverImage && <img src={coverImage.node.uri} alt={title} />}
      <p>{description}</p>
      <p>Liczba osób: {capacity}</p>
      <p>Metraż: {size} m²</p>
    </div>
  );
}