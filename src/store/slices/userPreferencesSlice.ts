import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
}

const initialState: UserPreferencesState = {
  language: 'en',
  fontSize: 'medium',
  animations: true,
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
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

export const { setLanguage, setFontSize, toggleAnimations } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
