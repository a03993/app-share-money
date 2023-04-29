import React, { useState } from 'react';
import Footer from './Footer'
import uuid from 'react-uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ReactComponent as EditIcon } from './icon/edit.svg'
import { numberWithCommas } from '../function'
import Style from './PaymentList.module.css';


function PaymentList({ paymentData, totalPrice, setTotalPrice }) {

    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState({})
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
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
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
        setShow(true)
        setShowModal({
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
        setShow(false)
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
        setShow(false)
        setInputEditValues({
            editItem: '',
            editPrice: '',
          })
    }

    // 監聽 modal 中 input（item/price）的值變化
    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setInputEditValues({ ...inputEditValues, [name]: value });
    }

    return(
    <div className={Style.container}>
        {/* Input */}
        <div className={Style.wrap}>
            <div className={Style.form__container}>
                <form onSubmit={handleSubmit}>
                        <label className={Style.item__label}>
                            <h2>Item</h2>
                            <input type="text" name="item" value={inputValues.item} placeholder="輸入文字" onChange={handleInputChange} />
                        </label>
                        <label className={Style.price__label}>
                            <h2>Price</h2>
                            <input type="text" name="price" value={inputValues.price} placeholder="輸入金額" onChange={handleInputChange} />
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
                        
            <Modal show={show} onHide={handleClose} animation={false}>
                <div>
                    <Modal.Header closeButton></Modal.Header>
                    <div className={Style.modal__wrapper}>
                        <div>
                            <div className={Style.edit__avatar__icon}><EditIcon /></div>
                            <div className={Style.avatar} style={{background:showModal.color}}>{showModal.avatar}</div> 
                        </div>
                        <h2>{showModal.name}</h2>
                        <Modal.Body>
                            <div className={Style.modal__body}>
                                <div className={Style.edit__column}>
                                    <h3>Item</h3>
                                    <input type='text' name='editItem' value={inputEditValues.editItem} onChange={handleEditInputChange} placeholder={showModal.item} />
                                </div>
                                <div className={Style.edit__column}>
                                    <h3>Price</h3>
                                    <input type='number' name='editPrice' value={inputEditValues.editPrice} onChange={handleEditInputChange} placeholder={showModal.price} />
                                </div>
                            </div>
                        </Modal.Body>
                        <div className={Style.modal__footer}>
                            <Button className={Style.save__btn} onClick={paymentSave} variant="light" size="sm">
                                Save
                            </Button>
                            <Button className={Style.delete__btn} onClick={paymentRemove} variant="dark" size="sm">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
    </div>
    )
}

export default PaymentList