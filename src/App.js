import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import Header from './components/Header'
import Main from './components/Main'
import './styles/reset.module.css'
import './styles/base.module.css'


function App() {

  // 創立使用者
  const [newAccount, setNewAccount] = useState({})

  console.log('newAccount: ', newAccount)
  
  return (
    <BrowserRouter>
      <Header newAccount={newAccount} />
      <Main newAccount={newAccount} setNewAccount={setNewAccount} />
    </BrowserRouter>
  );
}

export default App;
