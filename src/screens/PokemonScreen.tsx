import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { FadeInImage } from '../components/FadeInImage';
import { RootStackParams } from '../navigator/StackNavigator'
import usePokemon from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({ navigation, route }: Props) => {

    const { top } = useSafeAreaInsets();
    const { simplePokemon: { id, name, picture }, color } = route.params;
    const { isLoading, pokemon } = usePokemon(id);
    console.log(pokemon);
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    style={{
                        ...styles.backButton,
                        top: top + 6,
                    }}
                    onPress={ () => navigation.pop() }
                >
                    <Icon 
                        name="arrow-back-outline"
                        size={ 35 }
                        color="white"
                    />
                </TouchableOpacity>

                <Text style={{ ...styles.pokemonName, top: top + 40  }}>
                    { name + '\n'} #{ id }
                </Text>

                <Image 
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokeball }
                />
                
                <FadeInImage 
                    uri={ picture }
                    style={ styles.pokemonImage }
                />
            </View>

            { isLoading ? (
                <View style={ styles.loadingIndicator }>
                    <ActivityIndicator color={ color } size={ 50 } />
                </View>
            ): (
                <PokemonDetails  pokemon={pokemon} />
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -25,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PokemonScreen
