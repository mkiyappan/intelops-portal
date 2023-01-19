import Image from "next/image";

const CheckEmail = () => {
  return (
    <main className="main-content ps">
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100 bg-gray-100">
            <div className="container">
              <div className="row">
                {/* Left */}
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                  <div className="card z-index-0">
                    <div className="card-header pb-0 text-start">
                      <h4 className="font-weight-bolder">Check your email</h4>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        We have sent you a magic link to login, please check
                        your email.
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
                      height="960px"
                      width="1920px"
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
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default CheckEmail;
