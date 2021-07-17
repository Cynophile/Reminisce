import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase';
import {
    Grid,
    Avatar,
    Typography,
    makeStyles
} from "@material-ui/core";
import Logo from "../images/logo.jpg";
import Navigation from '../isAuthenticated/Nav'

const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '3rem',
        },
    },
    avatar: {
        width: '60px',
        height: '60px',
        marginLeft: '3vw',
        [theme.breakpoints.down("xs")]: {
            width: '40px',
            height: '40px',
        },
    },
}));
export default function Header() {
    const classes = useStyles();
    const [values, setValues] = useState({
        isAuthenticated: false,
    })

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //userSignedin
                setValues({ isAuthenticated: true })
            } else {
                //NoUser
                setValues({ isAuthenticated: false })
            }
        });

    }, [])

    if (values.isAuthenticated) {
        return (
            <Grid
                container
                style={{
                    background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                    position: 'sticky',
                    minWidth: '100vw',
                    minHeight: '10vh',
                    top: 0,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Grid item
                    xs={6}
                    lg={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '350px',
                        flex: 10
                    }}>
                    <Avatar
                        alt="ReminisceLogo"
                        src={Logo}
                        style={{
                            minWidth: '50px',
                            minHeight: '50px',
                            marginLeft: '3vw',
                        }} />
                    <Typography className={classes.text}
                        style={{
                            fontStyle: 'italic',
                            fontFamily: 'Pacifico',
                        }}>Reminisce</Typography>
                </Grid>
                <Grid item
                    xs={6}
                    lg={8}
                    style={{
                        display: 'flex',
                    }}>
                    <Navigation />
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid
            container
            style={{
                background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                position: 'sticky',
                minWidth: '100vw',
                minHeight: '10vh',
                top: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
            }}>
            <Grid item
                xs={6}
                lg={2}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '350px',
                    flex: 10
                }}>
                <Avatar
                    alt="ReminisceLogo"
                    src={Logo}
                    style={{
                        minWidth: '50px',
                        minHeight: '50px',
                        marginLeft: '3vw',
                    }} />
                <Typography className={classes.text}
                    style={{
                        fontStyle: 'italic',
                        fontFamily: 'Pacifico',
                    }}>Reminisce</Typography>
            </Grid>
        </Grid>
    )
}
