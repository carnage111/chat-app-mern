import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/entryPoints/Login';
import Signup from './components/entryPoints/Signup';
import Home from './components/entryPoints/Home';
import MainLayout from './components/MainLayout';
import ChatLayout from './components/ChatLayout';

import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
      <div id='app-div'>
        <Routes>
          <Route path='/' element={<MainLayout><Home /></MainLayout>} />
          <Route path='/login' element={<MainLayout><Login /></MainLayout>} />
          <Route path='/signup' element={<MainLayout><Signup /></MainLayout>} />
          <Route path='/chats' element={<ChatLayout></ChatLayout>} />
        </Routes>
      </div>   
    </ChakraProvider>
  );
}

export default App;
