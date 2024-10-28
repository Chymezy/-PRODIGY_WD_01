import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMenuOpen: boolean;
  isLoading: boolean;
  activeSection: string;
  scrollPosition: number;
}

const initialState: UIState = {
  isMenuOpen: false,
  isLoading: false,
  activeSection: 'home',
  scrollPosition: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
  },
});

export const { toggleMenu, setLoading, setActiveSection, setScrollPosition } = uiSlice.actions;
export default uiSlice.reducer;
