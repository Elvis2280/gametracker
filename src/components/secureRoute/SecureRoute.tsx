import { useSessionData } from '@/context/SessionContext';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type SecureRouteProps = {
  children: ReactElement;
  redirectPath: string;
};
export const SecureRoute = ({ children, redirectPath }: SecureRouteProps) => {
  const { checkSession } = useSessionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkSession()) {
      navigate(redirectPath);
    } else {
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    }
  }, []);
  return <div>{children}</div>;
};
