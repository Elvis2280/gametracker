import React, { useEffect } from 'react';
import supabase from '../../utils/databaseClient';

export default function Login() {
  const getData = async () => {
    const data = await supabase.from('game').select('*');
    console.log(data);
  };

  getData();
  return (
    <div>
      <div className=" min-h-screen">
        <h1>GameTracker</h1>
      </div>
    </div>
  );
}
