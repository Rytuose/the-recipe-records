import { PropsWithChildren } from 'react';
import { DimensionValue, Pressable, StyleSheet } from "react-native";

type Props = PropsWithChildren<{
    width: DimensionValue
    height?: DimensionValue
    noBackground?: Boolean
    onPress?: () => void
}>


export default function ButtonWrapper({width, height, noBackground, children, onPress}: Props){
  return <Pressable 
    style={[style.view, {width: width, height: height, borderWidth: noBackground?0:3}]}
    onPress={onPress}>
      {children}
    </Pressable>
}

export const style = StyleSheet.create({
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