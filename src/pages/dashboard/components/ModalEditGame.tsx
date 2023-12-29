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
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  isActived: boolean;
  handleModal: () => void;
  handleDeleteGame: () => void;
  formikEditGame: {
    register: any;
    handleSubmit: any;
    errors: any;
    setValue: any;
    getValues: any;
  };
};

export default function ModalEditGame({
  isActived,
  handleModal,
  formikEditGame,
  handleDeleteGame,
}: Props) {
  const { toggleValue, value } = useToggle();
  return (
    <div>
      <Modal backdrop="blur" isOpen={isActived} onClose={handleModal}>
        <ModalContent>
          <form>
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
                  isInvalid={Boolean(formikEditGame.errors.game_title)}
                  errorMessage={formikEditGame.errors.game_title?.message}
                  defaultValue={formikEditGame.getValues().game_title}
                  {...formikEditGame.register('game_title')}
                />
                <Textarea
                  label="Description"
                  isInvalid={Boolean(formikEditGame.errors.game_description)}
                  errorMessage={formikEditGame.errors.game_description?.message}
                  defaultValue={formikEditGame.getValues().game_description}
                  {...formikEditGame.register('game_description')}
                />
                <Select
                  label="Status"
                  isInvalid={Boolean(formikEditGame.errors.status)}
                  errorMessage={formikEditGame.errors.status?.message}
                  defaultSelectedKeys={[formikEditGame.getValues().status]}
                  {...formikEditGame.register('status')}
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
                  isInvalid={Boolean(formikEditGame.errors.genres)}
                  errorMessage={formikEditGame.errors.genres?.message}
                  selectionMode="multiple"
                  label="Categories"
                  defaultSelectedKeys={formikEditGame
                    .getValues()
                    .genres.split(',')}
                  {...formikEditGame.register('genres')}
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
                  isInvalid={Boolean(formikEditGame.errors.platforms)}
                  errorMessage={formikEditGame.errors.platforms?.message}
                  defaultSelectedKeys={formikEditGame
                    .getValues()
                    .platforms.split(',')}
                  {...formikEditGame.register('platforms')}
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
