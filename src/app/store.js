import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../redux/coinSlice'
import mainReducer from '../redux/mainSlice'

export const store = configureStore({
  reducer: {
      coin: coinReducer,
      data: mainReducer,
  },
})