import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import theme from './theme';
import { ThemeProvider } from 'styled-components'


export default function Loading() {

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh', justifyContent: "center" }}
            >

                <Grid item>
                    <CircularProgress size={'30vh'}  thickness={2}/>
                </Grid>

            </Grid>
        </ThemeProvider>
    );
}