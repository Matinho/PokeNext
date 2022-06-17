import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

const getPokemonInfo = async ( requestData: string ) => {
  
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ requestData }`)

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        abilities: data.abilities,
        types: data.types
    }
}

export const PokemonInfo = {
    getPokemonInfo,
}