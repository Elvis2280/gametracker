import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from '@nextui-org/react';
import React from 'react';
import { FaFilter } from 'react-icons/fa';
import GameCard from '../../components/gameCard/GameCard';

export default function Dashboard() {
  return (
    <div className=" min-h-screen">
      <div className=" px-4 pt-4 pb-20">
        <div className="flex justify-between  w-full">
          <h1 className=" text-2xl font-bold text-center">GameTracker</h1>
          <Avatar name="EM" />
        </div>

        <div className=" flex items-center gap-x-4 mt-8">
          <Autocomplete
            variant="bordered"
            color="primary"
            size="sm"
            placeholder="Search your game"
          >
            <AutocompleteItem key="Brotato">Brotato</AutocompleteItem>
          </Autocomplete>
          <Button variant="bordered" color="primary" isIconOnly>
            <FaFilter />
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-y-3">
          <GameCard />
          <GameCard />
        </div>
        <div className=" relative">
          <Button
            color="primary"
            className=" fixed bottom-4 z-10 w-3/4 left-2/4 -translate-x-2/4"
          >
            Add a new game
          </Button>
        </div>
      </div>
    </div>
  );
}
