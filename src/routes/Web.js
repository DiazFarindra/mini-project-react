import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Barang from '../views/Barang';
import BarangCreate from '../views/BarangCreate';
import BarangUpdate from '../views/BarangUpdate';
import Home from '../views/Home';
import Pelanggan from '../views/Pelanggan';
import PelangganCreate from '../views/PelangganCreate';
import PelangganUpdate from '../views/PelangganUpdate';
import Penjualan from '../views/Penjualan';
import PenjualanCreate from '../views/PenjualanCreate';
import PenjualanDetail from '../views/PenjualanDetail';
import PenjualanUpdate from '../views/PenjualanUpdate';

function Web() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='pelanggan' element={<Pelanggan />} />
      <Route path='pelanggan/create' element={<PelangganCreate />} />
      <Route path='pelanggan/:idPelanggan' element={<PelangganUpdate />} />

      <Route path='barang' element={<Barang />} />
      <Route path='barang/create' element={<BarangCreate />} />
      <Route path='barang/:kode' element={<BarangUpdate />} />

      <Route path='penjualan' element={<Penjualan />} />
      <Route path='penjualan/create' element={<PenjualanCreate />} />
      <Route path='penjualan/:nota/edit' element={<PenjualanUpdate />} />
      <Route path='penjualan/:nota' element={<PenjualanDetail />} />
    </Routes>
  )
}

export default Web