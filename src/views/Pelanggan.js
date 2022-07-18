import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import axiosInstance from '../axios'

function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([])
  const [loading, setLoading] = useState(true)

  const getPelanggan = async () => {
    try {
      const { data: { pelanggan } } = await axiosInstance.get('/pelanggan')
      setPelanggan(pelanggan)
      setLoading(false)
    } catch (e) {
      setLoading(true)
      console.log(e.message)
    }
  }

  useEffect(() => {
    getPelanggan()
    // return () => {
    //   // cleanup
    //   setPelanggan([])
    // };
  }, [])

  return (
    <div>
      <h1 className='text-4xl'>Pelanggan</h1>

      <hr className='my-4 border-t-2' />

      <div className='my-4'>
        <Link to={'create'} className='px-5 py-2 bg-green-500 rounded-md text-green-50'>tambah pelanggan</Link>
      </div>

      <Outlet />

      <div>
        { loading && 'loading ...' }
        { !loading && (
          <table className='w-full text-left border border-collapse table-auto border-slate-500'>
          <thead className='text-slate-100'>
            <tr>
              <th className='p-4 bg-slate-400'>ID PELANGGAN</th>
              <th className='p-4 bg-slate-400'>NAMA</th>
              <th className='p-4 bg-slate-400'>DOMISILI</th>
              <th className='p-4 bg-slate-400'>JENIS KELAMIN</th>
            </tr>
          </thead>
          <tbody className='text-slate-200'>
            { pelanggan.map((item) => (
              <tr key={item.id}>
                <td className='p-4 bg-slate-600'>{item.id_pelanggan}</td>
                <td className='p-4 bg-slate-600'>{item.nama}</td>
                <td className='p-4 bg-slate-600'>{item.domisili}</td>
                <td className='p-4 bg-slate-600'>{item.jenis_kelamin}</td>
              </tr>
            )) }
          </tbody>
        </table>
        ) }
      </div>
    </div>
  )
}

export default Pelanggan