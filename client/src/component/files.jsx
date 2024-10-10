import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removefile } from "../redux/fileslice";
import { NavLink } from "react-router-dom";

function Files() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const [file, setFiles] = useState(files);
  const [searchText, setSearchText] = useState("");
  const searchfile = () => {
    const result = files.filter((file) =>
      file.filename.toLowerCase().includes(searchText.toLowerCase())
    );
    if (result.length != 0) {
      setFiles(result);
    } else {
      setFiles("");
    }
  };

  useEffect(() => {
    setFiles(files);
  }, [files]);

  function deletefile(filesid) {
    dispatch(removefile(filesid));
  }
  return (
    <div className="mt-7 flex flex-col items-center content-center w-[1000px] h-full bg-zinc-900 text-white">
      <div className="flex w-[1000px] self-center">
        <input
          type="text"
          className="text-white w-full px-4 py-2 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
          placeholder="Search files"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button 
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300" 
          onClick={searchfile}
        >
          Search
        </button>
      </div>
      {file.length === 0 ? (
        <h1 className="mt-10 text-xl font-semibold">No files found</h1>
      ) : (
        file.map((file) => (
          <div
            className="flex flex-row justify-between items-start gap-4 w-[1000px] mt-10 p-4 bg-gray-800 text-white rounded-lg shadow-md"
            key={file.id}
          >
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">{file.filename}</h1>
              <h5 className="text-sm text-gray-400 mt-2">{file.content}</h5>
            </div>
            <div className="flex items-center space-x-2">
              <NavLink 
                to={"/viewfile?fileid="+file.id}
                className="rounded-lg px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                View
              </NavLink>
              <button
                className="rounded-lg px-3 py-1 text-white bg-red-600 hover:bg-red-700 transition duration-300"
                onClick={() => deletefile(file.id)}
              >
                Delete
              </button>
              <NavLink 
                to={"/?fileid="+file.id}
                className="rounded-lg px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                Edit
              </NavLink>
              <button
                className="rounded-lg px-3 py-1 text-white bg-green-600 hover:bg-green-700 transition duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(file?.content);
                  toast.success(file.content + " successfully copied");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Files;
