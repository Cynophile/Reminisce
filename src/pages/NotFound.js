import React from 'react'
import { Card, Grid } from '@material-ui/core'
export default function NotFound() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '80vh', justifyContent: "center" }}
        >
            <Card style={{ width: '50vw', height: '50vh', justifyContent: 'center', alignItems: 'center', display: 'flex', background: '#e2e2e2' }}>
                <h1 style={{ color: 'red', fontSize: '3rem' }}>ERROR 404 - PAGE NOT FOUND</h1>
            </Card>
        </Grid>
    )
}
