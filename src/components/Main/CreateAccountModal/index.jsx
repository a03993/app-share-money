import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { color } from '../data.jsx'
import Style from './CreateAccountModal.module.css'

export function CreatAccountModal ({ show, setShow, selected, setSelected, name, setName, handleSubmit }) {

    let modalTitle = 'ShareMoney List'
    let modalDesciption = 'Share free private online list with your debtors! No download and no registration needed!'
    let href = 'http://localhost:3000/paymentlist'

    const handleClose = () => {
        if(window.location.href === href){
            return
        }
        setShow(false);
        setName('')
    }

    const ColorsList = color.map(
        (color, index) =>
            <div className={selected === index ? Style.selected : ''}>
                <li key={color.toString()} onClick={() => setSelected(index)} style={{background:color}}>
                </li>
            </div>
    )
    
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            {window.location.href === href
            ? <Modal.Header></Modal.Header>
            : <Modal.Header closeButton></Modal.Header>}
            <div className={Style.modal__header}>
                <h2>{modalTitle}</h2>
                <h4>{modalDesciption}</h4>
            </div>
            <Modal.Body>
                <div className={Style.modal__body}>
                    <h2>Your name</h2>
                    <input type='text' onChange={(e)=>{setName(e.target.value)}}  placeholder='輸入你的名字'></input>
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
                <Button disabled={!name} onClick={handleSubmit} className={Style.btn__view} variant='light' size='sm'>
                {window.location.href === href
                ? <>View List</>
                : <Link to='paymentlist'>View List</Link>
                }
                </Button>
            </div>
        </Modal>
    )
}

export default CreatAccountModal