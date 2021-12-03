import { useEffect, useRef, useState } from "react"
import { pokemonApi } from "../api/pokemonApi";

import { PokemonFull } from "../interfaces/pokemonInterfaces";

const usePokemon = ( id: string ) => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);
    const isMounted = useRef(true);

    const loadPokemon = async () => {
        const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(resp.data);
        setIsLoading(false);
    }

    useEffect(() => {
        if( isMounted.current ) loadPokemon();
        return () => {
            isMounted.current = false;
        }
    }, [])

    return {
        isLoading,
        pokemon
    }
}

export default usePokemon
