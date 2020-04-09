import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false, loading: () => (
      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        Cargando…
      </div>
    ), }
);

export default function Index() {
   return <Map/>;
};
