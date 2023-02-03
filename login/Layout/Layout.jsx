import styles from '../assets/styles/Layout.module.css';

const Layout = ({ children }) => {

    return (
        <div className={styles.bgStyle}>
            <div className={styles.gridStyle}>
                <div className={styles.imgStyle}>
                    <div className={styles.logoImg}></div>
                </div>
                <div className="right flex flex-col justify-evenly bg-gray-200 rounded-r-3xl">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Layout