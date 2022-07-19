import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios'

function PelangganCreate() {
  const [nama, setNama] = useState('')
  const [domisili, setDomisili] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [formError, setFormError] = useState(false)

  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()

    if (!nama || !domisili || !jenisKelamin) {
      setFormError(true)
      return
    }

    try {
      await axiosInstance.post('/pelanggan', {
        nama,
        domisili,
        jenis_kelamin: jenisKelamin
      })
    } catch (e) {
      console.log(e.message)
    }

    navigate('/pelanggan', { replace: true })
  }

  return (
    <div className='flex justify-center'>
        <div className='w-1/3 p-5 border-2 border-blue-400 rounded-md'>
            <h1 className='text-3xl font-semibold text-slate-700'>Tambah Pelanggan</h1>
            <hr className='my-4 border-t-2' />
            <form onSubmit={submitForm}>
                <div className='mx-0 my-2'>
                    <label htmlFor="nama" className='block text-lg font-medium text-slate-700'>Nama</label>
                    <input type="text" name='nama' id='nama' value={nama} onChange={(e) => setNama(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='nama ...' />
                    { formError && ( <small className='text-red-500'>nama tidak bisa kosong</small> ) }
                </div>
                <div className='mx-0 my-2'>
                    <label htmlFor="domisili" className='block text-lg font-medium text-slate-700'>Domisili</label>
                    <input type="text" name='domisili' id='domisili' value={domisili} onChange={(e) => setDomisili(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`} placeholder='domisili ...' />
                    { formError && ( <small className='text-red-500'>domisili tidak bisa kosong</small> ) }
                </div>
                <div className='mx-0 my-2'>
                    <label htmlFor="jenis_kelamin" className='block text-lg font-medium text-slate-700'>Jenis Kelamin</label>
                    <select name="jenis_kelamin" id="jenis_kelamin" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)} className={`w-full px-2 py-2 my-2 border rounded-md ${formError ? 'border-2 border-red-500' : 'focus:outline-slate-500 border-slate-400'}`}>
                      <option defaultValue={null}>jenis kelamin</option>
                      <option value="pria">pria</option>
                      <option value="wanita">wanita</option>
                    </select>
                    { formError && ( <small className='text-red-500'>jenis kelamin tidak bisa kosong</small> ) }
                </div>
                <button type='submit' className='w-1/4 px-4 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600'>save</button>
            </form>
        </div>
    </div>
  )
}

export default PelangganCreate