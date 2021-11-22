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
    updateNote: (state, action) => {
      const {id, title, text} = action.payload;
      const existNote = state.notes.find(n => n.id === id);
      if (existNote) {
        existNote.title = title;
        existNote.text = text;
      }
    },
  },
});

export const { addNote, removeNote, updateNote } = noteSlice.actions;

export default noteSlice.reducer;
