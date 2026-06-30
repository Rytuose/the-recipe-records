import Notification from "@/components/general/notification";
import { Stack } from "expo-router";
import { createContext, useRef, useState } from "react";

export const NotificationContext = createContext((text:string) => {});

export default function RootLayout() {

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
