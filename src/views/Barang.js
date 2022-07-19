import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axios'

function Barang() {
  const [barang, setBarang] = useState([])
  const [loading, setLoading] = useState(true)

  const getBarang = async () => {
    try {
      const { data: { barang } } = await axiosInstance.get('/barang')
      setBarang(barang)
      setLoading(false)
    } catch (e) {
      setLoading(true)
      console.log(e.message)
    }
  }

  const deleteBarang = async (kode) => {
    const confirm = window.confirm('anda yakin?')

    try {
      if (confirm) {
        await axiosInstance.delete(`/barang/${kode}`)
        window.location.reload()
      }
      return
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getBarang()
    return () => {
      // cleanup
      setBarang([])
    };
  }, [])

  return (
    <div>
      <h1 className='text-4xl'>Barang</h1>

      <hr className='my-4 border-t-2' />

      <div className='my-4'>
        <Link to={'create'} className='px-5 py-2 bg-green-500 rounded-md text-green-50'>tambah barang</Link>
      </div>

      <div>
        { loading && 'loading ...' }
        { !loading && (
          <table className='w-full text-left border border-collapse table-auto border-slate-500'>
          <thead className='text-slate-100'>
            <tr>
              <th className='p-4 bg-slate-400'>KODE</th>
              <th className='p-4 bg-slate-400'>NAMA</th>
              <th className='p-4 bg-slate-400'>KATEGORI</th>
              <th className='p-4 bg-slate-400'>HARGA</th>
              <th className='p-4 bg-slate-400'>action</th>
            </tr>
          </thead>
          <tbody className='text-slate-200'>
            { barang.map((item) => (
              <tr key={item.id}>
                <td className='p-4 bg-slate-600'>{item.kode}</td>
                <td className='p-4 bg-slate-600'>{item.nama}</td>
                <td className='p-4 bg-slate-600'>{item.kategori}</td>
                <td className='p-4 bg-slate-600'>{item.harga}</td>
                <td className='p-4 bg-slate-600'>
                  <Link to={`/barang/${item.kode}`} className='mr-4 text-green-400 underline hover:text-green-500'>edit</Link>
                  |
                  <button type='button' onClick={() => deleteBarang(item.kode)} className='ml-4 text-red-400 underline hover:text-red-500'>delete</button>
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

export default Barang