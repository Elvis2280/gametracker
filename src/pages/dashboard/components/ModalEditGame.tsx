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
  Tooltip,
} from '@nextui-org/react';
import { gameGenres, platformList, statusList } from '../../../utils/constants';
import { FaRegTrashAlt } from 'react-icons/fa';
import useToggle from '../../../hooks/useToggle/useToggle';
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  isActived: boolean;
  handleModal: () => void;
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
                <Tooltip
                  color="warning"
                  isOpen={value}
                  content="double tap to delete"
                >
                  <Button
                    onClick={toggleValue}
                    onDoubleClick={() => {
                      alert('delete');
                    }}
                    variant="flat"
                    color="danger"
                    isIconOnly
                  >
                    <FaRegTrashAlt />
                  </Button>
                </Tooltip>
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
    </div>
  );
}
