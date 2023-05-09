import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ReactComponent as EditIcon } from '../icon/edit.svg'

import Style from './EditPaymentModal.module.css'

export function EditPaymentModal({showModal, setShowModal, renderModal, inputEditValues, setInputEditValues, paymentSave, paymentRemove}){

    // 監聽 modal 中 input（item/price）的值變化
    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setInputEditValues({ ...inputEditValues, [name]: value });
    }

    return(
        <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
            <div>
                <Modal.Header closeButton></Modal.Header>
                <div className={Style.modal__wrapper}>
                    <div>
                        <div className={Style.edit__avatar__icon}><EditIcon /></div>
                        <div className={Style.avatar} style={{background:renderModal.color}}>{renderModal.avatar}</div> 
                    </div>
                    <h2>{renderModal.name}</h2>
                    <Modal.Body>
                        <div className={Style.modal__body}>
                            <div className={Style.edit__column}>
                                <h3>Item</h3>
                                <input type='text' name='editItem' value={inputEditValues.editItem} onChange={handleEditInputChange} placeholder={renderModal.item} />
                            </div>
                            <div className={Style.edit__column}>
                                <h3>Price</h3>
                                <input type='number' name='editPrice' value={inputEditValues.editPrice} onChange={handleEditInputChange} placeholder={renderModal.price} />
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
    )
}