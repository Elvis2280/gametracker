import {
  Autocomplete,
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
import useGameData from '@/hooks/services/gamesbackend/useGetGame';
import { GameResponseType } from '@/types/responses/gameResponseDto';
import ModalAddGame from './components/modalAddGame/ModalAddGame';
import useToggle from '@/hooks/useToggle/useToggle';
import ModalEditGame from './components/ModalEditGame';
import { useSessionData } from '@/context/SessionContext';
import { ReactElement, useEffect, useState } from 'react';
import {
  genresTypes,
  platformsTypes,
  statusTypes,
} from '@/types/general/general';
import { useDeleteGame } from '@/hooks/services/gamesbackend/useDeleteGame';

export default function Dashboard() {
  const { logOut } = useSession();
  const { username } = useSessionData();
  const { checkSession } = useSessionData();
  const {
    gamesData,
    handleGetGames,
    // games,
    // getAllGamesData,
    // tabsCount,
    // handleSetSelectedGame,
    // formikEditGame,
    // handleSaveGame,
    // handleDeleteGame,
    // handleGameSearch,
  } = useGameData();

  const { value: addModalBool, toggleValue: toggleAddModalValue } = useToggle();
  const { value: editModalBool, toggleValue: toggleEditModalValue } =
    useToggle();
  const [editSelectedGame, setEditSelectedGame] = useState<GameResponseType>();
  const { handleDeleteGame } = useDeleteGame(handleGetGames as () => void);

  useEffect(() => {
    if (!username) {
      checkSession();
    }
  }, [username]);

  return (
    <div className=" min-h-screen">
      {/*logo and logout*/}
      <div className=" flex flex-col px-4 pt-4 pb-20 min-h-screen">
        <header className="flex justify-between">
          <h1 className=" text-2xl font-bold text-center">GameTracker</h1>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Avatar name={username.charAt(0).toUpperCase()} />
            </PopoverTrigger>
            <PopoverContent>
              <Button
                onClick={() => {
                  logOut();
                }}
                size="sm"
                variant="light"
              >
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        </header>

        {/*search and filter*/}
        <nav className=" flex items-center gap-x-4 mt-8">
          <Autocomplete
            variant="bordered"
            color="primary"
            size="sm"
            placeholder="Search your game"
            onInputChange={() => {
              // handleGameSearch(value)?.catch(() =>
              //   toast.error(`Error al buscar ${value}`)
              // );
            }}
          >
            {/*{games?.data?.map((game: gameListResponseDto) => {*/}
            {/*  return (*/}
            {/*    <AutocompleteItem key={game.id} value={game.id}>*/}
            {/*      {game.game_title}*/}
            {/*    </AutocompleteItem>*/}
            {/*  );*/}
            {/*}) ?? []}*/}
          </Autocomplete>
          <Button
            className=" text-xl"
            variant="bordered"
            color="primary"
            isIconOnly
          >
            <FiFilter />
          </Button>
        </nav>

        {/*games list*/}
        <main className="mt-6 flex flex-col gap-y-3 flex-1 ">
          {/*<TabsGames*/}
          {/*  onChangeTab={() => {*/}
          {/*    // getAllGamesData().catch(() => {*/}
          {/*    //   toast.error('We could not get the games');*/}
          {/*    // });*/}
          {/*  }}*/}
          {/*  activeCount={tabsCount.active}*/}
          {/*  completedCount={tabsCount.completed}*/}
          {/*/>*/}
          <GameFetchStatusComponent
            isError={gamesData.isGetGamesError}
            isLoading={gamesData.isGetGamesLoading}
          >
            {gamesData.data?.map((game) => {
              const platforms = game.Platforms.map((platform) => {
                return platform.name;
              });

              const tags = game.Tags.map((tag) => {
                return tag.name;
              });

              return (
                <GameCard
                  key={game.ID}
                  title={game.name}
                  image={game.image}
                  platforms={platforms as platformsTypes[]}
                  genres={tags as genresTypes[]}
                  status={game.status as statusTypes}
                  editGameHandle={() => {
                    setEditSelectedGame(game);
                    toggleEditModalValue();
                  }}
                />
              );
            }) ?? []}
          </GameFetchStatusComponent>
        </main>

        {/*add game sticky button*/}
        <div className=" relative">
          <Button
            onClick={toggleAddModalValue}
            color="primary"
            className=" fixed bottom-4 z-10 w-4/5 left-2/4 -translate-x-2/4"
          >
            Add a new game
          </Button>
          <ModalAddGame
            isActived={addModalBool}
            handleModal={toggleAddModalValue}
            reloadGames={() => {
              handleGetGames().catch(() => {});
            }}
          />
          <ModalEditGame
            onSuccessfulEdit={handleGetGames as () => void}
            isActived={editModalBool}
            handleModal={toggleEditModalValue}
            game={editSelectedGame as GameResponseType}
            handleDeleteGame={() => {
              handleDeleteGame(editSelectedGame?.ID as number);
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface GameFetchStatusComponentProps {
  isLoading: boolean;
  isError: boolean;
  children: ReactElement | ReactElement[];
}
const GameFetchStatusComponent = ({
  isError,
  isLoading,
  children,
}: GameFetchStatusComponentProps): ReactElement | ReactElement[] => {
  if (isLoading) {
    return (
      <div className=" flex-1 flex justify-center items-center h-32">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" flex-1 flex justify-center items-center h-full">
        <p>Error al cargar los juegos.</p>
      </div>
    );
  }
  return children;
};
