import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './Header.module.css'


function Header( {currentPage, setCurrentPage} ) {

    const [expanded, setExpanded] = useState(false);

    function handleHomeClick() {
        // 暫時測試用 -> 回到首頁創建使用者
        setCurrentPage('')
        setExpanded(false);
    }

    function handleListClick() {
        setCurrentPage('List')
        setExpanded(false);
    }

    function handleResultClick() {
        setCurrentPage('Result')
        setExpanded(false);
    }

    return(
       <header>
            <Navbar className={Style.navbar} expanded={expanded} expand="lg">
                <Container className={Style.container}>
                    <Navbar.Brand className={Style.brand} onClick={handleHomeClick}>ShareMoney</Navbar.Brand>
                    <Navbar.Toggle className={Style.toggle} onClick={() => setExpanded(!expanded)} style={!currentPage ? {display: 'none'} : {display: 'block'}} />
                    <Navbar.Collapse className={Style.collapse}>
                        <Nav.Link className={Style.nav__item} onClick={handleListClick} style={!currentPage ? {display: 'none'} : {display: 'block'}}>list</Nav.Link>
                        <Nav.Link className={Style.nav__item} onClick={handleResultClick} style={!currentPage ? {display: 'none'} : {display: 'block'}}>result</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
       </header>
    )
}

export default Header