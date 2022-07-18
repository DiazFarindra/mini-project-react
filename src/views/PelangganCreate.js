import React from 'react'

function PelangganCreate() {
  return (
    <div className='flex justify-center'>
        <div className='w-1/3 p-5 border-2 border-blue-400 rounded-md'>
            <h1 className='text-3xl font-semibold text-slate-700'>Tambah Pelanggan</h1>
            <hr className='my-4 border-t-2' />
            <form>
                <div className='mx-0 my-5'>
                    <label htmlFor="nama" className='block text-lg font-medium text-slate-700'>Nama</label>
                    <input type="text" name='nama' id='nama' className='w-full px-2 py-2 my-2 border rounded-md border-slate-400 form-input' placeholder='nama ...' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default PelangganCreate