import React, { useState } from 'react';
import { numberWithCommas } from '../function'
import { color } from '../data.jsx'
import { CreatAccountModal } from '../CreateAccountModal/index.jsx';
import { EditPaymentModal } from './EditPaymentModal/index.jsx';
import Footer from './Footer'
import uuid from 'react-uuid';
import Style from './PaymentList.module.css';


function PaymentList({ newAccount, setNewAccount, paymentData, setPaymentData, totalPrice, setTotalPrice }) {

    // Create Account Modal
    const [show, setShow] = useState(true)
    const [selected, setSelected] = useState(2);
    const [name, setName] = useState('');  

    // Edit Modal
    const [showModal, setShowModal] = useState(false);
    const [renderModal, setRenderModal] = useState({})
    const [inputValues, setInputValues] = useState({
        item: '',
        price: '',
    });
    const [inputEditValues, setInputEditValues] = useState({
        editItem: '',
        editPrice: '',
    });
    const [personIndex, setPersonIndex] = useState(0)
    const [paymentIndex, setPaymentIndex] = useState(0)

    // 創建後在 paymentData 內的 index
    const thisIndex = paymentData.length - 1

    // input value 監聽表單元素（item/price）的值變化
    const onInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const CreateAccountHandleSubmit = () => {
        setNewAccount({
            id: uuid(),
            name: name,
            color: color[selected],
            payment: []
        })
        setPaymentData([
            ...paymentData,
            {
                id: uuid(),
                name: name,
                color: color[selected],
                payment: []
            }
        ])
    }

    // 按下 + 按鈕後，將 input 的值傳遞至物件陣列 paymentData 內儲存
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('inputValues: ',inputValues)
        if(inputValues.item.toString().trim() === '') {
            alert('Please enter the item!')
            return
        } else if (inputValues.price.toString().trim() === '') {
            alert('Please enter the price!')
            return
        } else {
            paymentData[thisIndex].payment.push(
                {
                    price: Number(inputValues.price),
                    item: inputValues.item,
                    id: uuid(),  
                }
            )
            setTotalPrice(totalPrice + Number(inputValues.price))
            setInputValues({
                item: '',
                price: '',
              })
        }  
      };

    // show detail
    const detail = paymentData.map((person, personIndex) =>(
        <>
            <div className={Style.payment}>
                <div style={person.payment.length<=0 ? {display:'none'} : {display:'block'}}>
                    <p className={Style.personal__avatar} style={{background: person.color}}>
                       {person.name[0]}
                    </p>
                </div>
                <div className={Style.payment__list}>
                    <ul>
                        {person.payment.map((payment, paymentIndex) =>(
                        <li key={payment.id} className={Style.personal__payment}>
                            <h3 className={Style.payment__item}>{payment.item}</h3>
                            <h3 className={Style.payment__price}>${numberWithCommas(payment.price)}</h3>
                            <button className={Style.payment__btn} variant="primary" onClick={()=>handleShow(person, personIndex, paymentIndex)} />
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={Style.line} style={person.payment.length <= 0 ? {display:'none'} : {display:'block'}}></div>
        </>
    ))

    // 點擊 > 按鈕 show modal
    function handleShow(person, personIndex, paymentIndex) {
        setShowModal(true)
        setRenderModal({
            id: person.payment[paymentIndex].id,
            avatar: person.name[0],
            color: person.color,
            name: person.name,
            item: person.payment[paymentIndex].item,
            price: person.payment[paymentIndex].price,
        })
        setPersonIndex(personIndex)
        setPaymentIndex(paymentIndex)
    }

    // modal 中點擊 delete 刪除 paymentData 資料
    function paymentRemove(){
        const priceRemove = paymentData[personIndex].payment[paymentIndex].price
        setTotalPrice(totalPrice - priceRemove)
        paymentData[personIndex].payment.splice(paymentIndex, 1)
        setShowModal(false)
    }

    // modal 中點擊 save 更新 paymentData 資料
    function paymentSave(){
        const priceRemove = paymentData[personIndex].payment[paymentIndex].price
        if(inputEditValues.editItem.length > 0){
            const itemNew = inputEditValues.editItem
            paymentData[personIndex].payment[paymentIndex].item = itemNew
        }
        if(inputEditValues.editPrice.length > 0){
            const priceNew = Number(inputEditValues.editPrice)
            paymentData[personIndex].payment[paymentIndex].price = priceNew
            setTotalPrice(totalPrice - priceRemove + priceNew)
        }
        setShowModal(false)
        setInputEditValues({
            editItem: '',
            editPrice: '',
          })
    }

    return(
    <div className={Style.container}>
        {/* Input */}
        <div className={Style.wrap}>
            <div className={Style.form__container}>
                <form onSubmit={handleSubmit}>
                        <label className={Style.item__label}>
                            <h2>Item</h2>
                            <input type="text" name="item" value={inputValues.item} placeholder="輸入文字" onChange={onInputChange} />
                        </label>
                        <label className={Style.price__label}>
                            <h2>Price</h2>
                            <input type="text" name="price" value={inputValues.price} placeholder="輸入金額" onChange={onInputChange} />
                        </label>
                        <button className={Style.submit__btn} type="submit">+</button>
                </form>
            </div>
        </div>
        {/* Total */}
        <div className={Style.wrap}>
            <div className={Style.total__container}>
                <div className={Style.total__wrapper}>
                    <h2>Total</h2>
                    <div className={Style.total}>
                        <div className={Style.people__amount}>
                            <h1>{paymentData.length}</h1>
                            <h3>人</h3>
                        </div>
                        <div className={Style.spending__amount}>
                            <h1>${numberWithCommas(totalPrice)}</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail */}
            <div className={Style.detail__container}>
                <h2>Detail</h2>
                <div className={Style.detail__wrapper}>
                    <ul>
                        {detail}
                    </ul>                    
                </div>
            </div>
        </div>

        <Footer />

        <EditPaymentModal 
            showModal={showModal}
            setShowModal={setShowModal}
            renderModal={renderModal}
            inputEditValues={inputEditValues}
            setInputEditValues={setInputEditValues}
            paymentSave={paymentSave}
            paymentRemove={paymentRemove}
        />

        <CreatAccountModal 
            show={Object.keys(newAccount).length > 0 ? !show : show} 
            setShow={setShow}
            selected={selected}
            setSelected={setSelected}
            name={name}
            setName={setName}
            handleSubmit={CreateAccountHandleSubmit}
        />
    </div>
    )}


export default PaymentList