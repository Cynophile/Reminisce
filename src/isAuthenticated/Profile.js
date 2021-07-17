import React, { useState, useEffect } from 'react'
import firebase, { db } from '../utils/firebase'
import {
    Card,
    Grid,
    Avatar,
    Typography,
    CardContent,
    makeStyles,
    Link,
    Box,
    // TextField,
} from '@material-ui/core'
import guest from '../images/guestUser.jpg'

const useStyles = makeStyles((theme) => ({
    section: {
        width: 900,
        maxHeight: 580,
        [theme.breakpoints.down("xs")]: {
            maxWidth: 350,
            maxHeight: 350,
        },
    },
    cardUiFriend: {
        width: '350px',
        height: '350px',
        margin: '5px',
        '@media (min-width:600px)': {
            width: '320px',
            height: '320px',
            margin: '5px',
        }
    },
    cardUiPost: {
        width: '350px',
        margin: '5px',
        '@media (min-width:600px)': {
            width: '580px',
            margin: '5px',
            marginLeft: 0
        }
    },
    avatar: {
        width: '150px',
        height: '150px',
        [theme.breakpoints.down("xs")]: {
            width: '100px',
            height: '100px',
        },
    },
    nameText: {
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '2rem',
        },
    },
    text: {
        fontSize: '.8rem',
        '@media (min-width:600px)': {
            fontSize: '1rem',
        },
    },
}));
export default function Profile() {
    const classes = useStyles();
    const [currentFirstname, setCurrentFirstName] = useState('')
    const [currentLastname, setCurrentLastName] = useState('')
    const [currentPhotoUrl, setcurrentPhotoUrl] = useState('')
    useEffect(() => {
        const user = firebase.auth().currentUser;
        db.collection("users")
            .doc(user.uid)
            .onSnapshot((doc) => {
                setCurrentFirstName(doc.data().firstName);
                setCurrentLastName(doc.data().lastName);
                setcurrentPhotoUrl(doc.data().photoUrl);
            });
    }, []);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Grid item
                style={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '15px',
                    flexBasis: '50%',
                    flexDirection: 'column'
                }}>
                <Card
                    className={classes.section}
                    style={{
                        background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <CardContent>
                        {/* header -> avatar + name */}
                        {/* AVATAR/PROFILE PIC */}
                        <Grid item
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                            <Avatar
                                className={classes.avatar}
                                alt="Profile"
                                src={currentPhotoUrl ==="" ? guest : currentPhotoUrl} />
                        </Grid>

                        {/* NAME */}
                        <Grid item xs
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexDirection: 'column'
                            }}>
                            <Grid item xs
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: 300,
                                    flex: 1
                                }}>
                                <Typography
                                    className={classes.nameText}
                                    style={{
                                        fontWeight: 600,
                                    }}>{currentFirstname +" "+ currentLastname}</Typography>
                            </Grid>

                            <Grid item xs
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: 300,
                                    flex: 1
                                }}>
                                <Typography
                                    className={classes.text}>BIO
                                </Typography>
                            </Grid>

                            <Grid item xs
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Link size='small' style={{ fontSize: '.8rem' }}>
                                    Edit
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Box flexWrap='wrap'
                    className={classes.gridDirection}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}>
                    <Card
                        className={classes.cardUiFriend}
                        style={{
                            background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <CardContent style={{}}>
                            <Grid item
                                style={{
                                    display: 'flex',
                                }}>
                                <Typography
                                    className={classes.text}
                                    style={{
                                        fontWeight: 600,
                                        alignItems: 'center',
                                    }}>Friends</Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card
                        className={classes.cardUiPost}
                        style={{
                            background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <CardContent style={{}}>
                            <Grid item>
                                <Typography
                                    className={classes.text}
                                    style={{
                                        fontWeight: 600,
                                        alignItems: 'center',
                                    }}>Post</Typography>

                            
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}
