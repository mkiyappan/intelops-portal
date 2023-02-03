import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import styles from '../assets/styles/Form.module.css';

const LoginForm = () => {

    return (
        <Layout>
            <Head>
                <title> SignIn Form</title>
            </Head>
            <section className={styles.secton_custom}>
                <div>
                    <h1 className={styles.title}>Sign in</h1>
                </div>

                {/* form */}
                <form className='flex flex-col gap-5'>
                    <label className={styles.label_text}>Your Email</label>
                    <div className={styles.input_group}>
                        <input
                            type="email"
                            name='email'
                            placeholder='Email'
                            className={styles.input_text}
                        />
                    </div>
                    <label className={styles.label_text}>Password</label>
                    <div className={styles.input_group}>
                        <input
                            type="password"
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                        />
                    </div>

                    {/* login buttons */}
                    <div className="input-button">
                        <button type='submit' className={styles.button}>
                            SIGN IN
                        </button>
                    </div>
                </form>

                {/* bottom */}
                <p className='text-center text-gray-400 mt-4'>
                    Not a Member? <Link href={'/SignupForm'} className = "text-blue-700">Sign Up</Link>
                </p>
            </section>
        </Layout>
    )

}
export default LoginForm