import { BOTTOM_NAV_BAR_HEIGHT } from "@/constants/constants";
import { StyleSheet, Text, View } from "react-native";

export const NOTIFICATION_ERROR = "#df9090"
export const NOTIFICATION_WARNING = "#eee16a"
export const NOTIFICATION_SUCCESS = "#557e4d"

type Props = {
  text:string,
  color: string
}

export default function Notification({text, color}: Props){

    if (text === ""){
      return <></>
    }
    
    return <View style={[style.notification, {backgroundColor: color} ]}>
        <Text>{text}</Text>
    </View>
}

export const style = StyleSheet.create({
  notification:{
    minHeight: 40,
    zIndex: 999,
    position: 'absolute',
    bottom: BOTTOM_NAV_BAR_HEIGHT + 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10
  }
})
