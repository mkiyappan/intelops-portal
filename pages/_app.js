// import '../styles/globals.css';
import Script from 'next/script';
import Head from "next/head";
import Sidebar from "../components/Dashboard/sidebar";
import PageHeader from "../components/Dashboard/pageHeader";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>  
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <title>Optimizor UI</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <link href="../assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
        {/* <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script> */}
        <link href="../assets/css/soft-ui-dashboard-tailwind.css?v=1.0.1" rel="stylesheet" />
      </Head>
      <div className="m-0 font-sans text-base antialiased font-normal text-left leading-default dark:bg-slate-950 bg-gray-50 text-slate-500">
      <Sidebar/>
      <main className="relative h-full max-h-screen transition-all duration-200 ease-soft-in-out xl:ml-68 rounded-xl">
        <PageHeader/>
        <Script type="text/javascript"  src="../assets/js/plugins/perfect-scrollbar.min.js" />
        <Script type="text/javascript"  src="../assets/js/plugins/chartjs.min.js"/>
        <Script type="text/javascript"  src="../assets/js/plugins/threejs.js" strategy="beforeInteractive"/>
        <Script type="text/javascript"  src="../assets/js/plugins/orbit-controls.js" strategy="beforeInteractive"/>
        <Script type="text/javascript"  src="../assets/js/globe.js"/>
        <Script type="text/javascript"  src="../assets/js/plugins/kit-fonticon.js"/>
        <Script type="text/javascript"  src="../assets/js/soft-ui-dashboard-pro-tailwind.js?v=1.0.1" />
        <Component {...pageProps} />
      </main>
    </div>
    </>
  )
}

export default MyApp;
