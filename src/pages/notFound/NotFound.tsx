import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const handlerBack = () => {
    navigate('/');
  };
  return (
    <div className=" min-h-screen p-4 flex flex-col justify-center">
      <div className=" flex-1 flex flex-col items-center justify-center">
        <p className=" text-3xl">404</p>
        <p className=" text-xl">Page not found</p>
      </div>
      <div className=" pb-4">
        <Button onClick={handlerBack} color="primary" fullWidth>
          Go back
        </Button>
      </div>
    </div>
  );
}
