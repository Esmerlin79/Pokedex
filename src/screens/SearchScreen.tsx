import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Loading from '../components/Loading'
import PokemonCard from '../components/PokemonCard'
import SearchInput from '../components/SearchInput'
import usePokemonSearch from '../hooks/usePokemonSearch'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { styles } from '../theme/appTheme'

const windowWidth = Dimensions.get('window').width;

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList} = usePokemonSearch();
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    const [term, setTerm] = useState('');

    useEffect(() => {
        if( term.trim() === '' ) return setPokemonFiltered([]);
        if( !isNaN(Number(term)) ) return setPokemonFiltered( simplePokemonList.filter( poke => poke.id === term ) )
        
        setPokemonFiltered(
            simplePokemonList.filter( poke => poke.name.toLocaleLowerCase().includes( term.toLowerCase() ) )
        );
    }, [term])
    

    if( isFetching ) return ( <Loading /> );

    return (
        <View style={{ 
            flex: 1,
             marginHorizontal: 20,
        }}>
            <SearchInput 
                onDebounce={ (value) => setTerm(value) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: windowWidth - 40,
                    top: Platform.OS === 'ios' ? top : top  + 30,

                }}
            />

            <FlatList 
                data={ pokemonFiltered }
                keyExtractor={ pokemon => pokemon.id }
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        paddingBottom: 10,
                        marginTop: Platform.OS === 'ios' ? top + 60 : top  + 80,
                    }}>
                        { term }
                    </Text> 
                )}
                numColumns={ 2 }
                renderItem={ ({ item }) => <PokemonCard pokemon={ item } />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}



export default SearchScreen
