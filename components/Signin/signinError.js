import Image from "next/image";
import Link from "next/link";

const SignInError = () => {
  return (
    <main className="main-content ps ps--active-y">
      <main className="main-content mt-0">
        <div>
          <section className="min-vh-100 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 my-auto">
                  <h1 className="display-1 text-bolder text-gradient text-warning fadeIn1 fadeInBottom mt-5">
                    Error
                  </h1>
                  <h2 className="fadeIn3 fadeInBottom opacity-8">
                    Link seems to be expired or invalid.
                  </h2>
                  <p className="lead opacity-6 fadeIn2 fadeInBottom">
                    We suggest you to go to the signin page and try logging in
                    again.
                  </p>
                  <Link href="/sign-in">
                    <span className="btn bg-gradient-warning mt-4 fadeIn2 fadeInBottom">
                      Go to Sign in
                    </span>
                  </Link>
                </div>
                <div className="col-lg-7 my-auto">
                  <Image
                    className="w-100 fadeIn1 fadeInBottom"
                    src="/images/error.webp"
                    alt="error"
                    height="500px"
                    width="600px"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </main>
  );
};

export default SignInError;
