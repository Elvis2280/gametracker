import { FaXbox, FaSteam, FaPlaystation } from 'react-icons/fa';
import { platformsTypes } from '@/types/general/general';

type Props = {
  type: platformsTypes;
};

export default function PlatformIcon({ type }: Props) {
  switch (type) {
    case 'xbox': {
      return (
        <div className=" text-green-400 ">
          <FaXbox size={32} />
        </div>
      );
    }
    case 'deck': {
      return (
        <div className=" text-red-400 text-xl">
          <FaSteam size={32} />
        </div>
      );
    }
    case 'playstation': {
      return (
        <div className=" text-blue-400 text-xl">
          <FaPlaystation size={32} />
        </div>
      );
    }
    case 'pc': {
      return (
        <div className=" text-blue-400 text-xl">
          <FaSteam size={32} />
        </div>
      );
    }
  }
}
