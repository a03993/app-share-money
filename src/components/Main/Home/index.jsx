import React, { useState } from 'react';
import uuid from 'react-uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { color } from '../data.jsx'
import Style from './Home.module.css'

function Home ({ paymentData, setPaymentData, setCurrentPage }) {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(2);
    const [name, setName] = useState('');

    // Modal Show
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false);
        setName('')
    }

    // 被選擇的 avatar color 再陣列中的位置
    const colorSelected = (index) => {
        setSelected(index)
    }

    const ColorsList = color.map(
        (color, index) =>
            <div className={selected === index ? Style.selected : ''}>
                <li key={color.toString()} onClick={(e) => colorSelected(index)} style={{background:color}}>
                </li>
            </div>
        )        

    // create account
    const handleSubmit = () => {
        setPaymentData([
            ...paymentData,
            {
                id: uuid(),
                name: name,
                color: color[selected],
                payment: []
            }
        ])
            setCurrentPage('List')
        }

    return(
        <div className={Style.container}>
            <div className={Style.icon}>$</div>
            <div className={Style.content}>
                <h2>no download
                    <span> free online share money </span>
                    with your debtors!
                </h2>
            </div>
            <Button className={Style.btn__create} variant="light" size="lg" onClick={handleShow}>
                Create List
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton></Modal.Header>
                <div className={Style.modal__header}>
                    <h2>ShareMoney List</h2>
                    <h4>Share free private online list with your debtors! No download and no registration needed!</h4>
                </div>
                <Modal.Body>
                    <div className={Style.modal__body}>
                        <h2>Your name</h2>
                        <input type="text" onChange={(e)=>{setName(e.target.value)}}  placeholder="輸入你的名字"></input>
                    </div>
                    <div className={Style.modal__body}>
                        <ul className={Style.selection__of__colors}>
                            {ColorsList}  
                        </ul>
                    </div>
                </Modal.Body>
                <div className={Style.modal__footer}>
                    <div className={Style.avatar} style={{background: color[selected]}}>
                        <h2>{name[0]}</h2>
                    </div>
                    <Button disabled={!name} onClick={handleSubmit} className={Style.btn__view} variant="light" size="sm">
                        View List
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default Home