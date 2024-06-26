import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
} from '@nextui-org/react';
import PlatformIcon from '../platformIcon/PlatformIcon';
import { TbPencil } from 'react-icons/tb';
import { statusColor } from '@/utils/constants';
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
  editGameHandle: () => void;
};

export default function GameCard({
  title,
  platforms,
  genres,
  status,
  image,
  editGameHandle,
}: GameCardProps) {
  return (
    <div>
      <Card>
        <CardHeader className=" flex flex-col gap-y-4">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-4">
              {platforms.map((platform, i) => {
                return <PlatformIcon key={i} type={platform} />;
              })}
            </div>
            <Button
              variant="flat"
              color="primary"
              className=" text-xl"
              isIconOnly
              onClick={editGameHandle}
            >
              <TbPencil />
            </Button>
          </div>
          <div className=" flex justify-start w-full gap-x-2 flex-wrap gap-2">
            {genres.map((genre, i) => {
              return (
                <Chip key={i} color="primary" variant="flat" size="sm">
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
          <Image
            loading="lazy"
            isZoomed
            width={'100%'}
            src={image}
            alt="Game Image"
          />
        </CardBody>
      </Card>
    </div>
  );
}
