/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../../schema';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  resetToggle: boolean;
  toggleReset: () => void;
};

type ResetPasswordData = {
  resetEmail: string;
};

export default function ResetPasswordModal({
  toggleReset,
  resetToggle,
}: Props) {
  // const { resetPasswordHandler } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resetEmail: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordData) => {
    // resetPasswordHandler(data.resetEmail)
    //   .catch(() => console.log('try again'))
    //   .finally(() => toggleReset());
    console.log(data);
  };

  return (
    <div>
      <Modal isOpen={resetToggle} placement="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              <h2>Reset your password</h2>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Type your email"
                isInvalid={Boolean(errors.resetEmail)}
                errorMessage={errors.resetEmail?.message}
                {...register('resetEmail')}
              />
            </ModalBody>
            <ModalFooter className=" flex justify-between">
              <Button color="default" onClick={toggleReset}>
                Cancel
              </Button>
              <Button type="submit" color="danger">
                Reset Password
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}
