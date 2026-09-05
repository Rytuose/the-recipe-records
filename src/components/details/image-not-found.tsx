import { IMAGE_HEIGHT } from "@/constants/constants";
import { StyleSheet, View } from "react-native";


type Props = {
    width?: number
}

export default function ImageNotFound({width}:Props){

    return <View style = {[style.imageNotFound, {width:width}]}/>

}

export const style = StyleSheet.create({
  imageNotFound:{
    width: 180,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
    backgroundColor: "#e7042a"
  },
})