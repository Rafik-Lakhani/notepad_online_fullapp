import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './component/navbar'
import Files from './component/files'
import Home from './component/Home'
import Viewfile from './component/viewfile'

const router=createBrowserRouter(
    [
        { path: '/', 
          element:
          <div>
            <Navbar/>
            <Home/>
          </div>
        },
        { path: '/file',
          element: 
          <div>
            <Navbar/> 
            <Files/>
          </div>
        },
        { path: '/viewfile',
          element: 
          <div>
            <Navbar/> 
            <Viewfile/>
          </div>
        },

    ]
);

function App() {
  return (
    <div className='bg-zinc-900 min-h-screen w-full text-white flex flex-col items-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
