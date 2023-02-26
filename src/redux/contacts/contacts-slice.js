import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      const newContact = {
        id: uuidv4(),
        ...action.payload,
      };
      return state.concat(newContact);
    },
    deleteContact: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const {addContact, deleteContact} = contactsSlice.actions;
export default contactsSlice.reducer;