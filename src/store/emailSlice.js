import { createSlice } from '@reduxjs/toolkit'


const getEmails = (key)=>{
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

const initialState = {
  currEmailList: [],
  readedEmail:getEmails("readed"),
  favEmail:getEmails("fav"),
  openedEmail: null,
  selectedCategory: 'all'
}

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setCurrEmail: (state,action) => {
      state.currEmailList = action.payload
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload; // Update category on click
    },
    setReadedEmail: (state, action) => {

      if(!state.readedEmail.some((email)=> email.id === action.payload.id)){
        state.readedEmail.push(action.payload);
        localStorage.setItem('readed', JSON.stringify(state.readedEmail))
      }
        
    },
    setFavEmail: (state, action) => {
       if(!state.favEmail.some((email)=> email.id === action.payload.id)){
        state.favEmail.push(action.payload)
        localStorage.setItem('fav', JSON.stringify(state.favEmail))
       }
    },
    setOpenedEmail:(state,action)=>{
        state.openedEmail = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrEmail, setReadedEmail, setFavEmail, setOpenedEmail, setCategory } = emailSlice.actions

export default emailSlice.reducer