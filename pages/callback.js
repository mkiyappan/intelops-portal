import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const callbackURL = router.asPath;
    const parseURL = callbackURL.split('?')[1].split('&');
    const email = parseURL[0].split('=')[1];
    const code = parseURL[1].split('=')[1];
    
    if (email && code) {
      window.localStorage.setItem('USER_CODE', code);
      window.localStorage.setItem('USER_EMAIL', email);
      router.push('/experiment')
    } else {
      router.push('/signin-error');
      //setTimeout(() => router.push('/signin-error'), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full h-full min-h-screen flex justify-center items-center flex-col">
        <Image src="/loading.gif" alt="loading" height="50px" width="50px" />
        <div className="text-center font-bold mt-8">
          <small>Setting up intelops ..</small>
        </div>
      </div>
    </>
  );
}