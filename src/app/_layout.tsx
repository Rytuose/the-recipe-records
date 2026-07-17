import Notification from "@/components/general/notification";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { createContext, useRef, useState } from "react";

export const NotificationContext = createContext((text:string) => {});

export default function RootLayout() {

  const [loaded, error] = useFonts({'Title': require('../../assets/fonts/Rock_Salt/RockSalt-Regular.ttf'), 
    'Subtitle': require('../../assets/fonts/Nothing_You_Could_Do/NothingYouCouldDo-Regular.ttf'),
    'Body': require('../../assets/fonts/Playwrite_NZ_Basic/static/PlaywriteNZBasic-Light.ttf')});
  const [notificationText, updateNotificationText] = useState<string>("");
  const timer = useRef(-1);

  const updateNotification = (text:string) => {
    updateNotificationText(text);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      updateNotificationText("");
    }, 5000)
  }

  return <NotificationContext.Provider value = {(text:string) => {updateNotification(text);}}> 
    <Notification text={notificationText}/>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  </NotificationContext.Provider>
}
