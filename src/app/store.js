import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../redux/coinSlice'

export const store = configureStore({
  reducer: {
      coin: coinReducer
  },
})