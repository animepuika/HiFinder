import { NextResponse } from 'next/server';
import { z } from 'zod';
import { shouldShow420 } from '../../../src/utils/geofence';

const SpotSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  busyLevel: z.enum(['low','medium','high']).optional(),
  accessibility: z.object({ wheelchair: z.boolean().optional(), restroom: z.boolean().optional() }).optional(),
  vibes: z.array(z.string()),
  latitude: z.number(),
  longitude: z.number(),
  is420: z.boolean().optional(),
});

function get420Allowed(req: Request) {
  const headers = new Headers(req.headers);
  const optedIn = headers.get('x-420-optin') === 'true';
  const ageHeader = headers.get('x-age');
  const ageYears = ageHeader ? Number(ageHeader) : null;
  const country = headers.get('x-country');
  const allowlistCsv = process.env.REGION_ALLOWLIST;
  return shouldShow420({ optedIn, ageYears, countryCode: country, allowlistCsv });
}

export async function GET(req: Request) {
  const { rateLimitOk, getClientKey } = await import('../../../src/utils/rateLimit');
  const key = getClientKey(req);
  if (!rateLimitOk(key)) return NextResponse.json({ error: 'Rate limit' }, { status: 429 });
  const allow420 = get420Allowed(req);
  return NextResponse.json({ spots: [], allow420 });
}

export async function POST(req: Request) {
  const { rateLimitOk, getClientKey } = await import('../../../src/utils/rateLimit');
  const key = getClientKey(req);
  if (!rateLimitOk(key)) return NextResponse.json({ error: 'Rate limit' }, { status: 429 });
  const allow420 = get420Allowed(req);
  const body = await req.json().catch(() => null);
  const parsed = SpotSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  if (parsed.data.is420 && !allow420) {
    return NextResponse.json({ error: '420 content not allowed in your context' }, { status: 403 });
  }
  // TODO: persist to DB
  return NextResponse.json({ ok: true, spot: parsed.data });
}
