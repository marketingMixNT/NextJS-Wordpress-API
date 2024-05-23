import React from 'react';
import Link from 'next/link';

export default function MoreApartaments({ apartaments }) {
  return (
    <section>
      <h2>Więcej apartamentów</h2>
      <ul>
        {apartaments.map(({ node }) => (
          <li key={node.slug}>
            <Link as={`/apartamenty/${node.slug}`} href="/apartamenty/[slug]">
              <a>{node.apartamentyFields.nazwa}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
