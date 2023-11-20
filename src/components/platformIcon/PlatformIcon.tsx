import React from 'react';
import { FaXbox, FaSteam } from 'react-icons/fa';

type Props = {
  type: 'xbox' | 'deck';
};

export default function PlatformIcon({ type }: Props) {
  switch (type) {
    case 'xbox': {
      return (
        <div className=" text-green-400 ">
          <FaXbox />
        </div>
      );
    }
    case 'deck': {
      return (
        <div className=" text-blue-400 text-xl">
          <FaSteam />
        </div>
      );
    }
  }
}
