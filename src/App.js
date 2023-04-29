import React, { useState } from 'react';
import Header from './components/Header'
import Main from './components/Main'
import './styles/reset.module.css'
import './styles/base.module.css'


function App() {

  // 當前頁面，預設為 Home Page
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Main currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
