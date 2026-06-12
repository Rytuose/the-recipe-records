import Feather from '@expo/vector-icons/Feather';
import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string
    width: DimensionValue
    height?: DimensionValue
    iconNameFeather?: keyof typeof Feather.glyphMap
    onPress?: () => void
}

export default function Button({label, width, height, iconNameFeather, onPress}: Props){

  return <View>
    <Pressable 
    style={[style.view, {width: width, height: height}]}
    onPress={onPress}>
      <Feather name={iconNameFeather} size={20}/>
      <Text style={style.textStyle}>{label}</Text>
    </Pressable>
  </View>

}

export const style = StyleSheet.create({
    textStyle:{
        fontSize: 20,
    },
    view:{
        height: 40,
        borderRadius: 25,
        borderColor: "black",
        borderWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 5
    }
})