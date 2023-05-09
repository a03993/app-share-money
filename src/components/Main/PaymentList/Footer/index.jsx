import React from 'react';
import Style from './Footer.module.css'

function Footer() {
    const paymentListLink = 'http://localhost:3000/sharemoney/paymentlist'

    return(
        <footer>
            <div className={Style.content}>
                <h3>Click below to copy the link and send to your debtors.</h3>
            </div>
            <div className={Style.link}>
                <h3>{paymentListLink}</h3>
            </div>
        </footer>
    )
}

export default Footer