import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import styles from '../assets/styles/Form.module.css';

const RegisterForm = () => {

    return (
        <Layout>
            <Head>
            <title> SignUp Form</title>
            </Head>
            <section className={styles.secton_custom}>
            <div>
                <h1 className={styles.title}>Sign Up</h1>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5'>
                <label className={styles.label_text}>User Name</label>
                <div className={styles.input_group}>
                    <input 
                    type="text"
                    name='username'
                    placeholder='User Name'
                    className={styles.input_text}
                    />
                </div>
                    <label className={styles.label_text}>Your Email</label>
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    />
                </div>
                    <label className={styles.label_text}>Mobile Number</label>
                <div className={styles.input_group}>
                    <input 
                    type="number"
                    name='mobileno'
                    placeholder='Mobile Number'
                    className={styles.input_text}
                    />
                </div>
                
                <label className={styles.label_text}>Password</label>
                <div className={styles.input_group}>
                    <input 
                    type="password"
                    name='password'
                    placeholder='Password'
                    className={styles.input_text}
                    />
                </div>
                
                <label className={styles.label_text}>Confirm Password</label>
                <div className={styles.input_group}>
                    <input 
                    type="password"
                    name='cpassword'
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    />
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        SIGN UP
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 mt-4'>
                Already have an Account? <Link href={'/SigninForm'} className='text-blue-700'>Sign In</Link>
            </p>
        </section>
        </Layout>
    )

}
export default RegisterForm