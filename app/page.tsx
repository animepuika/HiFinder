import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../src/components/Map'), { ssr: false });
import SpotForm from '../src/components/SpotForm';

export default function Page(){
  return (
    <div className="grid gap-6">
      <section className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Map</h2>
        <Map />
      </section>
      <section className="card p-4">
        <h2 className="text-lg font-semibold mb-4">Add a Spot</h2>
        <SpotForm />
      </section>
    </div>
  );
}
