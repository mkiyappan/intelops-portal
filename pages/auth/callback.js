import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const GetProfile = async (code) => {
    await fetch("/api/v1/auth/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    }).then((response) => {
      window.localStorage.setItem('USER_CODE', response.code);
      window.localStorage.setItem('USER_EMAIL', response.email);
    });
  }

  useEffect(() => {
    const { code } = router.query;
    if (!code) {
      return;
    }

    if (loaded) {
      return;
    }

    setLoaded(true);
    GetProfile(code);
  }, []);

  return (
    <>
      <div className="w-full h-full min-h-screen flex justify-center items-center flex-col">
        <Image src="/images/loading.gif" alt="loading" height="50px" width="50px" />
        <div className="text-center font-bold mt-8">
          <small>Setting up intelops ..</small>
        </div>
      </div>
    </>
  );
}