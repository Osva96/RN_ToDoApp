import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    removeNote: (state, action) => {
      const newNotes = state.notes.filter(n => n.id !== action.payload);
      state.notes = newNotes;
    },
  },
});

export const { addNote, removeNote } = noteSlice.actions;

export default noteSlice.reducer;
