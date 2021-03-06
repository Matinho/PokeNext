import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react"
import confetti from "canvas-confetti";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { LocalFavorites, PokemonInfo } from "../../utils";

interface PokemonByNamePageProps {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<PokemonByNamePageProps> = ({ pokemon }) => {
    const [isInfavorites, setisInfavorites] = useState(LocalFavorites.existInFavorites( pokemon.id ))

    const onToggleFavorite = () => {
      LocalFavorites.toggleFavorite( pokemon.id )
      setisInfavorites( !isInfavorites )
      if( !isInfavorites ){
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin: {
            x: 1,
            y: 0
          }
        })
      }
    }
  
    return (
      <Layout title={ pokemon.name }>
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
                  <Button 
                    color="gradient" 
                    ghost={ !isInfavorites }
                    onPress={ onToggleFavorite }
                  >
                    { isInfavorites ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
                    
                  </Button>
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`)
    const pokemonNames: string[] = data.results.map( pokemonData => pokemonData.name )
    const paths = pokemonNames.map((pokemonName) => ({ params: { name: `${pokemonName}` }, }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string }

  return {
    props: {
      pokemon: await PokemonInfo.getPokemonInfo( name )
    }
  }
}

export default PokemonByNamePage