/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import resetPasswordSchema from './schema';
import { resetPasswordTypes } from '@/types/general/general';

export default function ResetPassword() {
  // const { changePasswordHandler } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async (data: resetPasswordTypes) => {
    // await changePasswordHandler(data.password);
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen max-h-screen p-4 flex flex-col justify-between"
    >
      <div>
        <h1 className=" text-center text-2xl font-bold">Reset password</h1>
        <div className=" mt-10 flex flex-col gap-y-4">
          <Input
            type="password"
            label="New password"
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
          <Input
            type="password"
            label="Repeat your password"
            isInvalid={Boolean(errors.confirmPassword)}
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>
      </div>
      <div>
        <Button type="submit" fullWidth color="primary">
          Reset your password
        </Button>
      </div>
    </form>
  );
}
