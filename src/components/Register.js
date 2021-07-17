import React, { useState } from 'react'
import firebase, { db, facebookProvider, googleProvider } from "../utils/firebase";
import { useHistory } from 'react-router-dom';
//IMPORTED STYLES
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    FormGroup,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@material-ui/core'
import { Alert } from "@material-ui/lab";
//IMPORTED ICONS
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { RiFacebookCircleFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

const useStyles = makeStyles((theme) => ({
    names: {
        display: 'flex',
        [theme.breakpoints.down("xs")]: {
            width: "165",
        },
    },
}));


export default function Register() {
    const history = useHistory();
    const classes = useStyles();
    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthDate: "",
        gender: "",
        photoUrl: "",
        showPassword: false,
        errors: "",
    });

    const handleChange = (prop) => (event) => {
        setPayload({ ...payload, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPayload({ ...payload, showPassword: !payload.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //GOOGLE SIGNIN
    const google = () => {
        try {
            firebase
                .auth()
                .signInWithPopup(googleProvider);
        } catch (error) {
            alert(error);
        }
    };
    //FACEBOOK SIGNIN
    const facebook = () => {
        try {
            firebase
                .auth()
                .signInWithPopup(facebookProvider);
        } catch (error) {
            alert(error);
        }
    }

    const signup = () => {
        if (!payload.firstName || !payload.lastName || !payload.email || !payload.password || !payload.birthDate || !payload.gender) {
            setPayload({ ...payload, errors: "Please fill out all fields!" })
        } else if (payload.password.length < 6) {
            setPayload({ ...payload, errors: "Password should be 6 characters or more!" })
        }
        else {

            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    firebase.auth().onAuthStateChanged(function (user) {
                        db.collection("users").doc(user.uid).set({
                            email: payload.email,
                            firstName: payload.firstName,
                            lastName: payload.lastName,
                            birthDate: payload.birthDate,
                            gender: payload.gender,
                            photoUrl: payload.photoUrl,
                        })
                            .then(() => {
                                console.log("Document successfully written!");
                                history.push('/home');
                            }).catch((error) => {
                                console.error("Error writing document: ", error);
                            });

                    })
                }).catch((error) => {
                    var errorMessage = error.message;
                    // ..
                    setPayload({ ...payload, errors: errorMessage })
                });
        }
    }
    return (
        <Grid
            container
            direction="row"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <FormGroup style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Typography style={{
                    fontSize: '3rem',
                    fontFamily: 'Fredoka One',
                    textAlign: 'center',
                }}>Create Account</Typography>

                <Grid item style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <IconButton style={{ color: '#4064AC' }} onClick={facebook}>
                        <RiFacebookCircleFill />
                    </IconButton>

                    <IconButton color="inherit" onClick={google}>
                        <FcGoogle />
                    </IconButton>
                </Grid>

                <Typography style={{
                    fontSize: '1rem',
                    opacity: '0.7',
                    fontFamily: 'Fredoka One',
                    textAlign: 'center',
                }}>or use your email for registration</Typography>

                {payload.errors && (< Alert severity="error" style={{ margin: 15 }}>
                    {"Error - " + payload.errors}
                </Alert>)}

                {/* Form */}
                <Grid item
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                    <TextField
                        autoCapitalize
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        size='small'
                        autoComplete="off"
                        fullWidth
                        className={classes.names}
                        onChange={handleChange('firstName')}
                        style={{
                            margin: 2
                        }} />

                    <TextField
                        autoCapitalize
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        size='small'
                        autoComplete="off"
                        fullWidth
                        className={classes.names}
                        onChange={handleChange('lastName')}
                        style={{
                            margin: 2
                        }} />
                </Grid>

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    size='small'
                    autoComplete="off"
                    onChange={handleChange('email')}
                    style={{
                        margin: 5
                    }} />

                <FormControl
                    variant="outlined"
                    fullWidth
                    size='small'
                    style={{
                        margin: 5
                    }}>
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={payload.showPassword ? 'text' : 'password'}
                        value={payload.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {payload.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={105} />
                </FormControl>

                <FormControl
                    variant="outlined"
                    fullWidth
                    size='small'
                    noValidate
                    style={{
                        minWidth: 30,
                        margin: 5
                    }}>
                    <TextField
                        id="birthDate"
                        label="Birthday"
                        type="date"
                        defaultValue="****-**-**"
                        onChange={handleChange('birthDate')}
                        size='small'
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </FormControl>
                <RadioGroup value={payload.gender}
                    onChange={handleChange('gender')}
                    variant="outlined"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 5
                    }}>
                    <Typography style={{ margin: 5 }}>Gender:</Typography>
                    <FormControlLabel value="female"
                        control={<Radio size='small' color='primary' />}
                        label="Female" />
                    <FormControlLabel value="male"
                        control={<Radio size='small' color='primary' />}
                        label="Male" />
                </RadioGroup>
                <Button
                    onClick={signup}
                    variant="contained"
                    color="primary"
                    size='medium'
                    fullWidth
                >
                    Sign Up
                </Button>
            </FormGroup>
        </Grid >
    )
}
