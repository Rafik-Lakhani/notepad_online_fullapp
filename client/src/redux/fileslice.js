import { createSlice } from '@reduxjs/toolkit'
import { useState } from 'react';
import toast from "react-hot-toast";

const initialState = {
  files: [] ,// get files from server on app start
  // files: [],  // initialize files array with empty array
}

// implement your API call here

// here call api to change file file changes
async function filechnages(files) {
  console.log("Files being sent:", files);
  // implement your API call here
  return await fetch(`${String(import.meta.env.VITE_API_URL)}filechange`,
    { headers: { "Content-Type": "application/json" }, method: "POST", body: files })
    .then(async response => {
      if (response.ok) {
        return await response.json();
      }
      else {
        return false;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      return error;
    });
}



export const file = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setInitialFiles: (state, action) => {
      state.files = action.payload;
    },
    addfile: (state, data) => {
      const file = data.payload
      state.files.push(file)
      // localStorage.setItem('file', JSON.stringify(state.files))
      const ans = filechnages(JSON.stringify(state.files))
      ans ? toast.success("File Create Successfully") : toast.error("someting error please try again");
    },
    removefile: (state, data) => {
      const id = data.payload;
      const afterremove = state.files.filter(file => file.id != id);
      state.files = afterremove;
      // localStorage.setItem('file', JSON.stringify(state.files))
      const ans = filechnages(JSON.stringify(state.files))
      ans ? toast.success("File Delete Successfully") : toast.error("someting error please try again");
    },

    updatefile: (state, action) => {
      const fileUpdate = action.payload;
      const index = state.files.findIndex((file) => file.id === fileUpdate.id);
      if (index !== -1) {
        state.files[index] = fileUpdate;
        // localStorage.setItem('file', JSON.stringify(state.files));
        const ans = filechnages(JSON.stringify(state.files))
        ans ? toast.success("File update Successfully") : toast.error("someting error please try again");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addfile, removefile, updatefile ,setInitialFiles} = file.actions
export default file.reducer