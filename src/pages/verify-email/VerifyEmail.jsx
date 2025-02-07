

import "./verify-email.css";
import { Link } from "react-router-dom";

export default function VerifyEmail() {

    const isEmailVerified = true;

    return (
        <section className="verify-email">
            {isEmailVerified ?
                <>
                    <i className="bi bi-patch-check verify-email-icon"></i>
                    <h1 className="verify-email-title">
                        Your Email Has Been Successfully Verified
                    </h1>
                    <Link to='/login' className="verify-email-link">
                        Go To Login Page
                    </Link>
                </>
                :
                <>
                    <h1 className="verify-email-not-found">
                        Not Found
                    </h1>
                </>
            }
        </section>
    )
}