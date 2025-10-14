import type { VibeTag } from '../types';
import { haversineMeters } from './jitter';

const allTags: VibeTag[] = ['chill','sunset','study','nature','romantic','coffee','view','quiet','cozy','music','social'];

export function cosineSimilarity(user: VibeTag[], spot: VibeTag[]) {
  const a = allTags.map(t => (user.includes(t) ? 1 : 0));
  const b = allTags.map(t => (spot.includes(t) ? 1 : 0));
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

export function proximityGuard(userLoc: { latitude: number; longitude: number } | null, spotLoc: { latitude: number; longitude: number }, maxMeters = 20_000) {
  if (!userLoc) return true;
  return haversineMeters(userLoc, spotLoc) <= maxMeters;
}
