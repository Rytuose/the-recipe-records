
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";


type Prop = {
    editable?: boolean
    categoryAdd?: boolean
}

export default function Category({editable, categoryAdd}: Prop){

    // Might need to be async
    const deleteCategory = () => {
        
    }

    const addCategory = () => {

    }

    return <View style={[style.view, {paddingRight: editable?5:10}]}>
        <Text style={{paddingBottom: 1}}>{(categoryAdd)?"Add Category":"Category Name"}</Text>
        {editable && 
        <Pressable style={{ width: 26, alignItems:'center'}} onPress={deleteCategory}>
            <Ionicons name="close" size={24}/>
        </Pressable>}
        {categoryAdd &&
        <Pressable style={{ width: 26, alignItems:'center'}} onPress={addCategory}>
            <Ionicons name="add" size={24}/>
        </Pressable>}
    </View>
}

export const style = StyleSheet.create({
    view:{
        height: 30,
        borderRadius: 25,
        borderColor: "black",
        borderWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        gap: 2
    }
})