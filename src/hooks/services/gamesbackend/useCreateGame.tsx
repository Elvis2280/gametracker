import { useMutation } from '@tanstack/react-query';
import { CreateGameType, UpdateGameType } from '@/types/general/games';
import { backendApi } from '@/utils/axiosInstances';
import { toast } from 'react-toastify';
import { useSessionData } from '@/context/SessionContext';

export const useCreateGame = (onSuccess?: () => void): useCreateGameReturn => {
  const { email } = useSessionData();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: CreateGameType) => {
      const { platforms, tags } = transformGameTagsPlatformData(data);

      return await backendApi.post('games', {
        ...data,
        platforms,
        tags,
        email,
      });
    },
    onSuccess: () => {
      toast.success('Juego agregado correctamente!');
      onSuccess && onSuccess();
    },
    onError: () => {
      toast.error('Vuelve a intentarlo');
    },
  });

  const { mutate: updateGame } = useMutation({
    mutationFn: async (data: UpdateGameType) => {
      const { platforms, tags } = transformGameTagsPlatformData(data);

      return await backendApi.put('games/' + data.id, {
        ...data,
        platforms,
        tags,
        email,
      });
    },
    onSuccess: () => {
      toast.success('Juego actualizado correctamente!');
      onSuccess && onSuccess();
    },
    onError: () => {
      toast.error('Vuelve a intentarlo');
    },
  });

  const transformGameTagsPlatformData = (data: CreateGameType) => {
    const platforms = data.platforms.map((platform: string) => {
      return {
        name: platform,
        iconName: platform,
      };
    });

    const tags = data.tags.map((tag: string) => {
      return {
        name: tag,
      };
    });
    return {
      platforms,
      tags,
    };
  };
  return {
    isCreatingGame: isPending,
    handleCreateGame: mutate,
    handleUpdateGame: updateGame,
  };
};

interface useCreateGameReturn {
  isCreatingGame: boolean;
  handleCreateGame: (data: CreateGameType) => void;
  handleUpdateGame: (data: UpdateGameType) => void;
}
