import {
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
import { gameGenres, platformList, statusList } from '@/utils/constants';
import { FaRegTrashAlt } from 'react-icons/fa';
import useToggle from '@/hooks/useToggle/useToggle';
import { statusTypes } from '@/types/general/general';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import addGameSchema from '@/pages/dashboard/schema';
import { GameResponseType } from '@/types/responses/gameResponseDto';
import { useEffect } from 'react';
import { useCreateGame } from '@/hooks/services/gamesbackend/useCreateGame';

type Props = {
  isActived: boolean;
  handleModal: () => void;
  handleDeleteGame: () => void;
  game: GameResponseType | undefined;
  onSuccessfulEdit: () => void;
};

export default function ModalEditGame({
  isActived,
  handleModal,
  handleDeleteGame,
  game,
  onSuccessfulEdit,
}: Props) {
  const onSuccessfulUpdate = () => {
    onSuccessfulEdit();
    handleModal();
    reset();
  };

  const { toggleValue, value } = useToggle();
  const { handleUpdateGame } = useCreateGame(onSuccessfulUpdate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      image: '',
      status: '',
      score: 0,
      tags: '',
      platforms: '',
    },
    resolver: yupResolver(addGameSchema),
  });

  useEffect(() => {
    if (game) {
      const tags = game.Tags.map((tag) => tag.name);
      const platforms = game.Platforms.map((platform) => platform.name);

      reset({
        name: game.name,
        description: game.description,
        image: game.image,
        status: game.status,
        score: game.score || 0,
        tags: tags.join(','),
        platforms: platforms.join(','),
      });
    }
  }, [game, reset]);

  const onSubmit = (data: formType) => {
    const tags = data.tags.split(',');
    const platforms = data.platforms.split(',');
    if (game?.ID) {
      handleUpdateGame({ ...data, tags, platforms, id: game.ID });
    }
  };

  const tagsSelected = game?.Tags.map((tag) => tag.name);
  const platformsSelected = game?.Platforms.map((platform) => platform.name);

  return (
    <div>
      <Modal backdrop="blur" isOpen={isActived} onClose={handleModal}>
        <ModalContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit Game</ModalHeader>
            <ModalBody>
              <div className=" flex justify-end pb-2">
                <Button
                  onClick={toggleValue}
                  variant="flat"
                  color="danger"
                  isIconOnly
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
              <div className=" flex flex-col gap-y-3">
                <Input
                  label="Title"
                  isInvalid={Boolean(errors.name)}
                  errorMessage={errors.name?.message}
                  defaultValue={game?.name}
                  {...register('name')}
                />
                <Textarea
                  label="Description"
                  isInvalid={Boolean(errors.description)}
                  errorMessage={errors.description?.message}
                  defaultValue={game?.description}
                  {...register('description')}
                />
                <Select
                  label="Status"
                  isInvalid={Boolean(errors.status)}
                  errorMessage={errors.status?.message}
                  defaultSelectedKeys={[game?.status] as statusTypes[]}
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
                  isInvalid={Boolean(errors.tags)}
                  errorMessage={errors.tags?.message}
                  selectionMode="multiple"
                  label="Categories"
                  defaultSelectedKeys={tagsSelected}
                  {...register('tags')}
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
                  isInvalid={Boolean(errors.platforms)}
                  errorMessage={errors.platforms?.message}
                  defaultSelectedKeys={platformsSelected}
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
      <Modal
        backdrop="blur"
        isOpen={value}
        onClose={toggleValue}
        placement="center"
      >
        <ModalContent>
          <ModalHeader>Delete Game?</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this game?</p>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-between">
              <Button onClick={toggleValue} variant="light">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toggleValue();
                  handleModal();
                  handleDeleteGame();
                }}
                variant="flat"
                color="danger"
              >
                Delete
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

interface formType {
  name: string;
  description: string;
  image: string;
  status: string;
  score: number;
  tags: string;
  platforms: string;
}
