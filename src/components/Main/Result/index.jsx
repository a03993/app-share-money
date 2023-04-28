import React, { useState } from 'react';
import { numberWithCommas } from '../function'

import Style from "./Result.module.css"

function Result({ paymentData, totalPrice }) {

    const paymentResult = []
    const creditor = []
    const debtor = []

    const paymentResultDataTest = paymentData.map((person) => {
        const sum = person.payment.map((payment)=> payment.price).reduce((total, price) => {
          return total + price;
        }, 0);
        return { name: person.name, color: person.color, payment: sum };
      });

    const paymentAverage = Math.round(totalPrice/paymentResultDataTest.length)

    // 從 paymentData render 使用者的 avatar 
    const ShowPersonAvatar = paymentData.map (person => 
    <li key={person.payment.id} style={{background: person.color}}>{person.name[0]}</li>)

    function Classification() {
        for(let i = 0; i < paymentResultDataTest.length; i++){
            if(paymentAverage - paymentResultDataTest[i].payment < 0){
                creditor.push({
                    name: paymentResultDataTest[i].name,
                    color: paymentResultDataTest[i].color,
                    bePayed: Math.round(Math.abs(paymentAverage - paymentResultDataTest[i].payment))
                })
            } else {
                debtor.push({
                    name: paymentResultDataTest[i].name,
                    color: paymentResultDataTest[i].color,
                    pay: Math.round(Math.abs(paymentAverage - paymentResultDataTest[i].payment))
                })
            }
        }
    }

    Classification()

    function toPay(){
        for(let i = 0; i < debtor.length; i++){
            paymentResult.push({
                debtor:debtor[i].name,
                color:debtor[i].color,
                payment:[]
            })
            for(let j = 0; j < creditor.length; j++){
                if (debtor[i].pay - creditor[j].bePayed > 0){
                    console.log(debtor[i].name + ' need to pay ' + creditor[j].name + creditor[j].bePayed + '元')
                    paymentResult[i].payment.push({
                        creditor: creditor[j].name,
                        color: creditor[j].color,
                        debt: creditor[j].bePayed
                    })
                    debtor[i].pay = debtor[i].pay - creditor[j].bePayed
                    creditor[j].bePayed = 0
                    console.log(debtor[i].name + ' 還要繼續還下一個人錢')    
                } else if (debtor[i].pay - creditor[j].bePayed === 0){
                    console.log(debtor[i].name + ' need to pay ' + creditor[j].name + creditor[j].bePayed + '元')
                    paymentResult[i].payment.push({
                        creditor: creditor[j].name,
                        color: creditor[j].color,
                        debt: creditor[j].bePayed
                    })
                    debtor[i].pay = 0
                    creditor[j].bePayed = 0
                    console.log(debtor[i].name + '不用再還錢')
                    break
                } else if (debtor[i].pay - creditor[j].bePayed < 0){
                    console.log(debtor[i].name + ' need to pay ' + creditor[j].name + debtor[i].pay + '元')
                    paymentResult[i].payment.push({
                        creditor: creditor[j].name,
                        color: creditor[j].color,
                        debt: debtor[i].pay
                    })
                    creditor[j].bePayed = creditor[j].bePayed - debtor[i].pay
                    debtor[i].pay = 0
                    console.log(creditor[j].name + '還需得到' + creditor[j].bePayed)
                    console.log(debtor[i].name + '不用再還錢')
                    break
                }
            }
        }
    }

    toPay()
    console.log('paymentResult: ',paymentResult)

    const Payment = paymentResult.map(person =>(
        <>
            <div className={Style.payment__wrapper}>
                <div className={Style.payment__list}>
                    <div>
                        <div className={Style.avatar} style={{background: person.color}}>{person.debtor[0]}</div>
                    </div>
                    <div className={Style.payment__content}>
                        <ul >
                            {person.payment.map(payment =>(
                                <li className={Style.payment}>
                                    <div className={Style.pay}>
                                        <div>pay</div>
                                        <div className={Style.pay__arrow}></div>
                                    </div>
                                    <div className={Style.avatar}  style={{background: payment.color}}>{payment.creditor[0]}</div>
                                    <div className={Style.price}>${numberWithCommas(payment.debt)}</div>
                                    <label>
                                        <input className={Style.checkPayment} type="checkbox" name="check"></input>
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

    // checkbox
    // const handleChange = (event) => {
    //     setChecked(event.target.checked);
    //     event.stopPropagation();
    // };

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