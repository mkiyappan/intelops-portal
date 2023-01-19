import Image from "next/image";
import { useState } from "react";

const RegisterTwoFA = ({ qrCode, challengeData }) => {
  const [otpData, setOtpData] = useState('');

  const handlechange = (e) => {
    setOtpData(e.target.value)
  }

  const enterOTP = async () => {
    const response = await fetch(`/api/v1/auth/signin?type=verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        authId: challengeData.id,
        otp: otpData
      })
    });

    const dataVa = await response.json();
    if (dataVa.valid) {
      window.localStorage.setItem('sessionData', btoa(dataVa.challenge))
      window.location.href = '/experiment';
    }

  }
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
        <div className="card z-index-0">
          <div className="card-header pb-0 text-start">
            <h6 className="font-weight-bolder">Register Two Factor Authenticator</h6>
            <p className="mb-4 text-sm mx-auto">Use a one-time password authenticator on your mobile device or computer to enable two factor authentication(2FA).</p>
            <p className="mb-4 text-sm mx-auto">We recommend cloud based mobile authenticator apps such as Authy, Duo Mobile and Last Pass. They can restore access if you loss your hardware device</p>
          </div>
          <div className="card-body">
            <div className="twofactorQRCode">
              <Image src={qrCode} alt="star" width="150" height="150"></Image>
            </div>

            <p className="mb-4 text-sm mx-auto">
              Can`t scan the code ? Try manual entry using the key below
            </p>
            <p className="mb-4 text-sm mx-auto">Authenticator Pin Code:</p>

            <input
              type="code"
              className="form-control"
              placeholder="Enter Authenticator Code"
              aria-label="Code"
              name="code"
              id="code"
              required=""
              onChange={(e) => handlechange(e)}
            />
            <button
              type="submit"
              className="btn bg-gradient-info w-100 my-4 mb-2"
              onClick={() => enterOTP()}
            >
              Enter OTP
            </button>
          </div>
        </div>
      </div>
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
              width="500px"
              height="370px"
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
    </div>
  );
};
export default RegisterTwoFA;
