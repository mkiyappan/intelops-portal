import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RegisterTwoFA from "./registerTwoFA";
import { useRouter } from 'next/router';

const SignInForm = () => {
  const [qrCode, setQRCode] = useState('');
  const [challengeData, setChallengeData] = useState('');
  const[enableTwoFA, setEnableTwoFA] = useState(false);
  const[email, setEmail] = useState('');
  const router = useRouter();
  useEffect(()=> {
    const code = window.localStorage.getItem('USER_CODE') || '';
    const emailId = window.localStorage.getItem('USER_EMAIL') || '';
    if(code !== '' && emailId !=='') {
      router.push('/experiment');
    }
  }, []);
  const sendMagicLink = async() => {
    const response = await fetch(`/api/v1/auth/signin?type=magicLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailValue: email
      })
    });
    const userData = await response.json();
    if(userData?.success) {
      window.location.href = '/verify-email';
    }
  }
  const multiFactorAuth = async () => {
    // const email = req.body.email;
    const response = await fetch(`/api/v1/auth/signin?type=enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailValue: email
      })
    });
    const user = await response.json();
    if (user?.totp?.qr_code) {
      setQRCode(user.totp.qr_code);
      setEnableTwoFA(false);
      const responseData = await fetch(`/api/v1/auth/signin?type=challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          authId: user.id
        })
      });
      const userData = await responseData.json();
      setChallengeData(userData);
    }
  }
  const handlechange = (e) => {
    setEmail(e.target.value)
  }
  return (
    <main className="main-content ps">
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100 bg-gray-100">
            <div className="container">
            {!enableTwoFA && (
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                  <div className="card z-index-0">
                    <div className="card-header pb-0 text-start">
                      <h4 className="font-weight-bolder">Sign in</h4>
                      <p className="mb-0">Enter your email to sign in</p>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          name="email"
                          id="email"
                          required=""
                          onChange={(e) => handlechange(e)}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          name="password"
                          id="password"
                          required=""
                          onChange={(e) => handlechange(e)}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-info w-100 my-4 mb-2"
                          onClick={() => sendMagicLink()}
                        >
                          SIGN IN
                        </button>
                      </div>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Do not have an account? &nbsp;
                        <Link href="/sign-up">
                          <span className="text-primary text-gradient font-weight-bold cursor-pointer">
                            Create account
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div> 
                {/* Right */}
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                  <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center">
                    <Image
                      src="/images/pattern-lines.svg"
                      alt="pattern-lines"
                      className="position-absolute start-0"
                      layout="fill"
                      priority="empty"
                    />

                    <div className="position-relative">
                      <Image
                        src="/images/chat.webp"
                        alt="logo"
                        width="500"
                        height="370"
                      />

                    </div>

                    <h4 className="mt-5 text-white font-weight-bolder">
                      &#34;Attention is the new currency&#34;
                    </h4>
                    <p className="text-white">
                      The more effortless the writing looks, the more effort the
                      writer actually put into the process.
                    </p>
                  </div>
                </div>
              </div>)}
              {enableTwoFA && <RegisterTwoFA qrCode = {qrCode} challengeData = {challengeData}/>}
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};
export default SignInForm;
