import { PropsWithChildren } from 'react';
import { DimensionValue, Pressable, StyleSheet } from "react-native";

type Props = PropsWithChildren<{
    width: DimensionValue
    height?: DimensionValue
    noBorder?: Boolean
    backgroundColor?: string
    onPress?: () => void
}>


export default function ButtonWrapper({width, height, noBorder, backgroundColor, children, onPress}: Props){
  return <Pressable 
    style={[style.view, {width: width, height: height, borderWidth: noBorder?0:3, backgroundColor: backgroundColor}]}
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