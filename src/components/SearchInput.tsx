import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import useDebouncedValue from '../hooks/useDebouncedValue';

interface Props {
    style?: StyleProp<ViewStyle>;
    onDebounce: (value: string) => void; 
}

const SearchInput = ({ style, onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');
    const debouncedValue = useDebouncedValue(textValue, 1500);

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue])
    
    return (
        <View style={{ ...styles.container, ...style as any,}}>
            <View style={ styles.textBackground }>
                <TextInput 
                    placeholder="Buscar pokemon"
                    onChangeText={ setTextValue }
                    value={ textValue }
                    style={{
                        ...styles.textInput,
                        top: Platform.OS === 'android' ? 2 : 0,
                    }}
                    autoCapitalize="none"
                    autoCorrect={ false }
                />

                <Icon name="search-outline" size={30} color="grey" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
    },
    textBackground: {
        flexDirection: 'row',
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
    }
});

export default SearchInput
