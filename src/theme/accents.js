// Accent colour classes shared by the Academic and GitHub sections.
// Class names are written out in full so Tailwind can find them.
// amber = mechanical, cyan = software (same meaning as the career timeline),
// teal = the site's own accent, neutral = uncategorised.
export const ACCENTS = {
  amber: {
    dot: 'bg-amber-500',
    icon: 'text-amber-500',
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    hover: 'hover:border-amber-500/60 hover:shadow-[0_0_18px_rgba(245,158,11,0.25)]'
  },
  cyan: {
    dot: 'bg-cyan-500',
    icon: 'text-cyan-500',
    text: 'text-cyan-700 dark:text-cyan-300',
    badge: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    hover: 'hover:border-cyan-500/60 hover:shadow-[0_0_18px_rgba(6,182,212,0.25)]'
  },
  teal: {
    dot: 'bg-teal',
    icon: 'text-teal',
    text: 'text-teal',
    badge: 'border-teal/50 bg-teal/10 text-teal',
    hover: 'hover:border-teal/60 hover:shadow-[0_0_18px_rgb(var(--color-teal)/0.25)]'
  },
  neutral: {
    dot: 'bg-muted',
    icon: 'text-muted',
    text: 'text-muted',
    badge: 'border-border bg-navy-light text-muted',
    hover: 'hover:border-muted/60 hover:shadow-md'
  }
}
