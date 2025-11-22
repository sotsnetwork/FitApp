import { useDarkMode } from '../contexts/DarkModeContext';
import { lightColors, darkColors } from '../theme/tokens';

export function useTheme() {
  const { isDarkMode } = useDarkMode();
  return {
    colors: isDarkMode ? darkColors : lightColors,
    isDarkMode,
  };
}

