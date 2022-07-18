import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className='container px-8 mx-auto text-white bg-slate-500'>
        <div className="py-4 space-x-6">
            <Link to={'/'} className='text-lg'>Home</Link>
            <Link to={'/pelanggan'} className='text-lg'>Pelanggan</Link>
            <Link to={'/penjualan'} className='text-lg'>Penjualan</Link>
            <Link to={'/barang'} className='text-lg'>Barang</Link>
        </div>
    </nav>
  )
}

export default Header