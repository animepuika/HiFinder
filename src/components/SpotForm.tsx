'use client';
import React from 'react';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  busyLevel: z.enum(['low','medium','high']).optional(),
  is420: z.boolean().optional(),
});

export default function SpotForm() {
  const ref = React.useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    const data = Object.fromEntries(new FormData(ref.current).entries());
    const parsed = schema.safeParse({
      title: data.title,
      description: (data as any).description || undefined,
      rating: (data as any).rating,
      busyLevel: (data as any).busyLevel || undefined,
      is420: (data as any).is420 === 'on',
    });
    if (!parsed.success) {
      alert('Invalid form');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, vibes: [], latitude: 0, longitude: 0 }),
      });
      const json = await res.json();
      alert(res.ok ? 'Spot submitted' : json.error || 'Error');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form ref={ref} onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
      <input name="title" placeholder="Title" required />
      <textarea name="description" placeholder="Description" />
      <input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" />
      <select name="busyLevel">
        <option value="">Busy level</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label><input type="checkbox" name="is420" /> 420-friendly</label>
      <button disabled={submitting} type="submit">{submitting ? 'Submitting...' : 'Add Spot'}</button>
    </form>
  );
}
