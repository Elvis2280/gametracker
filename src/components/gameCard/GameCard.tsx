import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
} from '@nextui-org/react';
import PlatformIcon from '../platformIcon/PlatformIcon';
import imageExample from '../../../public/game.png';
import { TbPencil } from 'react-icons/tb';
import { statusColor } from '../../utils/constants';
import {
  genresTypes,
  platformsTypes,
  statusTypes,
} from '../../types/general/general';

type GameCardProps = {
  title: string;
  image: string;
  platforms: platformsTypes[];
  genres: genresTypes[];
  status: statusTypes;
};

export default function GameCard({
  title,
  image,
  platforms,
  genres,
  status,
}: GameCardProps) {
  return (
    <div>
      <Card>
        <CardHeader className=" flex flex-col gap-y-2">
          <div className="flex justify-between w-full items-center">
            {platforms.map((platform) => {
              return <PlatformIcon type={platform} />;
            })}
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
            {genres.map((genre) => {
              return (
                <Chip key={genre} color="primary" variant="flat" size="sm">
                  {genre}
                </Chip>
              );
            })}
          </div>
          <div className="flex justify-between w-full items-center">
            <h3 className=" text-xl font-bold">{title}</h3>
            <Chip color={statusColor[status]} variant="dot" size="sm">
              {status}
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
