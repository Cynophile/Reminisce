import React from "react";
import { useHistory} from "react-router-dom";
//IMPORTED STYLES
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
    Modal,
    Backdrop,
    Fade,
    makeStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
//IMPORTED ICONS
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

import { facebookProvider, googleProvider } from "../utils/firebase";
import firebase from "../utils/firebase";
import Recovery from "./ForgotPass";
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
    },
    paper: {
        background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 3, 3, 2),
    },
}))
const Login = () => {
    const history = useHistory();
    const classes = useStyles();
    const [payload, setPayload] = React.useState({
        email: "",
        password: "",
        errors: "",
        showPassword: false,
    });

    const handleChange = (prop) => (text) => {
        setPayload({ ...payload, [prop]: text.target.value });
    };
    const handleClickShowPassword = () => {
        setPayload({ ...payload, showPassword: !payload.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    const login = (event) => {
        event.preventDefault();

        if (!payload.email || !payload.password) {
            setPayload({ ...payload, errors: "Login failed. Some fields are empty!" })
        } else {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    history.push("/home")
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    setPayload({ ...payload, errors: errorMessage })
                });
        }
    };
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                minHeight: "50vh",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <FormGroup style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography style={{
                    fontSize: '3rem',
                    fontFamily: 'Fredoka One',
                    textAlign: 'center',
                }}>Sign In</Typography>

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
                }}>or use your account</Typography>

                {payload.errors && (< Alert severity="error" style={{ margin: 10 }}>
                    {"Error - " + payload.errors}
                </Alert>)}

                {/* Form */}

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange('email')}
                    style={{
                        margin: 5
                    }} />

                <FormControl
                    variant="outlined"
                    fullWidth
                    style={{
                        minWidth: 30,
                        margin: 5
                    }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        labelWidth={70}
                    />
                </FormControl>

                <Button onClick={handleOpen} style={{
                    fontSize: '.8rem',
                    borderRadius: '30px',
                    marginLeft: '45px',
                    marginRight: '45px',
                    color: 'blue'
                }}>Forgot your password?</Button>

                <Modal
                    className={classes.modal}
                    open={open}
                    onClose={(handleClose)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={open}>
                        <Grid
                            item
                            xs={10}
                            lg={3}
                            className={classes.paper}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Recovery />
                        </Grid>
                    </Fade>
                </Modal>

                <Button onClick={login} variant="contained" color="primary" size='medium'>
                    Sign In
                </Button>
            </FormGroup>
        </Grid>
    );
};

export default Login;