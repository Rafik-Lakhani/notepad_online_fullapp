import { configureStore } from '@reduxjs/toolkit'
import file from './redux/fileslice.js'

export const files = configureStore({
  reducer: {
    files: file,
  },
})