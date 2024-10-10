import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function Viewfile() {
    const [filename, Setfilename] = useState("");
  const [filecontent, Setfilecontent] = useState("");
  const [paramer,setParamer]=useSearchParams();
  const fileid=paramer.get("fileid");
  const allfile= useSelector((state)=> state.files.files)

  const file=allfile.find((f)=>f.id==fileid)
  useEffect(()=>{
    Setfilename(file.filename)
    Setfilecontent(file.content)
  },[file])


  return (
    <div className="mt-5 w-[1000px] text-white flex flex-col gap-4 max-w-2xl mx-auto p-6 bg-zinc-900 rounded-lg shadow-md">
      <input
        className="text-white w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
        disabled
        type="text"
        placeholder="Enter File Name"
        onChange={(e) => Setfilename(e.target.value)}
        value={filename}
      />
      <div className="relative">
        <textarea
          className="text-white w-full h-64 px-4 py-2 border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
          disabled
          placeholder="Enter File Content"
          onChange={(e) => Setfilecontent(e.target.value)}
          value={filecontent}
        />
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(filecontent);
            toast.success("Content copied to clipboard");
          }}
        >
          Copy
        </button>
      </div>
    </div>
  )
}

export default Viewfile