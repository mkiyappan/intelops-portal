
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter(); 
  return (
    <>
    <footer className="pt-4">
        <div className="w-full px-6 mx-auto">
        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
            <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
            <div className="text-sm leading-normal text-center copyright text-slate-500 lg:text-left">
                © Copyright 2022-2023 <i className="fa fa-heart"></i> by Intellops
            </div>
            </div>
        </div>
        </div>
    </footer>
    </>
  )
}
export default Footer;