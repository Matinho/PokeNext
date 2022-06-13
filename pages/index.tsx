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
      <ul>
        { pokemons.map( (pokemon) => (
            <li key={pokemon.id}>
              #{ pokemon.id } - {pokemon.name}
            </li>
          ))
        }
      </ul>
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
