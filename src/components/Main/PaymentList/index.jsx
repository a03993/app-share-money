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
    const [showModal, setShowModal] = useState({  
            id: uuid(),
            name: '',
            color: '',
            payment: [
                {
                    price: 0,
                    item: '',
                    id: uuid()
                }
            ]
    })
    const [index, setIndex]= useState(0)
    const [formData, setFormData] = useState({});
    const [item, setItem] = useState('')
    const [price, setPrice] = useState('')
    const [itemPlaceholder, setItemPlaceholder] = useState('')
    const [pricePlaceholder, setPricePlaceholder] = useState(0)

    // input value 監聽表單元素的值變化
    function onItemChange(event){
        setItem(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }

    function onPriceChange(event){
        setPrice(event.target.value);
        const name = event.target.name;
        const value = parseInt(event.target.value);
        setFormData({ ...formData, [name]: value });
    }

    // 將使用者輸入 input 的值傳遞至物件陣列 paymentData 儲存
    const handleSubmit = (event) => {
        event.preventDefault();
        if(item.trim() === '') {
            alert('Please enter the item!')
            return
        } else if (price.trim() === '') {
            alert('Please enter the price!')
            return
        } else {
            paymentData[0].payment.push(
                {
                    price: formData.price,
                    item: formData.item,
                    id: uuid(),  
                }
            )
            setTotalPrice(totalPrice+formData.price)
            setItem('');
            setPrice('');
        }  
      };

    // show detail
    const detail = paymentData.map(person =>(
        <>
            <div className={Style.payment}>
                <div style={person.payment.length<=0 ? {display:'none'} : {display:'block'}}>
                    <p className={Style.personal__avatar} style={{background: person.color}}>
                       {person.name[0]}
                    </p>
                    </div>
                <div className={Style.payment__list}>
                    <ul>
                        {person.payment.map((payment, index) =>(
                        <li key={payment.id} className={Style.personal__payment}>
                            <h3 className={Style.payment__item}>{payment.item}</h3>
                            <h3 className={Style.payment__price}>${numberWithCommas(payment.price)}</h3>
                            <button className={Style.payment__btn} variant="primary" onClick={()=>handleShow(person, index)} />
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={Style.line} style={person.payment.length<=0 ? {display:'none'} : {display:'block'}}></div>
        </>
    ))

    // show modal
    function handleShow(person, paymentIndex) {
        setShow(true)
        setShowModal(person)
        setItemPlaceholder(person.payment[paymentIndex].item)
        setPricePlaceholder(person.payment[paymentIndex].price)
        setIndex(paymentIndex)
    }

    console.log('itemPlaceholder', itemPlaceholder)
    console.log('pricePlaceholder', pricePlaceholder)

    // modal remove(payment)
    function paymentRemove(){
        setTotalPrice(totalPrice-paymentData[0].payment[index].price)
        paymentData[0].payment.splice(index, 1)
        setItemPlaceholder('')
        setPricePlaceholder(0)
        setShow(false)
    }

    // modal update(payment)
    function saveEditedPayment(){
        setShow(false)
    }

    // modal input value 監聽表單元素的值變化
    function onEditItemChange(event){
        if(event.target.value.length <= 0){
            return
        } else {
            paymentData[0].payment[index].item = event.target.value
        }
    }

    function onEditPriceChange(event){
        if(event.target.value.length <= 0){
            return
        } else {
            setTotalPrice(totalPrice - paymentData[0].payment[index].price + parseInt(event.target.value))
            paymentData[0].payment[index].price = parseInt(event.target.value)
        }
    }    

    return(
    <div className={Style.container}>
        {/* Item/Price */}
        <div className={Style.wrap}>
            <div className={Style.form__container}>
                <form onSubmit={handleSubmit}>
                        <label className={Style.item__label}>
                            <h2>Item</h2>
                            <input type="text" name="item" value={item} placeholder="輸入文字" onChange={onItemChange} />
                        </label>
                        <label className={Style.price__label}>
                            <h2>Price</h2>
                            <input type="text" name="price" value={price} placeholder="輸入金額" onChange={onPriceChange} />
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
                        <div className={Style.avatar} style={{background:showModal.color}}>{showModal.name[0]}</div> 
                    </div>
                    <h2>{showModal.name}</h2>
                    <Modal.Body>
                        <div className={Style.modal__body}>
                            <div className={Style.edit__column}>
                                <h3>Item</h3>
                                <input type="text" onChange={onEditItemChange} placeholder={itemPlaceholder} />
                            </div>
                            <div className={Style.edit__column}>
                                <h3>Price</h3>
                                <input type="number" onChange={onEditPriceChange} placeholder={pricePlaceholder} />
                            </div>
                        </div>
                    </Modal.Body>
                    <div className={Style.modal__footer}>
                        <Button className={Style.save__btn} onClick={saveEditedPayment} variant="light" size="sm">
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