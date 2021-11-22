import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profiles: [],
    },
    reducers: {
        addProfile: (state, action) => {
            state.profiles = [...state.profiles, action.payload];
        },
        updateProfile: (state, action) => {
            const { id, phone, description, image } = action.payload;

            const existProfile = state.profiles.find(n => n.id === id);
            if (existProfile) {
                existProfile.phone = phone;
                existProfile.description = description;
                existProfile.image = image;
            }
        },
    },
});

export const { addProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
