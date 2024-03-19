import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendApi } from '@/utils/axiosInstances';
import { useMutation } from '@tanstack/react-query';
import { loginResponseDto } from '@/types/responses/userResponseDto';
import { AxiosError } from 'axios';

export default function useSession(): useSessionReturn {
  const navigate = useNavigate();

  const { mutate: signupMutate } = useMutation({
    mutationFn: async (data: signUpDataType) => {
      const { username, password, email } = data;
      return await backendApi.post('signup', { username, email, password });
    },
    onSuccess: () => {
      toast.success('Usuario creado correctamente');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear el usuario');
    },
  });

  const { mutate: loginMutate } = useMutation({
    mutationFn: async (data: loginDataType): Promise<loginResponseDto> => {
      const { password, email } = data;
      return await backendApi.post('login', { email, password });
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data?.data.token || '');
      toast.success('Sesión iniciada correctamente');
      navigate('/home');
    },
    onError: (error: AxiosError<{ error: string | undefined }>) => {
      toast.error(error?.response?.data.error || 'Error al iniciar sesión');
    },
  });

  const logOut = (): void => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    backendApi.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/home');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  return {
    signupHanler: signupMutate,
    loginHandler: loginMutate,
    logOut,
  };
}

interface useSessionReturn {
  signupHanler: (data: signUpDataType) => void;
  loginHandler: (data: loginDataType) => void;
  logOut: () => void;
}

type signUpDataType = {
  username: string;
  email: string;
  password: string;
};

type loginDataType = {
  email: string;
  password: string;
};
