import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Container, Grid } from '@mui/material';

interface PokedexProps {

}

export const Pokedex: React.FC<PokedexProps> = () => {

    const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonListInterface | undefined>(undefined);
    const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);

    useEffect(() => {
        listPokemons()
            .then(response => (
                setPokemons(response.results)
            ))
    }, []);

    useEffect(() => {

        if (!selectedPokemon) return;

        getPokemonDetails(selectedPokemon.name)
            .then(response => {
                setSelectedPokemonDetails(response);
            })

    }, [selectedPokemon]);

    return (
        <div>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Pokedex
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>

            <Container maxWidth="xl">
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {pokemons.map((pokemon) =>
                        (
                            <>
                                <Grid item xs={6} lg={3}>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {pokemon.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => setSelectedPokemon(pokemon)}>Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </>
                        )
                        )}
                    </Grid>
                    Pokemons:
                    <h2>Pokemon selecionado: {selectedPokemon?.name || "Nenhum pokemon selecionado"}</h2>
                    {JSON.stringify(selectedPokemonDetails, undefined, 2)}
                </Box>
            </Container>
        </div >
    );
};

export default Pokedex;