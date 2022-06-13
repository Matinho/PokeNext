import { Button } from "@nextui-org/react"
import Head from "next/head"
import { Children, FC } from "react"
import { Navbar } from "../ui"

interface IProps {
    children: React.ReactNode,
    title?: string
}

export const Layout = ( props: IProps ) => {
    const { title, children } = props
    return (
        <>
            <Head>
                <title>{ title || 'PokemonApp'}</title>
                <meta name="author" content="Matias Figueredo" />
                <meta name="description" content={`Informacion sobre el pokemon ${ title }`} />
                <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0 20px'
            }}>
                { children }
            </main>
        </>
    )
}