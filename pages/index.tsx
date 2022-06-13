import { Card, Grid, Row, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface PageProps {
  pokemons: SmallPokemon[]
}

const Home: NextPage<PageProps> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={ 2 } justify='flex-start'>
        { pokemons.map( (pokemon) => (
            <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={pokemon.id}>
              <Card isHoverable isPressable>
                <Card.Body css={{ p:1 }}>
                  <Card.Image 
                    src={pokemon.img}
                    width='100%'
                    height={ 140 }
                  />
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    <Text>{pokemon.name}</Text>
                    <Text>#{ pokemon.id }</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons:SmallPokemon[] = data.results.map( (pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default Home
