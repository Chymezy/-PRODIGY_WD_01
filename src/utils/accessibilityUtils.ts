// Accessible color combinations that meet WCAG contrast requirements
export const accessibleColors = {
  text: {
    primary: {
      light: 'text-gray-900', // High contrast for light mode
      dark: 'dark:text-gray-100' // High contrast for dark mode
    },
    secondary: {
      light: 'text-gray-700',
      dark: 'dark:text-gray-200'
    },
    accent: {
      light: 'text-purple-700',
      dark: 'dark:text-purple-300'
    }
  },
  background: {
    primary: {
      light: 'bg-white',
      dark: 'dark:bg-gray-900'
    },
    secondary: {
      light: 'bg-gray-50',
      dark: 'dark:bg-gray-800'
    }
  },
  button: {
    primary: {
      base: 'bg-purple-700 text-white hover:bg-purple-800',
      dark: 'dark:bg-purple-600 dark:hover:bg-purple-700'
    },
    secondary: {
      base: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      dark: 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
    }
  }
};
