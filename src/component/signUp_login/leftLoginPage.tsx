
import styles from './LoginForm.module.css';


function LeftLoginPage() {
    
    return(
        <div className="left flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className={`m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat ${styles["left-image"]}`}>
                        </div>
                    </div>
    )
}

export default LeftLoginPage;