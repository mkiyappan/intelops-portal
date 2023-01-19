import Image from "next/image";
import Link from "next/link";

export default function SignUpForm() {
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
                      <h4 className="font-weight-bolder">Sign up</h4>
                      <p className="mb-0">Enter your information to register</p>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Organization name"
                            aria-label="Organization name"
                            name="org_name"
                            id="org_name"
                            required=""
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Admin Email"
                            aria-label="Email"
                            name="email"
                            id="email"
                            required=""
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Phone Number(Optional)"
                            aria-label="Phone Number"
                            name="phone"
                            id="phone"
                            required=""
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-info w-100 my-4 mb-2"
                          >
                            SIGN UP
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Already have an account? &nbsp;
                        <Link href="/sign-in">
                          <span className="text-primary text-gradient font-weight-bold cursor-pointer">
                            Sign in
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
                      height="960px"
                      width="1920px"
                    />

                    <div className="position-relative">
                      <Image
                        src="/images/rocket-white.png"
                        alt="logo"
                        width="500px"
                        height="370px"
                      />
                    </div>

                    <h4 className="mt-5 text-white font-weight-bolder">
                      &#34;Your journey starts here&#34;
                    </h4>
                    <p className="text-white">
                      Just as it takes a company to sustain a product, it takes
                      a community to sustain a protocol.
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
}
