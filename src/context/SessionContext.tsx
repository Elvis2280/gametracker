import { createContext, ReactElement, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface contextType {
  username: string;
  email: string;
  checkSession: () => boolean;
}

interface Props {
  children: ReactElement;
}

const SessionContextCreate = createContext<contextType>({
  username: '',
  email: '',
  checkSession: () => false,
});
export const SessionContext = ({ children }: Props): ReactElement => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSetData = () => {
    if (!username || !email) {
      const token = localStorage.getItem('token');
      if (!token) return;

      const tokenDecoded = jwtDecode<{
        Username: string;
        Email: string;
        exp: number;
      }>(token);

      console.log(tokenDecoded)

      if (tokenDecoded.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return;
      } // token expired then delete localstorage token and send user to login

      setUsername(tokenDecoded.Username || '');
      setEmail(tokenDecoded.Email || '');
    }
  };

  const checkSession = (): boolean => {
    handleSetData();
    const token = localStorage.getItem('token');
    return Boolean(token);
  };

  return (
    <SessionContextCreate.Provider value={{ username, email, checkSession }}>
      {children}
    </SessionContextCreate.Provider>
  );
};

export const useSessionData = (): contextType => {
  const context = useContext(SessionContextCreate);
  if (!context) {
    throw new Error('useSession must be used within a SessionContext');
  }

  return context;
};
