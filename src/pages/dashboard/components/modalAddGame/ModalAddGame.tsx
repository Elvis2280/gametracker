import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { IoGameControllerOutline } from 'react-icons/io5';
import { gameGenres, platformList, statusList } from '@/utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import addGameSchema from '@/pages/dashboard/schema';
import { useCreateGame } from '@/hooks/services/gamesbackend/useCreateGame';
import useApiGame from '@/hooks/services/gamesbackend/useApiGame';
import { useEffect } from 'react';

type Props = {
  isActived: boolean;
  handleModal: () => void;
  reloadGames: () => void;
};

export default function ModalAddGame({
  isActived,
  handleModal,
  reloadGames,
}: Props) {
  const { handleCreateGame } = useCreateGame(reloadGames);

  const {
    selectedGame,
    handleSelectGame,
    isFetching,
    resetGameSelection,
    handleSearchGame,
    apiGamesData,
  } = useApiGame();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      image: '',
      status: '',
      score: 0,
      tags: '',
      platforms: '',
    },
    resolver: yupResolver(addGameSchema),
  });

  const onSubmit = (data: formType) => {
    handleCreateGame({
      name: data.name,
      description: data.description,
      image: data.image,
      status: data.status,
      score: data.score,
      tags: data.tags.split(','),
      platforms: data.platforms.split(','),
    });
  };

  useEffect(() => {
    setValue('name', selectedGame?.name ?? '');
    setValue('image', selectedGame?.background_image ?? '');
    setValue('score', selectedGame?.metacritic ?? 0);
  }, [selectedGame]);

  console.log(errors)

  return (
    <div>
      <Modal backdrop="blur" isOpen={isActived} onClose={handleModal}>
        <ModalContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add Game</ModalHeader>
            <ModalBody>
              <div className=" flex flex-col gap-y-3">
                <Autocomplete
                  disabled={isFetching}
                  startContent={<IoGameControllerOutline />}
                  label="search a game to add"
                  onInputChange={handleSearchGame}
                  className="mb-8"
                  onSelectionChange={(gameSelectedId) =>
                    handleSelectGame(Number(gameSelectedId))
                  }
                  isInvalid={Boolean(errors.image)}
                  errorMessage={errors.image?.message}
                  value={selectedGame?.id ?? ''}
                >
                  {apiGamesData?.results.map((game) => {
                    return (
                      <AutocompleteItem value={game.id} key={game.id}>
                        {game.name}
                      </AutocompleteItem>
                    );
                  }) ?? []}
                </Autocomplete>
                <Input
                  disabled
                  label="Title"
                  value={selectedGame?.name ?? ''}
                  isInvalid={Boolean(errors.name)}
                  errorMessage={errors.name?.message}
                  {...register('name')}
                />
                <Textarea
                  label="Description"
                  isInvalid={Boolean(errors.description)}
                  errorMessage={errors.description?.message}
                  {...register('description')}
                />
                <Select
                  label="Status"
                  isInvalid={Boolean(errors.status)}
                  errorMessage={errors.status?.message}
                  {...register('status')}
                >
                  {statusList.map((status) => {
                    return (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    );
                  })}
                </Select>
                <Select
                  isInvalid={Boolean(errors.tags)}
                  errorMessage={errors.tags?.message}
                  selectionMode="multiple"
                  label="Categories"
                  {...register('tags')}
                >
                  {gameGenres.map((genre) => {
                    return (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    );
                  })}
                </Select>
                <Select
                  selectionMode="multiple"
                  label="Platform"
                  size="sm"
                  isInvalid={Boolean(errors.platforms)}
                  errorMessage={errors.platforms?.message}
                  {...register('platforms')}
                >
                  {platformList.map((plaform) => {
                    return (
                      <SelectItem key={plaform} value={plaform}>
                        {plaform}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between w-full">
                <Button
                  variant="light"
                  onClick={() => {
                    handleModal();
                    resetGameSelection();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save game
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

interface formType {
  name: string;
  description: string;
  status: string;
  tags: string;
  platforms: string;
  score: number;
  image: string;
}
