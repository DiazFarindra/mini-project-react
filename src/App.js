import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Barang from './views/Barang';
import Home from './views/Home';
import Pelanggan from './views/Pelanggan';
import PelangganCreate from './views/PelangganCreate';
import Penjualan from './views/Penjualan';

function App() {
  return (
    <>
      <Header />
      <div className='container px-8 mx-auto mt-6'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='pelanggan' element={<Pelanggan />} />
          <Route path='pelanggan/create' element={<PelangganCreate />} />
          <Route path='penjualan' element={<Penjualan />} />
          <Route path='barang' element={<Barang />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
