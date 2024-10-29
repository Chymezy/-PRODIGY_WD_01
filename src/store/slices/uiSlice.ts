import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMenuOpen: boolean;
  activeSection: string;
  scrollPosition: number;
  isDarkMode: boolean;
}

const initialState: UIState = {
  isMenuOpen: false,
  activeSection: 'home',
  scrollPosition: 0,
  isDarkMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleMenu, setActiveSection, setScrollPosition, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
