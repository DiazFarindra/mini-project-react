import React from 'react'
import Header from './components/Header';
import Web from './routes/Web';

function App() {
  return (
    <>
      <Header />
      <div className='container px-8 mx-auto mt-6'>
        <Web />
      </div>
    </>
  );
}

export default App;
