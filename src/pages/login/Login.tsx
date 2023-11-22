import { Button, Input } from '@nextui-org/react';
import useToggle from '../../hooks/useToggle/useToggle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import loginSchema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import useSession from '../../hooks/session/useSession';

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const { value, toggleValue } = useToggle();
  const { loginHandler } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    loginHandler(data.email, data.password);
  };
  return (
    <div className=" relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" h-screen p-4 flex flex-col justify-between ">
          <h1 className=" text-xl font-bold text-center">GameTracker</h1>
          <div className=" flex flex-col gap-y-4">
            <p className=" text-lg text-center pb-2">Welcome Back!</p>

            <div className=" flex flex-col gap-y-4">
              <Input
                label="Email"
                {...register('email')}
                isInvalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
              />

              <Input
                type={value ? 'text' : 'password'}
                label="Password"
                isInvalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                endContent={
                  <div className=" flex items-center h-full">
                    <Button
                      className=" text-lg"
                      size="sm"
                      variant="light"
                      onClick={toggleValue}
                    >
                      {value ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </div>
                }
                {...register('password')}
              />
            </div>
          </div>
          <div className=" pb-10">
            <Button type="submit" variant="solid" color="primary" fullWidth>
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
