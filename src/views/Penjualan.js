import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axios'

function Penjualan() {
  const [penjualan, setPenjualan] = useState([])
  const [loading, setLoading] = useState(true)

  const getPenjualan = async () => {
    try {
      const { data: { penjualan } } = await axiosInstance.get('/penjualan')
      setPenjualan(penjualan)
      setLoading(false)
    } catch (e) {
      setLoading(true)
      console.log(e.message)
    }
  }

  const deletePenjualan = async (idNota) => {
    const confirm = window.confirm('anda yakin?')

    try {
      if (confirm) {
        await axiosInstance.delete(`/penjualan/${idNota}`)
        window.location.reload()
      }
      return
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getPenjualan()
    return () => {
      // cleanup
      setPenjualan([])
    };
  }, [])

  return (
    <div>
      <h1 className='text-4xl'>Penjualan</h1>

      <hr className='my-4 border-t-2' />

      <div className='my-4'>
        <Link to={'create'} className='px-5 py-2 bg-green-500 rounded-md text-green-50'>tambah penjualan</Link>
      </div>

      <div>
        { loading && 'loading ...' }
        { !loading && (
          <table className='w-full text-left border border-collapse table-auto border-slate-500'>
          <thead className='text-slate-100'>
            <tr>
              <th className='p-4 bg-slate-400'>NOTA</th>
              <th className='p-4 bg-slate-400'>TGL</th>
              <th className='p-4 bg-slate-400'>KODE PELANGGAN</th>
              <th className='p-4 bg-slate-400'>SUBTOTAL</th>
              <th className='p-4 bg-slate-400'>action</th>
            </tr>
          </thead>
          <tbody className='text-slate-200'>
            { penjualan.map((item) => (
              <tr key={item.id}>
                <td className='p-4 bg-slate-600'>{item.id_nota}</td>
                <td className='p-4 bg-slate-600'>{item.tgl}</td>
                <td className='p-4 bg-slate-600'>{item.kode_pelanggan}</td>
                <td className='p-4 bg-slate-600'>{item.subtotal}</td>
                <td className='p-4 bg-slate-600'>
                  <Link to={`/penjualan/${item.id_nota}/edit`} className='mr-4 text-green-400 underline hover:text-green-500'>edit</Link>
                  |
                  <Link to={`/penjualan/${item.id_nota}`} className='mx-4 text-blue-400 underline hover:text-blue-500'>detail</Link>
                  |
                  <button type='button' onClick={() => deletePenjualan(item.id_nota)} className='ml-4 text-red-400 underline hover:text-red-500'>delete</button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        ) }
      </div>
    </div>
  )
}

export default Penjualan