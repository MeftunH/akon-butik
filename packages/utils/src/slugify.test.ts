import { describe, expect, it } from 'vitest';

import { slugify } from './slugify.js';

describe('slugify', () => {
  it('lowercases and dasherizes', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('transliterates Turkish characters', () => {
    expect(slugify('Şık Çiçek Üzüm İğne Ördek')).toBe('sik-cicek-uzum-igne-ordek');
  });

  it('strips punctuation', () => {
    expect(slugify('foo, bar! / baz?')).toBe('foo-bar-baz');
  });

  it('truncates to 80 chars', () => {
    const long = 'a'.repeat(200);
    expect(slugify(long).length).toBe(80);
  });
});
