import React, { useState } from 'react';
import { numberWithCommas } from '../function'

import Style from "./Result.module.css"

function Result({ paymentData, totalPrice }) {

    const [checked, setChecked] = useState(false);
   
    const paymentResultData = [
        {},
        {}
    ]

    // person avatar list rendering
    const ShowPersonAvatar = paymentData.map (person => 
    <li key={person.payment.id} style={{background: person.color}}>{person.name[0]}</li>)

    // 平均一人應付價錢
    const SumAverage = numberWithCommas(Math.round(totalPrice/paymentData.length))


    // checkbox
    const handleChange = (event) => {
        setChecked(event.target.checked);
        event.stopPropagation();
    };

    return(
        <div className={Style.container}>
            {/* 人數、總金額、平均金額 */}
            <div className={Style.average__container}>
                <div className={Style.average__wrapper}>
                    <div className={Style.average}>
                        <h1>${SumAverage}</h1>
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
                    
                    {/* <ul className={Style.payment__list}>
                        <li className={Style.payment}>
                            <div className={Style.avatar} style={{background: 'var(--avatar-color-3)'}}>B</div>
                            <div className={Style.pay}>
                                <div>pay</div>
                                <div className={Style.pay__arrow}></div>
                            </div>
                            <div className={Style.avatar}  style={{background: 'var(--avatar-color-2)'}}>M</div>
                            <div className={Style.price} style={{color: checked === true ? 'var(--done-color)' : 'var(--primary-text)'}}>$42</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check" id={uuid()}></input>
                                <span></span>
                            </label>
                        </li>
                    </ul> 
                    <div className={Style.line}></div>

                    <ul className={Style.payment__list}>
                        <li className={Style.payment}>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-4)'}}>T</div>
                            <div className={Style.pay}>
                                <div>pay</div>
                                <div className={Style.pay__arrow}></div>
                            </div>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-3)'}}>B</div>
                            <div className={Style.price}>$79</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check"></input>
                                <span></span>
                            </label>
                        </li>
                        <li className={Style.payment}>
                            <div className={Style.avatar__hidden} id="avatar__pay" style={{background: 'var(--avatar-color-4)'}}>T</div>
                            <div className={Style.pay}>
                            <div>pay</div>
                                <div className={Style.pay__arrow}></div>
                            </div>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-5)'}}>C</div>
                            <div className={Style.price}>$50</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check"></input>
                                <span></span>
                            </label>
                        </li>
                        <li className={Style.payment}>
                            <div className={Style.avatar__hidden} id="avatar__pay" style={{background: 'var(--avatar-color-4)'}}>T</div>
                            <div className={Style.pay}>
                                <div>pay</div>
                                <div className={Style.pay__arrow}></div>
                            </div>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-2)'}}>M</div>
                            <div className={Style.price}>$121</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check"></input>
                                <span></span>
                            </label>
                        </li>
                    </ul>         
                    <div className={Style.line}></div>
                    
                    <ul className={Style.payment__list}>
                        <li className={Style.payment}>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-5)'}}>C</div>
                            <div className={Style.pay}>
                                <div>pay</div>
                                <div className={Style.pay__arrow}></div>
                            </div>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-3)'}}>B</div>
                            <div className={Style.price}>$29</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check"></input>
                                <span></span>
                            </label>
                        </li>
                        <li className={Style.payment}>
                            <div className={Style.avatar__hidden} id="avatar__pay" style={{background: 'var(--avatar-color-5)'}}>C</div>
                            <div className={Style.pay}>
                                <div>pay</div>
                                <div className={Style.pay__arrow}></div>
                            </div>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-2)'}}>M</div>
                            <div className={Style.price}>$71</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check"></input>
                                <span></span>
                            </label>
                        </li>
                    </ul>
                    <div className={Style.line}></div>
                    
                    <ul className={Style.payment__list}>
                        <li className={Style.payment}>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-2)'}}>M</div>
                            <h3>Don't need to pay anyone</h3>
                        </li>
                    </ul>
                    <div className={Style.line}></div>         */}
                </div>

                {/* done payment */}
                {/* show on desktop */}
                {/* <div className={Style.done__payment__list__wrapper}>
                    <h2>Done Payment</h2>
                    <div className={Style.line}></div>
                    
                    <ul className={Style.payment__list}>
                        <li className={Style.payment}>
                            <div className={Style.avatar} style={{background: 'var(--avatar-color-3)'}}>B</div>
                            <div className={Style.pay}>
                                <div style={{color:'var(--done-color)'}}>pay</div>
                                <div className={Style.pay__arrow__done}></div>
                            </div>
                            <div className={Style.avatar} style={{background: 'var(--avatar-color-2)'}}>M</div>
                            <div className={Style.price} style={{color:'var(--done-color)'}}>$42</div>
                            <label>
                                <input className={Style.checkPayment} type="checkbox" name="check" defaultChecked></input>
                                <span></span>
                            </label>
                        </li>
                    </ul> 
                    <div className={Style.line}></div>
                    
                    <ul className={Style.payment__list}>
                        <li className={Style.payment}>
                            <div className={Style.avatar} id="avatar__pay" style={{background: 'var(--avatar-color-2)'}}>M</div>
                            <h3>Don't need to pay anyone</h3>
                        </li>
                    </ul>
                    <div className={Style.line}></div>        
                </div>      */}

            </div>
        </div>
    )
}

export default Result