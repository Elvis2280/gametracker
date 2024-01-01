import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/utils/databaseClient';
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
        const data = JSON.parse(storageSession) as UserSupa;
        setSession(data);
      }
    }
  }, [session]);

  const loginHandler = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    navegate('/');
    if (error) {
      return toast.error('Error al iniciar sesión');
    }

    setSession(data);
    sessionStorage.setItem('gametrackerSession', JSON.stringify(data));
  };

  const checkSession = () => {
    if (!session) {
      navegate('/login');
    }
  };

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      sessionStorage.removeItem('gametrackerSession');
      toast.success('Hasta luego!');
      navegate('/login');
    }
  };

  const resetPasswordHandler = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error('We could not find a user with that email');
    } else {
      toast.success('Check your email for the password reset link');
    }
  };

  const changePasswordHandler = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error)
        throw new Error('Something went wrong, please try again later');
      navegate('/login');
      toast.success('Password changed successfully');
    } catch (error) {
      throw new Error('Something went wrong, please try again later');
    }
  };

  return {
    session,
    loginHandler,
    logoutHandler,
    resetPasswordHandler,
    changePasswordHandler,
    checkSession,
  };
}
