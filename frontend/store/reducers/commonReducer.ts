
import { createSlice, PayloadAction } from '@reduxjs/toolkit'








interface StateType {
    result: null | number
}



const initialState:StateType = {
    result: null
}


export const commonSlice = createSlice({
    name: 'commons',
    initialState: initialState,
    reducers: {
      setResult: (state, action) => {
        state.result = action.payload
      },
      resetResult: (state) => {
        state.result = null
      } 
    }
      
    
  })
  
  // Action creators are generated for each case reducer function
  export const {setResult, resetResult} = commonSlice.actions
  
  export default commonSlice.reducer