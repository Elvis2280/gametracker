import {
  Autocomplete,
  Avatar,
  Button,
  Image,
  Pagination,
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
import TabsGames from '@/pages/dashboard/components/TabsGames';
import { gameStatus } from '@/utils/constants';

export default function Dashboard() {
  const { logOut } = useSession();
  const { username } = useSessionData();
  const { checkSession } = useSessionData();
  const {
    gamesData,
    handleGetGames,
    count,
    handleSetActiveGames,
    handleSetPage,
    currentPage,
    handleSetSearch,
    search,
    // games,
    // getAllGamesData,
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
  const [tabActive, setTabActive] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    if (!username) {
      checkSession();
    }
  }, [username]);

  const buildListCard = () => {
    const gamesDataFiltered = gamesData.data?.data?.filter((game) => {
      if (tabActive === 'active') {
        return game.status !== gameStatus.completed;
      } else {
        return game.status === gameStatus.completed;
      }
    });

    return (
      gamesDataFiltered?.map((game) => {
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
      }) ?? []
    );
  };

  const totalPages = gamesData.data?.pagination.totalPages ?? 1;

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
            value={search}
            onInputChange={(val) => {
              handleSetSearch(val);
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
          <TabsGames
            onChangeTab={(v) => {
              if (v !== gameStatus.completed.toLowerCase()) {
                setTabActive('active');
                handleSetActiveGames(true);
              } else {
                setTabActive('completed');
                handleSetActiveGames(false);
              }
            }}
            activeCount={(count?.active as number) ?? 0}
            completedCount={(count?.completed as number) ?? 0}
          />
          <GameFetchStatusComponent
            isError={gamesData.isGetGamesError}
            isLoading={gamesData.isGetGamesLoading}
          >
            {buildListCard()}
          </GameFetchStatusComponent>
          {totalPages > 1 && (
            <div className={'flex justify-center items-center py-2'}>
              <Pagination
                page={currentPage}
                total={totalPages}
                onChange={(pag) => {
                  handleSetPage(pag);
                }}
              />
            </div>
          )}
        </main>

        {/*add game sticky button*/}
        <div className="relative">
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
  children: ReactElement[];
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

  if (children.length === 0) {
    return (
      <div className=" flex-1 flex justify-center items-center h-full flex-col gap-4">
        <Image src={'/nogame.svg'} alt="No games" />
        <p className={'text-xl'}>No games in this tab yet.</p>
      </div>
    );
  }
  return children;
};
