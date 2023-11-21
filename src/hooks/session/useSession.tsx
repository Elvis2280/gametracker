import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/databaseClient';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'react-toastify';

type UserSupa = {
  user: User | null;
  session: Session | null;
};

export default function useSession() {
  const [session, setSession] = useState<UserSupa | null>(null);
  const navegate = useNavigate();

  useMemo(() => {
    if (!session) {
      const storageSession = sessionStorage.getItem('gametrackerSession');
      if (storageSession) {
        const data = JSON.parse(storageSession);
        setSession(data);
      }
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      navegate('/');
    } else {
      navegate('/login');
    }
  }, [session]);

  const loginHandler = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return toast.error('Error al iniciar sesión');
    }

    setSession(data);
    sessionStorage.setItem('gametrackerSession', JSON.stringify(data));
  };

  return { session, loginHandler };
}
