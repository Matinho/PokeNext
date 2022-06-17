import { GetStaticProps, NextPage, GetStaticPaths } from "next"
import { pokeApi } from "../../api"
import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces"

interface PokemonPageProps {
  pokemon: Pokemon
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {

  return (
    <Layout title="Algun Pokemon">
        <h1>{ pokemon.name }</h1>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const paths = [...Array(151)].map((_, index) => ({ params: { id: `${index + 1}` }, }));

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string }
  
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ id }`)

  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage
