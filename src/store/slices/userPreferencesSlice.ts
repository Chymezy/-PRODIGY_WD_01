import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  darkMode: boolean;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
}

const initialState: UserPreferencesState = {
  darkMode: false,
  language: 'en',
  fontSize: 'medium',
  animations: true,
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    toggleAnimations: (state) => {
      state.animations = !state.animations;
    },
  },
});

export const { toggleDarkMode, setLanguage, setFontSize, toggleAnimations } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
