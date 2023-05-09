import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './Header.module.css'


function Header( {newAccount} ) {

    const [expanded, setExpanded] = useState(false);

    return(
       <header>
            <Navbar className={Style.navbar} expanded={expanded} expand="lg">
                <Container className={Style.container}>
                    <Navbar.Brand className={Style.brand}>
                        <Link to='/'>ShareMoney</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle className={Style.toggle} onClick={() => setExpanded(!expanded)} style={Object.keys(newAccount).length > 0 ? {display:'block'} : {display:'none'}} />
                    <Navbar.Collapse className={Style.collapse} onClick={() => setExpanded(!expanded)} >
                        <NavLink to='/paymentlist' className={Style.nav__item}>list</NavLink>
                        <NavLink to='/result' className={Style.nav__item}>result</NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       </header>
    )
}

export default Header