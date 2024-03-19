import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import signUpSchema from '@/pages/signup/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import useSession from '@/hooks/session/useSession';

export const Signup = () => {
  const navigate = useNavigate();
  const { signupHanler } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const handlerSubmitForm = (data: SignUpForm): void => {
    const { username, email, password } = data;
    if (username && email && password) {
      signupHanler({ username, email, password });
    }
  };

  return (
    <div className="relative max-h-[100dvh] h-[100dvh]">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={'h-full'} onSubmit={handleSubmit(handlerSubmitForm)}>
        <div className={' flex flex-col p-4 justify-between h-full'}>
          <header>
            <h1 className=" text-xl font-bold text-center">GameTracker</h1>
          </header>
          <section className={' flex-1 py-4 flex flex-col justify-center'}>
            <div>
              <h2 className=" text-lg text-center pb-4">Create Account</h2>
            </div>
            <div className=" flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Username"
                {...register('username')}
                className={'input'}
                isInvalid={Boolean(errors.username)}
                errorMessage={errors.username?.message}
              />
              <Input
                type="text"
                placeholder="Email"
                {...register('email')}
                className={'input'}
                isInvalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
              />
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
                className={'input'}
                isInvalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
              />
              <Input
                type="password"
                placeholder="Repeat Password"
                {...register('repeatPassword')}
                className={'input'}
                isInvalid={Boolean(errors.repeatPassword)}
                errorMessage={errors.repeatPassword?.message}
              />
            </div>
          </section>
          <div className={'flex flex-col gap-4'}>
            <Button type={'submit'} variant={'solid'} color={'primary'}>
              Create Account
            </Button>
            <Button
              onClick={() => {
                navigate('/');
              }}
              color={'primary'}
              variant={'light'}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface SignUpForm {
  username: string | undefined;
  email: string;
  password: string;
  repeatPassword?: string | undefined;
}
