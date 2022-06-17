import { Grid } from "@nextui-org/react"
import { FC } from "react"
import { FavoritePokemonCard } from "."

interface FavoritePokemonsPorps {
    pokemons: number[]
}

export const FavoritesPokemons: FC<FavoritePokemonsPorps> = ({ pokemons }) => {
  return (
    <Grid.Container gap={ 2 } direction='row' justify="flex-start">
        {
        pokemons.map( id => (
            <FavoritePokemonCard pokemonId={ id } key={ id }/>
        ))
        }
    </Grid.Container>
  )
}
