import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import uuid from 'react-uuid';
import Home from './Home'
import PaymentList from './PaymentList'
import Result from './Result'

function Main( {newAccount, setNewAccount} ) {

    // Array: 這邊先設定原本就存有一筆資料，目前是假資料
    const [paymentData, setPaymentData] = useState([
        {
            id: uuid(),
            name: "tina",
            color: "#BFAD76",
            payment: [
                {
                    price: 750,
                    item: 'MRT',
                    id: uuid()
                },
                {
                    price: 120,
                    item: 'bus',
                    id: uuid()
                },
                {
                    price: 130,
                    item: 'taxi',
                    id: uuid()
                }
            ]
        },
        {
            id: uuid(),
            name: "barney",
            color: "#E7D3A7",
            payment: [
                {
                    price: 210,
                    item: 'breakfast',
                    id: uuid()
                },
                {
                    price: 220,
                    item: 'lunch',
                    id: uuid()
                },
                {
                    price: 230,
                    item: 'dinner',
                    id: uuid()
                }
            ]
        },
        {
            id: uuid(),
            name: "luffy",
            color: "#C2C2BB",
            payment: [
                {
                    price: 310,
                    item: 'coffee',
                    id: uuid()
                },
                {
                    price: 320,
                    item: 'dessert',
                    id: uuid()
                }
            ]
        },
        {
            id: uuid(),
            name: "miumiu",
            color: "#F0B694",
            payment: [
                {
                    price: 450,
                    item: 'candy',
                    id: uuid()
                },
                {
                    price: 500,
                    item: 'bag',
                    id: uuid()
                }
            ]
        }
    ]);

    // 數字：總金額 -> 這邊先設定如同 paymentData 相符合的假資料：總金額 $3,240
    const [totalPrice, setTotalPrice] = useState(3240)

    // local Storage -> 登入過後就不會再跳 popup 要求登入
    localStorage.setItem('account' ,JSON.stringify(newAccount));

    // 取出 local storage 的值
    const myData = JSON.parse(localStorage.getItem('account'));

    return(
        <Routes>
            <Route exact path="/" element={<Home newAccount={newAccount} setNewAccount={setNewAccount} paymentData={paymentData} setPaymentData={setPaymentData} />} />
            <Route path="paymentlist" element={<PaymentList newAccount={newAccount} setNewAccount={setNewAccount} paymentData={paymentData} setPaymentData={setPaymentData} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
            <Route path="result" element={<Result paymentData={paymentData} totalPrice={totalPrice} />} />
        </Routes>
    )
}

export default Main