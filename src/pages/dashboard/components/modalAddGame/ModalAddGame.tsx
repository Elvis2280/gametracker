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
import useApiGame from '../../hooks/useApiGame';
import { gameGenres, platformList, statusList } from '@/utils/constants';
import { saveGameFunctionType } from '../../hooks/useGameData';
import {
  genresTypes,
  platformsTypes,
  statusTypes,
} from '@/types/general/general';
import { gameFields, typeUseApiGame } from '@/types/hooks/typeUseApiGame';
import { toast } from 'react-toastify';

type Props = {
  isActived: boolean;
  handleModal: () => void;
  reloadGames: () => void;
  handleSaveGame: saveGameFunctionType;
};

export default function ModalAddGame({
  isActived,
  handleModal,
  reloadGames,
  handleSaveGame,
}: Props) {
  const {
    debounceSearch,
    isSearchFetching,
    searchGamesData,
    handleSelectGame,
    selectedGame,
    register,
    handleSubmit,
    errors,
    resetGameSelection,
  }: typeUseApiGame = useApiGame();

  return (
    <div>
      <Modal backdrop="blur" isOpen={isActived} onClose={handleModal}>
        <ModalContent>
          <form
            onSubmit={() => {
              handleSubmit((e: gameFields) => {
                handleSaveGame(
                  {
                    ...e,
                    platforms: e.platforms.split(',') as platformsTypes[],
                    genres: e.genres.split(',') as genresTypes[],
                    gameDescription: e.gameDescription ?? '',
                    status: (e.status as statusTypes) ?? '',
                  },
                  () => {
                    reloadGames();
                    handleModal();
                    resetGameSelection();
                  }
                ).catch(() => toast.error('Error al guardar el juego'));
              });
            }}
          >
            <ModalHeader>Add Game</ModalHeader>
            <ModalBody>
              <div className=" flex flex-col gap-y-3">
                <Autocomplete
                  disabled={isSearchFetching}
                  startContent={<IoGameControllerOutline />}
                  label="search a game to add"
                  onInputChange={debounceSearch}
                  className="mb-8"
                  onSelectionChange={(gameSelectedId) =>
                    handleSelectGame(Number(gameSelectedId))
                  }
                  isInvalid={Boolean(errors.gamePicture)}
                  errorMessage={errors.gamePicture?.message}
                  value={selectedGame?.id ?? ''}
                >
                  {(searchGamesData?.results ?? []).map((game) => {
                    return (
                      <AutocompleteItem value={game.id} key={game.id}>
                        {game.name}
                      </AutocompleteItem>
                    );
                  })}
                </Autocomplete>
                <Input
                  disabled
                  label="Title"
                  value={selectedGame?.name ?? ''}
                  isInvalid={Boolean(errors.gameTitle)}
                  errorMessage={errors.gameTitle?.message}
                  {...register('gameTitle')}
                />
                <Textarea
                  label="Description"
                  isInvalid={Boolean(errors.gameDescription)}
                  errorMessage={errors.gameDescription?.message}
                  {...register('gameDescription')}
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
                  isInvalid={Boolean(errors.genres)}
                  errorMessage={errors.genres?.message}
                  selectionMode="multiple"
                  label="Categories"
                  {...register('genres')}
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
