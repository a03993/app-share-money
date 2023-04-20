import React, { useState } from 'react';
import Home from './Home'
import PaymentList from './PaymentList'
import Result from './Result'

function Main( {currentPage, setCurrentPage} ) {


    const [paymentData, setPaymentData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    // local Storage -> 不需再重新登入
    localStorage.setItem('paymentData' ,JSON.stringify(paymentData));

    // 取出 local storage 的值
    // const myData = JSON.parse(localStorage.getItem('paymentData'));
    // console.log('local Storage: ',myData)

    return(
        <main>
            {currentPage === 'Home' && <Home paymentData={paymentData} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            {currentPage === 'List' && <PaymentList paymentData={paymentData} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />}
            {currentPage === 'Result' && <Result paymentData={paymentData} totalPrice={totalPrice} />}     
        </main>
    )
}

export default Main