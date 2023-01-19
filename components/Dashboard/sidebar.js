import {
  AdjustmentsIcon,
  ChartPieIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <aside mini="false" className="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto transition-all duration-200 -translate-x-full bg-white border-0 shadow-none xl:ml-4 dark:bg-gray-950 ease-soft-in-out z-990 max-w-64 rounded-2xl xl:translate-x-0 xl:bg-transparent" id="sidenav-main">
        <div className="h-16 mx-6 my-2">
          <Link href="/dashboard">
            <Image src="/images/logo.jpeg" className="navbar-brand-img" alt="main_logo" height={40} width={150} />
          </Link>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
        <div className="items-center block w-full h-auto grow basis-full" id="sidenav-collapse-main">
          <ul className="flex flex-col pl-0 mb-0 list-none">
            <li className="mt-0.5 w-full">
              <Link collapse_trigger="primary" href="javascript:void(0);" className="ease-soft-in-out text-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-controls="pagesExamples" role="button" aria-expanded="false">
                <div className="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                  <Image src="/images/optimizor.png" className="navbar-brand-img" alt="main_logo" height={30} width={30} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Optimizor</span>
              </Link>
              <div className="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="pagesExamples">
                <ul className="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full">
                    <Link href="/experiment" collapse_trigger="secondary" className="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-expanded="false" >
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> P </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Experiment <b className="caret"></b></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="mt-0.5 w-full">
              <Link collapse_trigger="primary" href="javascript:void(0);" className="ease-soft-in-out text-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-controls="applicationsExamples" role="button" aria-expanded="false">
                <div className="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                  <ChartPieIcon />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dash</span>
              </Link>
              <div className="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="applicationsExamples">
                <ul className="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full">
                    <Link className="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80" href="./pages/applications/kanban.html">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> K </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Optimizor Results </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="mt-0.5 w-full">
              <Link collapse_trigger="primary" href="javascript:void(0);" className="ease-soft-in-out text-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-controls="ecommerceExamples" role="button" aria-expanded="false">
                <div className="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                  <UserGroupIcon />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">User Management</span>
              </Link>
              <div className="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="ecommerceExamples">
                <ul className="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full">
                    <Link className="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80" href="./pages/ecommerce/overview.html">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> O </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Users </span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link collapse_trigger="secondary" className="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-expanded="false" href="javascript:void(0);">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> P </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Groups <b className="caret"></b></span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link collapse_trigger="secondary" className="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-expanded="false" href="javascript:void(0);">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> O </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Roles <b className="caret"></b></span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link className="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80" href="./pages/ecommerce/referral.html">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> R </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Permissions </span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link className="ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80" href="./pages/ecommerce/referral.html">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> R </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Labels </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="mt-0.5 w-full">
              <Link collapse_trigger="primary" href="javascript:void(0);" className="ease-soft-in-out text-sm py-2.7 active after:ease-soft-in-out after:font-awesome-5-free my-0 mx-4 flex items-center whitespace-nowrap px-4 font-medium text-slate-500 shadow-none transition-colors after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-controls="authExamples" role="button" aria-expanded="false">
                <div className="stroke-none shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                  <AdjustmentsIcon />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Pre-requisites</span>
              </Link>
              <div className="h-auto overflow-hidden transition-all duration-200 ease-soft-in-out max-h-0" id="authExamples">
                <ul className="flex flex-wrap pl-4 mb-0 ml-6 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full">
                    <Link collapse_trigger="secondary" className="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-expanded="false" href="javascript:void(0);">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> S </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Git integration <b className="caret"></b></span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link collapse_trigger="secondary" className="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-expanded="false" href="javascript:void(0);">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> S </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Container Registry <b className="caret"></b></span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link collapse_trigger="secondary" className="after:ease-soft-in-out after:font-awesome-5-free ease-soft-in-out py-1.6 ml-5.4 pl-4 text-sm before:-left-4.5 before:h-1.25 before:w-1.25 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 font-medium text-slate-800/50 shadow-none transition-colors before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-3xl before:bg-slate-800/50 before:content-[''] after:ml-auto after:inline-block after:font-bold after:text-slate-800/50 after:antialiased after:transition-all after:duration-200 after:content-['\f107'] dark:text-white dark:opacity-60 dark:before:bg-white dark:before:opacity-80 dark:after:text-white/50 dark:after:text-white" aria-expanded="false" href="javascript:void(0);">
                      <span className="w-0 text-center transition-all duration-200 opacity-0 pointer-events-none ease-soft-in-out"> R </span>
                      <span className="transition-all duration-100 pointer-events-none ease-soft"> Opti Agent <b className="caret"></b></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
