import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from '../theme/appTheme';
import usePokemonPaginated from '../hooks/usePokemonPaginated';

interface Props extends StackScreenProps<any, any> {}

const HomeScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemonList } = usePokemonPaginated();

    return (
        <View>

            <Image 
                source={ require('../assets/pokebola.png')}
                style={ styles.pokeBallBG }
            />
            <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
            }}>
                Pokedex
            </Text>
            
        </View>
    )
}

export default HomeScreen
