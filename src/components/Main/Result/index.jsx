import React, { useState } from 'react';
import { numberWithCommas } from '../function'
import Style from "./Result.module.css"

function Result({ paymentData, totalPrice }) {    

    // 平均花費
    const paymentAverage = Math.round(totalPrice/paymentData.length)

    // 陣列：從 paymentData 取出每個人的花費並與平均花費相比
    const paymentResultData = paymentData.map((person) => {
        const sum = person.payment.map(payment => payment.price).reduce((total, price) => {
            return total + price;
        }, 0);
        return { id:person.id, name: person.name, color: person.color, result: sum - paymentAverage};
    });

    console.log('paymentResultData: ', paymentResultData)

    // 陣列：從 personalPaymentResult 中分類出 “欠款、收款、無需付款”
    const personalPayment = {
        debtor : paymentResultData.filter(person => person.result < 0),
        creditor : paymentResultData.filter(person => person.result > 0),
    }

    console.log('personalPayment: ', personalPayment)

    // 陣列：從 personalPayment 中取得 “欠款人”
    const paymentResult = personalPayment.debtor.map(payer => {
        return { id:payer.id, name:payer.name, color:payer.color, toPay:[] }
    })
    
    console.log('paymentResult: ', paymentResult)

    function SpiltBill(){
        for(let i = 0; i < personalPayment.debtor.length; i++){
            for(let j = 0; j < personalPayment.creditor.length; j++){
                // 當有欠款的時候才會開始比對
                if(personalPayment.debtor[i].result < 0){
                    // 欠款 < 還款 -> 不需要再比對
                    if(personalPayment.debtor[i].result + personalPayment.creditor[j].result > 0){
                        paymentResult[i].toPay.push({
                            name: personalPayment.creditor[j].name,
                            color: personalPayment.creditor[j].color,
                            price: Math.abs(personalPayment.debtor[i].result)
                        })
                        personalPayment.creditor[j].result += personalPayment.debtor[i].result
                        personalPayment.debtor[i].result = 0
                        break
                    }
                    // 欠款 > 還款 -> 需要再比對
                    if(personalPayment.debtor[i].result + personalPayment.creditor[j].result < 0){
                        paymentResult[i].toPay.push({
                            name: personalPayment.creditor[j].name,
                            color: personalPayment.creditor[j].color,
                            price: Math.abs(personalPayment.creditor[j].result)
                        })
                    }
                }     
            }
        }
    }

    SpiltBill()

    function handleCheckChange(e) {
        console.log(e.target.value)
    }

    // 渲染 使用者的 avatar by paymentData
    const ShowPersonAvatar = paymentData.map (person => 
        <li key={person.payment.id} style={{background: person.color}}>{person.name[0]}</li>)

    // 渲染 Payment
    const Payment = paymentResult.map((payer, payerIndex) =>(
        <>
            <div className={Style.payment__wrapper}>
                <div className={Style.payment__list}>
                    <div>
                        <div className={Style.avatar} style={{background: payer.color}}>{payer.name[0]}</div>
                    </div>
                    <div className={Style.payment__content}>
                        <ul>
                            {payer.toPay.map((payee, payeeIndex) =>(
                                <li className={Style.payment}>
                                    <div className={Style.pay}>
                                        <div>pay</div>
                                        <div className={Style.pay__arrow}></div>
                                    </div>
                                    <div className={Style.avatar} style={{background: payee.color}}>{payee.name[0]}</div>
                                    <div className={Style.price}>${numberWithCommas(payee.price)}</div>
                                    <label>
                                        <input className={Style.checkPayment} type='checkbox'></input>
                                        <span></span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>          
            </div>
            <div className={Style.line}></div>
        </>
    ))

    return(
        <div className={Style.container}>
            {/* 人數、總金額、平均金額 */}
            <div className={Style.average__container}>
                <div className={Style.average__wrapper}>
                    <div className={Style.average}>
                        <h1>${numberWithCommas(paymentAverage)}</h1>
                        <h3>/人</h3>
                    </div>
                </div>
                <div className={Style.total__list__container}>
                    <div className={Style.total__wrapper}>
                        <div className={Style.total}>
                            <h3>{paymentData.length}</h3>
                            <h4>人</h4>
                        </div>
                        <div className={Style.total__spending}>
                            <h3>${numberWithCommas(totalPrice)}</h3>
                        </div>       
                    </div>
                    <div className={Style.avatar__list__wrapper}>
                        <ul className={Style.avatar__list}>
                            {ShowPersonAvatar}
                        </ul>
                    </div>   
                </div>        
            </div>

            {/* payment */}
            <div className={Style.payment__List__container}>
                <div className={Style.payment__list__wrapper}>
                    <h2>Payment</h2>
                    <div className={Style.line}></div>
                    {Payment}
                </div>

                {/* done payment */}
                {/* show on desktop */}
                <div className={Style.done__payment__list__wrapper}>
                    <h2>Done Payment</h2>
                    <div className={Style.line}></div>

                </div>     
            </div>
        </div>
    )
}

export default Result