'use client';
import React from 'react';

export default function Map() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  React.useEffect(() => {
    if (!ref.current || !token) return;
    (async () => {
      const mapboxgl = (await import('mapbox-gl')).default;
      mapboxgl.accessToken = token;
      const map = new mapboxgl.Map({
        container: ref.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.4194, 37.7749],
        zoom: 12,
      });
      return () => map.remove();
    })();
  }, [token]);

  if (!token) return <div style={{ padding: 12 }}>Set NEXT_PUBLIC_MAPBOX_TOKEN</div>;
  return <div ref={ref} style={{ width: '100%', height: '70vh' }} />;
}
