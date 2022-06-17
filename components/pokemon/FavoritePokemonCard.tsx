import { Grid, Card } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface PokemonCardProps {
    pokemonId: number
}

export const FavoritePokemonCard: FC<PokemonCardProps> = ({ pokemonId }) => {

  const router = useRouter()
  const onFavoriteClicked = () => {
    router.push(`/pokemon/${ pokemonId }`)
  } 

  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } onClick={ onFavoriteClicked }>
        <Card isPressable isHoverable css={{ padding: 10 }}>
            <Card.Image 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`}
            width={'100%'}
            height={140}
            />
        </Card>
    </Grid>
  )
}
