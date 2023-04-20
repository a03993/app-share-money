import React, { useState } from 'react';
import uuid from 'react-uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { color } from '../data.jsx'
import Style from './Home.module.css'

function Home ({ paymentData, setCurrentPage }) {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(2);
    const [name, setName] = useState('');

    // show & close Modal
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false);
        setName('')
    }

    // color list rendering
    const listStatus = (index) => {
        setSelected(index)
    }

    const ColorsList = color.map(
        (color, index) =>
            <div className={selected === index ? Style.selected : ''}>
                <li key={color.toString()} onClick={(e) => listStatus(index)} style={{background:color}}>
                </li>
            </div>
        )

    // avatar rendering
    const Avatar = color.map(
        (color, index) => 
            <div className={Style.avatar} style={{display: selected === index ? 'block' : 'none' ,background: color}}>
                <h2>{name[0]}</h2>
            </div>
        )

    // create account
    const handleSubmit = () => {
            paymentData.push ({
                id: uuid,
                name: name,
                color: color[selected],
                payment:[]
            })
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
                    {Avatar}
                        <Button disabled={!name} onClick={handleSubmit} className={Style.btn__view} variant="light" size="sm">
                            View List
                        </Button>
                    </div>
            </Modal>
        </div>
    )
}

export default Home