import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { FavoritesPokemons } from "../../components/pokemon";
import { LocalFavorites } from "../../utils";


const Favorites = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons( LocalFavorites.pokemons() )
  }, [])
  

  return (
    <Layout title="Pokemons Favoritos">
      { favoritePokemons.length === 0 ? 
        ( <NoFavorites /> ) : 
        ( <FavoritesPokemons pokemons={ favoritePokemons }/> )
      }
    </Layout>
  )
}

export default Favorites