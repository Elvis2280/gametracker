import { useMutation } from '@tanstack/react-query';
import { backendApi } from '@/utils/axiosInstances';
import { toast } from 'react-toastify';

export const useDeleteGame = (onSuccess?: () => void): useDeleteGameReturn => {
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await backendApi.delete(`games/${id}`);
    },
    onSuccess: () => {
      toast.success('Juego eliminado correctamente!');
      onSuccess && onSuccess();
    },
    onError: () => {
      toast.error('Vuelve a intentarlo');
    },
  });

  return {
    handleDeleteGame: mutate,
  };
};

interface useDeleteGameReturn {
  handleDeleteGame: (id: number) => void;
}
