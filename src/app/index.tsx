import { initDatabase } from '@/db/recipe-db';
import { Redirect } from 'expo-router';
import { useContext, useEffect } from 'react';
import { NotificationContext } from './_layout';

export default function Index() {

  const notificationUpdate = useContext(NotificationContext);

  console.log("Boot up?");

  useEffect(() => {StartUp(notificationUpdate)})

  return <Redirect href="/add" />;
}

// TODO: Try-catch the system
async function StartUp(notification:(text:string)=>void){
  try {
    //await deleteDatabase(); // For testing purposes
    await initDatabase();
  }
  catch(e){
    notification("Error: Could not load database " + e);
  }
}

