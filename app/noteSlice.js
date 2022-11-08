

import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
  name: 'zametki',
  initialState: {
    value: [],
  },
  reducers: {
    addNote: (state,action)=>{  
         state.value.push(action.payload) 
        }
    ,
    delNote: (state,action) => {
      state.value.splice(action.payload-1,1)
    },
    editableNote: (state,action) => {
      state.value.splice(action.payload.id-1,1,action.payload.new)
    }
   
  },
});

export const { addNote, delNote, editableNote} = noteSlice.actions;



export const selectNote = state => state.note.value;

export default noteSlice.reducer;