import { GlobalStyles } from '../styles/GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Router>
      <GlobalStyles />
      {children}
    </Router>
  );
}
