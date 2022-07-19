import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../axios'

function PenjualanDetail() {
  const [penjualan, setPenjualan] = useState({})
  const [loading, setLoading] = useState(true)

  const param = useParams()

  const getPenjualan = async (nota) => {
    try {
      const { data: { penjualan } } = await axiosInstance.get(`/penjualan/${nota}`)
      setPenjualan(penjualan)
      setLoading(false)
    } catch (e) {
      setLoading(true)
      console.log(e.message)
    }
  }

  useEffect(() => {
    getPenjualan(param.nota)
  }, [param])

  return (
    <div>
      <h1 className='text-4xl'>Penjualan - detail</h1>
      <p className='mt-4 text-lg'>{penjualan.id_nota}</p>

      <hr className='my-4 border-t-2' />

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
              <tr>
                <td className='p-4 bg-slate-600'>{penjualan.id_nota}</td>
                <td className='p-4 bg-slate-600'>{penjualan.tgl}</td>
                <td className='p-4 bg-slate-600'>{penjualan.kode_pelanggan}</td>
                <td className='p-4 bg-slate-600'>{penjualan.subtotal}</td>
                <td className='p-4 bg-slate-600'>
                  <Link to={`/penjualan/${penjualan.id_nota}/edit`} className='mr-4 text-green-400 underline hover:text-green-500'>edit</Link>
                </td>
              </tr>
          </tbody>
        </table>
        ) }
      </div>


      <h2 className='mt-8 text-3xl'>List Penjualan</h2>

      <hr className='my-4 border-t-2' />

      <div>
        { loading && 'loading ...' }
        { !loading && (
          <table className='w-full text-left border border-collapse table-fixed border-slate-500'>
          <thead className='text-slate-100'>
            <tr>
              <th className='p-4 bg-slate-400'>NOTA</th>
              <th className='p-4 bg-slate-400'>KODE BARANG</th>
              <th className='p-4 bg-slate-400'>QTY</th>
            </tr>
          </thead>
          <tbody className='text-slate-200'>
            { penjualan.item_penjualan.map((item) => (
              <tr key={item.id}>
                <td className='p-4 bg-slate-600'>{item.nota}</td>
                <td className='p-4 bg-slate-600'>{item.kode_barang}</td>
                <td className='p-4 bg-slate-600'>{item.qty}</td>
              </tr>
            )) }
          </tbody>
        </table>
        ) }
      </div>
    </div>
  )
}

export default PenjualanDetail