import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageColors from 'react-native-image-colors';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { RootStackParams } from '../navigator/StackNavigator';
import { FadeInImage } from './FadeInImage';

const windowWidth = Dimensions.get('window').width;


type NavigationProp = StackNavigationProp<RootStackParams, 'PokemonScreen'>;

interface Props {
    pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
    
    const navigation = useNavigation<NavigationProp>();

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);

    const getPokemonColor = async () => {
        const colors = await ImageColors.getColors(pokemon.picture, { fallback: 'grey' } );

        if( colors.platform === 'android' ) {
            setBgColor( colors.dominant || 'grey' );
        } else if ( colors.platform === 'ios' ) {
            setBgColor( colors.background );
        }
    }

    useEffect(() => {
        if( isMounted ) getPokemonColor();
        return () =>  {
            isMounted.current = false;
        }
    }, [])


    return (
        <TouchableOpacity 
            activeOpacity={ 0.9 }
            onPress={ () => navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor }) }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor,
            }}>
                <View> 
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>
                
                <View style={ styles.pokeballContainer }>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokeball }
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImg }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.5,
        overflow: 'hidden',
    },
    pokeball: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20,
    },
    pokemonImg: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5,
    }
});


export default PokemonCard
