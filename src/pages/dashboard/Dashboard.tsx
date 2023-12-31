import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@nextui-org/react';
import { FiFilter } from 'react-icons/fi';
import GameCard from '@/components/gameCard/GameCard';
import useSession from '@/hooks/session/useSession';
import useGameData from './hooks/useGameData';
import { gameListResponseDto } from '@/types/responses/gameResponseDto';
import { getAvatarLetter } from './utils/gamesService';
import ModalAddGame from './components/modalAddGame/ModalAddGame';
import useToggle from '@/hooks/useToggle/useToggle';
import TabsGames from './components/TabsGames';
import ModalEditGame from './components/ModalEditGame';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { session, logoutHandler } = useSession();
  const {
    games,
    getAllGamesData,
    tabsCount,
    handleSetSelectedGame,
    formikEditGame,
    handleSaveGame,
    handleDeleteGame,
    handleGameSearch,
  } = useGameData();

  const { value: addModalBool, toggleValue: toggleAddModalValue } = useToggle();
  const { value: editModalBool, toggleValue: toggleEditModalValue } =
    useToggle();

  return (
    <div className=" min-h-screen">
      <div className=" px-4 pt-4 pb-20">
        <div className="flex justify-between  w-full">
          <h1 className=" text-2xl font-bold text-center">GameTracker</h1>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Avatar name={getAvatarLetter(session?.user?.email ?? '')} />
            </PopoverTrigger>
            <PopoverContent>
              <Button
                onClick={() => {
                  logoutHandler().catch(() =>
                    toast.error('Error al cerrar sesión')
                  );
                }}
                size="sm"
                variant="light"
              >
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <div className=" flex items-center gap-x-4 mt-8">
          <Autocomplete
            variant="bordered"
            color="primary"
            size="sm"
            placeholder="Search your game"
            onInputChange={(value) => {
              handleGameSearch(value)?.catch(() =>
                toast.error(`Error al buscar ${value}`)
              );
            }}
          >
            {games?.data?.map((game: gameListResponseDto) => {
              return (
                <AutocompleteItem key={game.id} value={game.id}>
                  {game.game_title}
                </AutocompleteItem>
              );
            }) ?? []}
          </Autocomplete>
          <Button
            className=" text-xl"
            variant="bordered"
            color="primary"
            isIconOnly
          >
            <FiFilter />
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-y-3">
          <TabsGames
            onChangeTab={() => {
              getAllGamesData().catch(() => {
                toast.error('We could not get the games');
              });
            }}
            activeCount={tabsCount.active}
            completedCount={tabsCount.completed}
          />
          {games?.data ? (
            games?.data?.map((game: gameListResponseDto) => {
              return (
                <GameCard
                  key={game.id}
                  title={game.game_title}
                  image={game.game_picture}
                  platforms={game.platforms}
                  genres={game.genres}
                  status={game.status}
                  editGameHandle={() => {
                    handleSetSelectedGame(game.id);
                    toggleEditModalValue();
                  }}
                />
              );
            })
          ) : (
            <div className=" flex-1 flex justify-center items-center h-full">
              <Spinner size="lg" />
            </div>
          )}
        </div>
        <div className=" relative">
          <Button
            onClick={toggleAddModalValue}
            color="primary"
            className=" fixed bottom-4 z-10 w-4/5 left-2/4 -translate-x-2/4"
          >
            Add a new game
          </Button>
          <ModalAddGame
            handleSaveGame={handleSaveGame}
            isActived={addModalBool}
            handleModal={toggleAddModalValue}
            reloadGames={() => {
              getAllGamesData().catch(() => {});
            }}
          />
          <ModalEditGame
            isActived={editModalBool}
            handleModal={toggleEditModalValue}
            formikEditGame={formikEditGame}
            handleDeleteGame={() => {
              handleDeleteGame().catch(() => toast.error('Error al eliminar'));
            }}
          />
        </div>
      </div>
    </div>
  );
}
