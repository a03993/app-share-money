import React, { useState } from 'react';
import uuid from 'react-uuid';
import Home from './Home'
import PaymentList from './PaymentList'
import Result from './Result'

function Main( {currentPage, setCurrentPage} ) {

    // 設定 paymentData 原本就存有一比資料 (目前是假資料)
    const [paymentData, setPaymentData] = useState([
        {
            id: uuid,
            name: "tina",
            color: "#BFAD76",
            payment: [
                {
                    price: 750,
                    item: 'MRT',
                    id: uuid
                },
                {
                    price: 120,
                    item: 'bus',
                    id: uuid
                },
                {
                    price: 130,
                    item: 'taxi',
                    id: uuid
                }
            ]
        },
        {
            id: uuid,
            name: "barney",
            color: "#E7D3A7",
            payment: [
                {
                    price: 210,
                    item: 'breakfast',
                    id: uuid
                },
                {
                    price: 220,
                    item: 'lunch',
                    id: uuid
                },
                {
                    price: 230,
                    item: 'dinner',
                    id: uuid
                }
            ]
        },
        {
            id: uuid,
            name: "luffy",
            color: "#C2C2BB",
            payment: [
                {
                    price: 310,
                    item: 'coffee',
                    id: uuid
                },
                {
                    price: 320,
                    item: 'dessert',
                    id: uuid
                }
            ]
        },
        {
            id: uuid,
            name: "miumiu",
            color: "#F0B694",
            payment: [
                {
                    price: 450,
                    item: 'candy',
                    id: uuid
                },
                {
                    price: 500,
                    item: 'bag',
                    id: uuid
                }
            ]
        }
    ]);
    const [totalPrice, setTotalPrice] = useState(3240)

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