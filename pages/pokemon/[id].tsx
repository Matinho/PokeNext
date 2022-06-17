import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react"
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
        <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }>
          <Grid xs={ 12 } sm={ 4 }>
            <Card isHoverable css={{ padding: '30px'}}>
              <Card.Body>
                <Card.Image 
                  src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                  alt={ pokemon.name }
                  width='100%'
                  height={ 200 }
                />
                <Text h1 transform="capitalize"> Habilidades:</Text>
                { pokemon.abilities.map( ability => (
                  <Text key={ability.ability.name} h3 transform="capitalize"> { ability.ability.name } </Text>
                ))}
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={12} sm={8} >
            <Card>
              <Card.Header css={{ display:'flex', justifyContent: 'space-between' }}>
                <Text h1 transform="capitalize">{ pokemon.name }</Text>
                { pokemon.types.map( type => ( 
                    <Text 
                      h4 
                      css={{ border:'1px solid #fff', borderRadius:'5px', padding: '0 5px' }}
                      key={type.type.name} 
                      transform="capitalize"> 
                        {type.type.name} 
                      </Text> 
                  ))
                }
                <Button color="gradient" ghost>Guardar en favoritos</Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction="row" display="flex">
                  <Image 
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }                    
                    />
                    
                    <Image 
                    src={ pokemon.sprites.back_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }                    
                    />
                    
                    <Image 
                    src={ pokemon.sprites.front_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }                    
                    />
                    
                    <Image 
                    src={ pokemon.sprites.back_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }                    
                    />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
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
