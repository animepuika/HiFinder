// Simple in-memory rate limiter (per-IP, sliding window)
const buckets: Map<string, { timestamps: number[] }> = new Map();

export function getClientKey(req: Request) {
  const hdr = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
  const ip = hdr.split(',')[0]?.trim() || 'unknown';
  const ua = req.headers.get('user-agent') || '';
  return `${ip}:${ua}`;
}

export function rateLimitOk(key: string, now = Date.now()) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
  const max = Number(process.env.RATE_LIMIT_MAX || 60);
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }
  const cutoff = now - windowMs;
  bucket.timestamps = bucket.timestamps.filter(t => t > cutoff);
  if (bucket.timestamps.length >= max) return false;
  bucket.timestamps.push(now);
  return true;
}
