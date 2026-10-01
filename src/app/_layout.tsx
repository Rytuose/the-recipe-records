import Notification from "@/components/general/notification";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { createContext, Dispatch, SetStateAction, useRef, useState } from "react";

export const NotificationContext = createContext((text:string) => {});
export const RefreshContext = createContext<[number, Dispatch<SetStateAction<number>>]>([0, () => {}]);

export default function RootLayout() {

  const [loaded, error] = useFonts({'Title': require('../../assets/fonts/Rock_Salt/RockSalt-Regular.ttf'), 
    'Subtitle': require('../../assets/fonts/Nothing_You_Could_Do/NothingYouCouldDo-Regular.ttf'),
    'Body': require('../../assets/fonts/Playwrite_NZ_Basic/static/PlaywriteNZBasic-Light.ttf')});
  const [notificationText, updateNotificationText] = useState<string>("");
  const timer = useRef(-1);
  const refreshRecipeSearch = useState(0);

  const updateNotification = (text:string) => {
    updateNotificationText(text);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      updateNotificationText("");
    }, 5000)
  }

  return <RefreshContext.Provider value = {refreshRecipeSearch}>
    <NotificationContext.Provider value = {(text:string) => {updateNotification(text);}}>
      <Notification text={notificationText}/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NotificationContext.Provider>
  </RefreshContext.Provider>
}
