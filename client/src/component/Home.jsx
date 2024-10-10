import React, { useEffect, useState } from "react";
import { addfile, setInitialFiles, updatefile } from "../redux/fileslice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


async function fetchFiles() {
  const response = await fetch('http://localhost:3000/', {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  if (response.ok) {
    return await response.json();
  } else {
    return [];
  }
}







function Home() {
  const [filename, Setfilename] = useState("");
  const [filecontent, Setfilecontent] = useState("");
  const [paramer, setParamer] = useSearchParams();
  const fileid = paramer.get("fileid");
  const files = useSelector((state) => state.files.files);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fileid) {
      const file = files.find(file => file.id === fileid);
      Setfilename(file.filename);
      Setfilecontent(file.content);
    }
  }, [fileid, files]);

  function savefile() {
    const filedata = {
      filename: filename,
      content: filecontent,
      modified: new Date().toISOString(),
      created: new Date().toISOString(),
      id: fileid || Date.now().toString(12),
    }
    if (fileid) {
      dispatch(updatefile(filedata));
    } else {
      dispatch(addfile(filedata));
    }
    Setfilename("");
    Setfilecontent("");
  }

  useEffect(() => {
    const loadFiles = async () => {
      const filesFromServer = await fetchFiles();
      dispatch(setInitialFiles(filesFromServer)); // Set the files after fetching
    };
    
    loadFiles();
  }, [dispatch]);
  return (
    <div className="mt-5 flex flex-col gap-4 w-[1000px] max-w-2xl mx-auto p-6 bg-zinc-900 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Enter File Name"
        onChange={(e) => Setfilename(e.target.value)}
        value={filename}
        className="text-white w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
      />
      <div className="relative">
        <textarea
          placeholder="Enter File Content"
          onChange={(e) => Setfilecontent(e.target.value)}
          value={filecontent}
          className="text-white w-full h-64 px-4 py-2 border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
        />
        <button
          onClick={() => Setfilecontent("")}
          className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
        >
          Clear
        </button>
      </div>
      <button 
        onClick={savefile} 
        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
      >
        {fileid ? "Update File" : "Save File"}
      </button>
    </div>
  );
}

export default Home;
