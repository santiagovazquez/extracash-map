import React from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false, loading: () => (
      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        Cargando…
      </div>
    ), }
);
const pageTitle = 'Mapa con puntos Extra Cash (Visa) en CABA';
const pageDescription = 'Encontrá el punto extra cash más cerca de tu domicilio y evitá ir al cajero';
const keywords = 'extra,cash,efectivo,red,cajero,mapa,puntos,visa,debito,tarjeta,retiro,dinero,plata,evitar,banco';
const webURL = 'https://extracash-map.svazquez.now.sh';

export default function Index() {
   return (
     <>
       <Head>
         <meta name="google-site-verification" content="ABgOjF6kiEqelusHuGukbWql419PGXFE_zikhe_9Vy4" />
         <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
         <meta httpEquiv="Content-Language" content="es" />
         <title>{pageTitle}</title>
         <meta name="title" content={pageTitle} />
         <meta httpEquiv="title" content={pageTitle} />
         <meta name="DC.title" content={pageTitle} />
         <meta name="description" lang="es" content={pageDescription} />
         <meta httpEquiv="DC.Description" content={pageDescription} />
         <meta httpEquiv="DC.subject" content={pageDescription} />
         {/*5 o 6 keywords importantes*/}
         <meta name="keywords" content={keywords} />
         <meta httpEquiv="DC.Keywords" content={keywords} />

         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
         <meta property="og:title" content={pageTitle} />
         <meta property="og:description" content={pageDescription} />
         <meta property="og:image" content="/public/assets/preview.png" />
         <meta property="og:type" content="website" />
         <meta property="og:url" content={webURL} />
       </Head>
       <Map/>
     </>
   );
};
