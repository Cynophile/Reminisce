import React, { useState } from 'react'
import firebase, { db } from '../utils/firebase'
import {
    Grid,
    IconButton,
    Avatar,
    MenuItem,
    Link,
    makeStyles,
    ListItemIcon,
    Popover
} from '@material-ui/core';

import { TiHome } from 'react-icons/ti'
import { BsChatFill } from 'react-icons/bs'
import { RiNotification3Fill } from 'react-icons/ri'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import guest from '../images/guestUser.jpg'
const useStyles = makeStyles((theme) => ({
    icons: {
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '2.5rem',
        },
    },
    homeicon: {
        fontSize: '2rem',
        '@media (min-width:600px)': {
            fontSize: '3rem',
        },
    },
    avatar: {
        width: '40px',
        height: '40px',
        [theme.breakpoints.down("xs")]: {
            width: '25px',
            height: '25px',
        },
    },
}));


export default function Navigation() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [photoUrl, setPhotoUrl] = useState()

    const user = firebase.auth().currentUser
    if (user) {
        db.collection("users")
            .doc(user.uid).get().then(doc => {
                setPhotoUrl(doc.data().photoUrl)
            })
    }
    const logout = () => {
        firebase.auth().signOut().then(() => {
            handleClose();
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <nav>
            <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                    minHeight: "10vh",
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '1vh',
                    justifyContent: 'center'
                }}
            >

                <Grid item
                    className={classes.navSection}
                    style={{
                        position: 'absolute',
                        right: '1vw'
                    }}>

                    <IconButton>
                        <Link href="/home">
                            <TiHome className={classes.homeicon} />
                        </Link>
                    </IconButton>

                    <IconButton>
                        <Link href="/#">
                            <BsChatFill className={classes.icons} />
                        </Link>
                    </IconButton>

                    <IconButton>
                        <RiNotification3Fill className={classes.icons} />
                    </IconButton>

                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                        <Avatar
                            className={classes.avatar}
                            src={photoUrl === "" ? guest : photoUrl} />
                    </IconButton>
                    
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={handleClose} >
                            <Link href="/profile">
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" />
                                </ListItemIcon>Profile
                            </Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>Settings
                        </MenuItem>

                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>Logout
                        </MenuItem>
                    </Popover>

                </Grid>
            </Grid>
        </nav>
    )
}
