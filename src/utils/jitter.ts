export function jitterCoordinate(lat: number, lng: number, maxMeters = 50) {
  const metersPerDegreeLat = 111_320;
  const metersPerDegreeLng = Math.cos((lat * Math.PI) / 180) * 111_320;
  const rand = () => (Math.random() - 0.5) * 2; // -1..1
  const dLat = (rand() * maxMeters) / metersPerDegreeLat;
  const dLng = (rand() * maxMeters) / metersPerDegreeLng;
  return { latitude: lat + dLat, longitude: lng + dLng };
}

export function haversineMeters(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const R = 6371e3;
  const phi1 = (a.latitude * Math.PI) / 180;
  const phi2 = (b.latitude * Math.PI) / 180;
  const dPhi = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLambda = ((b.longitude - a.longitude) * Math.PI) / 180;
  const s = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
