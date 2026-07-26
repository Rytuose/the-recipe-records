import { BOTTOM_NAV_BAR_HEIGHT } from "@/constants/constants";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text:string
}

export default function Notification({text}: Props){

    if (text === ""){
      return <></>
    }

    return <View style={style.notification}>
        <Text>{text}</Text>
    </View>
}

export const style = StyleSheet.create({
  notification:{
    minHeight: 40,
    backgroundColor:'#df9090',
    //pointerEvents: 'none',
    zIndex: 999,
    position: 'absolute',
    bottom: BOTTOM_NAV_BAR_HEIGHT + 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10
  }
})
