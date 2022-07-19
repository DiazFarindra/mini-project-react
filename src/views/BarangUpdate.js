import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../axios'

function BarangUpdate() {
  const [nama, setNama] = useState('')
  const [kategori, setKategori] = useState('')
  const [harga, setHarga] = useState('')
  const [formError, setFormError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    const getBarang = async () => {
      try {
        const res = await axiosInstance.get(`/barang/${param.kode}`)
        setNama(res.data.barang.nama)
        setKategori(res.data.barang.kategori)
        setHarga(res.data.barang.harga)
        setLoading(false)
      } catch (e) {
        setLoading(true)
        console.log(e.message)

        if (e.response.status === 404) {
          setNotFound(true)
        }
      }
    }

    getBarang()
  }, [param])

  const submitForm = async (e) => {
    e.preventDefault()

    if (!nama || !kategori || !harga) {
      setFormError(true)
      return
    }

    try {
      await axiosInstance.patch(`/barang/${param.kode}`, {
        nama,
        kategori,
        harga,
      })
    } catch (e) {
      console.log(e.message)
    }

    navigate('/barang', { replace: true })
  }

  if (notFound) {
    return (
      <div className='flex'>
        <h1 className='text-6xl'>404 - not found</h1>
      </div>
    )
  }

  return (
    <div className='flex justify-center'>
      <div className='w-1/3 p-5 border-2 border-blue-400 rounded-md'>
        <h1 className='text-3xl font-semibold text-slate-700'>Update Barang</h1>
        <hr className='my-4 border-t-2' />
        { loading && 'loading ...' }
        { !loading && (
          <form onSubmit={submitForm}>
            <div className='mx-0 my-2'>
              <label htmlFor="nama" className='block text-lg font-medium text-slate-700'>Nama</label>
              <input type="text" name='nama' id='nama' value={nama} onChange={(e) => setNama(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='nama ...' />
              { formError && ( <small className='text-red-500'>nama tidak bisa kosong</small> ) }
            </div>
            <div className='mx-0 my-2'>
              <label htmlFor="kategori" className='block text-lg font-medium text-slate-700'>Kategori</label>
              <input type="text" name='kategori' id='kategori' value={kategori} onChange={(e) => setKategori(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='kategori ...' />
              { formError && ( <small className='text-red-500'>kategori tidak bisa kosong</small> ) }
            </div>
            <div className='mx-0 my-2'>
              <label htmlFor="harga" className='block text-lg font-medium text-slate-700'>Harga</label>
              <input type="number" name='harga' id='harga' min='100' value={harga} onChange={(e) => setHarga(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='harga ...' />
              { formError && ( <small className='text-red-500'>harga tidak bisa kosong</small> ) }
            </div>
            <button type='submit' className='w-1/4 px-4 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600'>save</button>
          </form>
        ) }
      </div>
    </div>
  )
}

export default BarangUpdate