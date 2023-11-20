import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
} from '@nextui-org/react';
import React from 'react';
import PlatformIcon from '../platformIcon/PlatformIcon';
import imageExample from '../../../public/game.png';
import { TbPencil } from 'react-icons/tb';

export default function GameCard() {
  return (
    <div>
      <Card>
        <CardHeader className=" flex flex-col gap-y-2">
          <div className="flex justify-between w-full items-center">
            <PlatformIcon type="deck" />
            <Button
              variant="flat"
              color="primary"
              className=" text-xl"
              isIconOnly
            >
              <TbPencil />
            </Button>
          </div>
          <div className=" flex justify-start w-full gap-x-2">
            <Chip color="primary" variant="flat" size="sm">
              Adventure
            </Chip>
            <Chip color="primary" variant="flat" size="sm">
              Action
            </Chip>
            <Chip color="primary" variant="flat" size="sm">
              RPG
            </Chip>
          </div>
          <div className="flex justify-between w-full items-center">
            <h3 className=" text-xl font-bold">Game Title</h3>
            <Chip color="success" variant="dot" size="sm">
              Completed
            </Chip>
          </div>
        </CardHeader>
        <CardBody className="w-full flex flex-col items-center">
          <Image isZoomed width={'100%'} src={imageExample} alt="Game Image" />
        </CardBody>
      </Card>
    </div>
  );
}
