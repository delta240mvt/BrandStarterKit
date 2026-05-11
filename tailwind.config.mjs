import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        teal: 'var(--teal)',
        violet: 'var(--violet)',
        gold: 'var(--gold)',
      },
      fontSize: {
        hero: 'var(--text-hero)',
        xl2: 'var(--text-xl)',
        lg2: 'var(--text-lg)',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['Courier Prime', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
