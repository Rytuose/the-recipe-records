import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useRef, useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";


type Props = {
    options: string[],
    label: string,
    selectorHeight?: number,
    dropdownHeight?: number,
    imageSize?: number,
    inverse?: boolean,
    borderRadius?: number,
    minWidth?:number,
    setLabel: (label:string) => void
    onOpen?: () => void
}

export default function Dropdown({options, label, selectorHeight = 76, dropdownHeight = 35, imageSize = 25, inverse = false, borderRadius = 0, minWidth, setLabel, onOpen}: Props){

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const {height} = useWindowDimensions();
    const view = useRef<View>(null);
    const yPos = useRef<number>(0);

    const focus = useRef<number>(0);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        if (view.current){
            if (Platform.OS == 'web'){
                const rect = view.current.getBoundingClientRect()
                yPos.current = rect.top + rect.height
                console.log(rect.top + " " + rect.height);
            }
            else{
                //TODO: Check on mobile
                view.current.measure((x, y, width, height, pageX, pageY) => {
                console.log("Setting y " + pageY +  " " + y + " " + height + " " + (height + pageY));
                yPos.current = height + pageY
            })
            }
        }
        if (onOpen){
            onOpen();
        }
    }

    const selectItem = useCallback((item:string) => {
        setDropdownOpen(false);
        setLabel(item);
    }, [])

    const renderItem = useCallback(({item}:{item:string}) => {
        return <Pressable onPress={() => selectItem(item)}>
            <Text style={style.dropdownText} selectable={false}>{item}</Text>
        </Pressable>
    }, [])

    const color = (inverse)?'white':'black';
    const bottom = selectorHeight + yPos.current < height;

    const onBlur = (e:any) => {
        focus.current -= 1
        //TODO: Check on mobile
        setTimeout(() => {
            if (focus.current < 0){
                setDropdownOpen(false);
            }
        }, 0)
    }

    const onFocus = (e:any) => {
        focus.current += 1
    }

    focus.current = 0;

    return <View style={[style.mainView, {minWidth: minWidth}]} onFocus={onFocus} onBlur={onBlur}>
            <Pressable style={{width: '100%'}} onPress={toggleDropdown} >
                <View ref={view} style={[style.bar, {
                    height: dropdownHeight, 
                    borderColor: color, 
                    borderBottomLeftRadius:(dropdownOpen && bottom ?0:borderRadius), 
                    borderBottomRightRadius:(dropdownOpen && bottom?0:borderRadius),
                    borderTopLeftRadius:(dropdownOpen && !bottom? 0 : borderRadius),
                    borderTopRightRadius:(dropdownOpen && !bottom? 0: borderRadius),
                    }]}
                    >
                    <Text style={[style.text, {color: color}]} selectable={false}>{label}</Text>
                    <View style={{alignItems: 'flex-end'}}>
                        {dropdownOpen && <AntDesign name={"up"} size={imageSize} color = {color}/>}
                        {!dropdownOpen && <AntDesign name={"down"} size={imageSize} color = {color}/>}
                    </View>
                </View>
            </Pressable>
        {dropdownOpen && 
            <>
                <FlatList
                style= {[style.dropdown,
                    {
                        marginTop: (bottom)? dropdownHeight: -selectorHeight, 
                        borderColor: color,
                        borderBottomWidth: (bottom) ? 1 : 0,
                        borderTopWidth: (bottom) ? 0 : 1,
                        borderTopLeftRadius:(dropdownOpen && bottom ?0:borderRadius), 
                        borderTopRightRadius:(dropdownOpen && bottom?0:borderRadius),
                        borderBottomLeftRadius:(dropdownOpen && !bottom? 0 : borderRadius),
                        borderBottomRightRadius:(dropdownOpen && !bottom? 0: borderRadius),
                        height: selectorHeight,
                    }
                ]} 
                data={options} 
                renderItem={renderItem}
                
                />
            </>

        }
    </View>
}


export const style = StyleSheet.create({
    mainView:{
        alignItems: 'center',
        flex: 1,
    },
    bar:{
        flexDirection:'row',
        gap: 10,
        alignItems:'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 5,
        width: '100%', 
    },
    text:{
        flex: 1,
        fontSize: 20,
        fontFamily: "Body",
        marginHorizontal: 10,
    },
    dropdown:{
        position: 'absolute',
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'black',
    },
    dropdownText:{
        fontSize: 15,
        fontFamily: "Body",
        marginHorizontal: 10
    }
})