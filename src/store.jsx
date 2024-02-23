import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './component/modal/modalSlice'

export default configureStore({
  reducer: {
    modal: modalReducer
  },
})