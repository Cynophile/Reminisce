import React from "react";
import {
    Grid,
    Button,
    Card,
    CardContent,
    FormGroup,
    Modal,
    Backdrop,
    Fade,
    makeStyles,
} from "@material-ui/core";
import Logo from "../images/Login.gif";

import Login from "../components/Login"
import Register from "../components/Register";

const useStyles = makeStyles((theme) => ({
    section: {
        [theme.breakpoints.down("xs")]: {
            marginTop: '15vh',
            textAlign: "center",
        },
        [theme.breakpoints.down("lg")]: {
            marginTop: '20vh',
            textAlign: "center",
        },
    },
    section__2: {
        [theme.breakpoints.down("xs")]: {
            marginTop: '15vh',
        },
        [theme.breakpoints.down("lg")]: {
            marginTop: '15vh',
        },
    },
    image: {
        width: 720,
        [theme.breakpoints.down("xs")]: {
            width: 350,
        },
    },
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
}));

const LandingPage = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {/* LEFT SIDE */}
            <Grid item
                xs={10}
                lg={5}
                style={{
                    flexDirection: 'column',
                    height: '50vh',
                    alignItems: "center",
                    justifyContent: "center",
                    display: 'flex',
                }}
                className={classes.section}>
                <Grid item>
                    <img src={Logo} className={classes.image} alt="" />
                    <h2 style={{ color: "#555", fontWeight: 500, fontFamily: 'Fredoka One' }}>
                        Photo and Video Sharing Application
                    </h2>
                    <p style={{ color: "#000", fontSize: '20px', fontFamily: 'Pacifico' }}>
                        Indulge the enjoyable recollection of past events.
                        Reminisce about the little episodes that we shared together.
                    </p>
                </Grid>
            </Grid>

            {/* RIGHT SIDE */}

            <Grid item
                xs={10}
                lg={5}
                className={classes.section__2}
                style={{
                    flexDirection: 'column',
                    minHeight: '50vh',
                    alignItems: "center",
                    justifyContent: "center",
                    display: 'flex',
                    marginBottom: '5vh',
                }}>
                <Grid item >
                    <Card style={{ background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)', }}>
                        <CardContent>
                            <Login />
                        </CardContent>
                    </Card>

                    <Card style={{
                        marginTop: 20,
                        background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                    }}>
                        <CardContent>
                            <h2 style={{
                                color: "#000",
                                fontWeight: 500,
                                fontFamily: 'Fredoka One',
                                textAlign: 'center',
                            }}>
                                Hello, Friend
                            </h2>
                            <h3 style={{
                                color: "#000",
                                fontWeight: 300,
                                textAlign: 'center'
                            }}>Enter your personal details and start journey with us</h3>
                            <FormGroup style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size='medium'
                                    onClick={handleOpen}>
                                    Sign Up
                                </Button>

                                <Modal
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
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
                                            <Register />
                                        </Grid>
                                    </Fade>
                                </Modal>
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default LandingPage;