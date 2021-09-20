import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    coins: [] ,
    status: 'idle',
    select: {}
};

export const getDataAsync = createAsyncThunk(
    'fetchData',
    async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets").then((res)=> res.json())        
        console.log(response.data)  
        return response.data;
      } catch (err) {
        console.log(err)        
      }
    }
);

export const mainSlice = createSlice({
    name: 'main',
    initialState, 
    reducers:{
      selectCoin: (state, action)=>{                   
        state.select = action.payload
      },
    },   
    extraReducers: {
      [getDataAsync.fulfilled]: (state, action) => {         
          state.coins = action.payload;         
          state.status = "fin";       
      },     
    }
});
export const { selectCoin } = mainSlice.actions;
export const mainData = (state) => state;
export default mainSlice.reducer