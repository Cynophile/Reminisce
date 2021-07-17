import React from "react";
//IMPORTED STYLES
import {
    Grid,
    FormGroup,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
//IMPORTED ICONS

import firebase from "../utils/firebase";

const Recovery = () => {
    const [payload, setPayload] = React.useState({
        email: "",
        errors: "",
        message: "",
        showPassword: false,
    });

    const handleChange = (prop) => (text) => {
        setPayload({ ...payload, [prop]: text.target.value });
    };
    const submit = (event) => {
        event.preventDefault();
        if (!payload.email) {
            setPayload({ ...payload, errors: "Please type your email address!" })
        } else {
            
            firebase.auth().sendPasswordResetEmail(payload.email)
                .then(() => {
                    setPayload({ ...payload, message: "We have E-mailed your password reset link!" })
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    setPayload({ ...payload, errors: errorMessage })
                });
        }
    }
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                minHeight: "15vh",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <FormGroup style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography style={{
                    fontSize: '1.5rem',
                    fontFamily: 'Fredoka One',
                    textAlign: 'center',
                }}>Forgot Password</Typography>

                {payload.message && (< Alert severity='success' style={{ margin: 10 }}>
                    {"Success - " + payload.message}
                </Alert>)}

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

                <Button onClick={submit} variant="contained" color="primary" size='medium'>
                    Submit
                </Button>
            </FormGroup>
        </Grid>
    );
};

export default Recovery;