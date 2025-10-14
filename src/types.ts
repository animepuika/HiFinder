export type VibeTag =
  | 'chill' | 'sunset' | 'study' | 'nature' | 'romantic'
  | 'coffee' | 'view' | 'quiet' | 'cozy' | 'music' | 'social';

export interface Spot {
  id: string;
  title: string;
  description?: string;
  rating?: number; // 1-5
  busyLevel?: 'low' | 'medium' | 'high';
  accessibility?: { wheelchair?: boolean; restroom?: boolean };
  creatorId: string;
  latitude: number;
  longitude: number;
  is420?: boolean;
  vibes: VibeTag[];
  photos?: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  spotId: string;
  userId: string;
  rating: number;
  text?: string;
  photos?: string[];
  createdAt: string;
}
