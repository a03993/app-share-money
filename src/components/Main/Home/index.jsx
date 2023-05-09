import React, { useState } from 'react';
import { CreatAccountModal } from '../CreateAccountModal/index.jsx';
import { color } from '../data.jsx'
import uuid from 'react-uuid';
import Button from 'react-bootstrap/Button';
import Style from './Home.module.css'

function Home ({ setNewAccount, paymentData, setPaymentData }) {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(2);
    const [name, setName] = useState('');    

    const handleSubmit = () => {
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

    return(
        <div className={Style.container}>
            <div className={Style.icon}>$</div>
            <div className={Style.content}>
                <h2>no download
                    <span> free online share money </span>
                    with your debtors!
                </h2>
            </div>
            <Button className={Style.btn__create} variant='light' size='lg' onClick={() => setShow(true)}>
                Create List
            </Button>

            <CreatAccountModal 
                show={show} 
                setShow={setShow}
                selected={selected}
                setSelected={setSelected}
                name={name}
                setName={setName}
                handleSubmit={handleSubmit}
                />
        </div>
    )
}

export default Home