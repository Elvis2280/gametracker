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
import {
  gamesApiDto,
  gamesApiResponseDto,
} from '../../../../types/responses/gameResponseDto';
import {
  gameGenres,
  platformList,
  statusList,
} from '../../../../utils/constants';
import useGameData from '../../hooks/useGameData';

type Props = {
  isActived: boolean;
  handleModal: () => void;
  reloadGames: () => void;
};
/* eslint-disable @typescript-eslint/no-explicit-any */

type apiGameHook = {
  debounceSearch: (query: string) => void;
  isSearchFetching: boolean;
  searchGamesData: gamesApiResponseDto | undefined;
  handleSelectGame: (gameId: number) => void;
  selectedGame: gamesApiDto | null;
  register: any;
  handleSubmit: any;
  errors: any;
  resetGameSelection: () => void;
};

export default function ModalAddGame({
  isActived,
  handleModal,
  reloadGames,
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
  }: apiGameHook = useApiGame();

  const { handleSaveGame } = useGameData();

  return (
    <div>
      <Modal backdrop="blur" isOpen={isActived} onClose={handleModal}>
        <ModalContent>
          <form
            onSubmit={handleSubmit((e: any) => {
              handleSaveGame(
                {
                  ...e,
                  platforms: e.platforms.split(','),
                  genres: e.genres.split(','),
                },
                () => {
                  reloadGames();
                  handleModal();
                  resetGameSelection();
                },
              );
            })}
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
                  isInvalid={Boolean(errors.image)}
                  errorMessage={errors.image?.message}
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
                  isInvalid={Boolean(errors.title)}
                  errorMessage={errors.title?.message}
                  {...register('game_title')}
                />
                <Textarea
                  label="Description"
                  isInvalid={Boolean(errors.description)}
                  errorMessage={errors.description?.message}
                  {...register('game_description')}
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
                  isInvalid={Boolean(errors.categories)}
                  errorMessage={errors.categories?.message}
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
                  isInvalid={Boolean(errors.platform)}
                  errorMessage={errors.platform?.message}
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
