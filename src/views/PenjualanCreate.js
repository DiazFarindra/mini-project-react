import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios'

function PenjualanCreate() {
  const [tgl, setTgl] = useState('')
  const [kodePelanggan, setKodePelanggan] = useState('')
  const [inputFields, setInputFields] = useState([
    { kode_barang: '', qty: '' }
  ])
  const [formError, setFormError] = useState(false)
  const [pelanggan, setPelanggan] = useState([])
  const [barang, setBarang] = useState([])

  const navigate = useNavigate()

  const getPelanggan = async () => {
    const { data: { pelanggan } } = await axiosInstance.get('/pelanggan')
    setPelanggan(pelanggan)
  }

  const getBarang = async () => {
    const { data: { barang } } = await axiosInstance.get('/barang')
    setBarang(barang)
  }

  useEffect(() => {
    getPelanggan()
    getBarang()
    return () => {
      setPelanggan([])
      setBarang([])
    };
  }, [])

  const handleFormChange = (index, event) => {
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
  }

  const addFields = () => {
    let newField = { kode_barang: '', qty: '' }
    setInputFields([...inputFields, newField])
  }

  const removeFields = (index) => {
    let data = [...inputFields]
    data.splice(index, 1)
    setInputFields(data)
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (!tgl || !kodePelanggan || !inputFields[0].kode_barang || !inputFields[0].qty) {
      setFormError(true)
      return
    }

    try {
      await axiosInstance.post('/penjualan', {
        tgl,
        kode_pelanggan: kodePelanggan,
        barang: inputFields
      })
    } catch (e) {
      console.log(e.message)
    }

    navigate('/penjualan', { replace: true })
  }

  return (
    <div className='flex justify-center'>
      <div className='w-1/3 p-5 border-2 border-blue-400 rounded-md'>
        <h1 className='text-3xl font-semibold text-slate-700'>Tambah Barang</h1>
        <hr className='my-4 border-t-2' />
        <form onSubmit={submitForm}>
          <div className='mx-0 my-2'>
              <label htmlFor="tgl" className='block text-lg font-medium text-slate-700'>Tanggal</label>
              <input type="date" name='tgl' id='tgl' value={tgl} onChange={(e) => setTgl(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='tanggal ...' />
              { formError && ( <small className='text-red-500'>tanggal tidak bisa kosong</small> ) }
          </div>
          <div className='mx-0 my-2'>
              <label htmlFor="kode_pelanggan" className='block text-lg font-medium text-slate-700'>Kode Pelanggan</label>
              <select name='kode_pelanggan' id='kode_pelanggan' value={kodePelanggan} onChange={(e) => setKodePelanggan(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='kode pelanggan ...'>
                <option defaultValue={null}>kode pelanggan</option>
                {pelanggan.map((item, index) => (
                  <option key={index} value={item.id_pelanggan}>{item.id_pelanggan}</option>
                ))}
              </select>
              { formError && ( <small className='text-red-500'>kode pelanggan tidak bisa kosong</small> ) }
          </div>
          {inputFields.map((input, index) => (
            <div key={index} className='flex space-x-1'>
              <div className="mx-0 my-2">
                <label htmlFor="kode_barang" className='block text-lg font-medium text-slate-700'>Kode Barang</label>
                <select name='kode_barang' id='kode_barang' value={input.kode_barang} onChange={(event) => handleFormChange(index, event)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='kode pelanggan ...'>
                  <option defaultValue={null}>kode barang</option>
                  {barang.map((item, index) => (
                    <option key={index} value={item.kode}>{item.kode} - {item.nama}</option>
                  ))}
                </select>
              </div>
              <div className="mx-0 my-2">
                <label htmlFor="qty" className='block text-lg font-medium text-slate-700'>qty</label>
                <input type='number' name='qty' id='qty' value={input.qty} onChange={(event) => handleFormChange(index, event)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='qty' />
              </div>
              {inputFields.length !== 1 && (
                <button type='button' className='text-blue-400 underline hover:text-blue-500' onClick={() => removeFields(index)}>remove</button>
              )}
            </div>
          ))}
          <div className='flex space-x-2'>
            <button type='submit' className='w-1/5 p-1 border border-green-400 rounded hover:border-green-600'>submit</button>
            <button type='button' className='w-1/5 p-1 text-white bg-green-400 rounded hover:bg-green-500' onClick={addFields}>add more</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PenjualanCreate