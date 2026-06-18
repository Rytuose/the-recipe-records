import { FlatList, StyleSheet, View } from "react-native";

export default function ImageDisplay(){

    const tempData = [1,2,3,4,5,6,7]

    return <FlatList 
        key = {tempData.length}
        data={tempData} 
        horizontal={true}
        contentContainerStyle = {style.containerStyle}
        renderItem={({item}) => {
            return <View style={style.tempImage}/>
        }}/>

}

export const style = StyleSheet.create({
    tempImage:{
        width: 180,
        height: 320,
        borderRadius: 20,
        backgroundColor: "#123456"
    },
    containerStyle:{
        marginHorizontal: 10,
        gap: 10
    }

})