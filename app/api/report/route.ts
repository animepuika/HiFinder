import { NextResponse } from 'next/server';
import { z } from 'zod';

const ReportSchema = z.object({
  spotId: z.string(),
  reason: z.string().min(3),
});

export async function POST(req: Request) {
  const { rateLimitOk, getClientKey } = await import('../../../src/utils/rateLimit');
  const key = getClientKey(req);
  if (!rateLimitOk(key)) return NextResponse.json({ error: 'Rate limit' }, { status: 429 });
  const body = await req.json().catch(() => null);
  const parsed = ReportSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  return NextResponse.json({ ok: true });
}, { status: 400 });
  return NextResponse.json({ ok: true });
}

