import React, { useState, useEffect } from 'react'
import firebase, { db, storage } from '../utils/firebase';
import {
    Card,
    Grid,
    Avatar,
    CardContent,
    Button,
    makeStyles,
    Modal,
    Backdrop,
    Fade,
    IconButton,
    Typography,
    TextField,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import guest from '../images/guestUser.jpg'
import { v4 as uuidV4 } from "uuid";

const useStyles = makeStyles((theme) => ({
    image: {
        width: 420,
        [theme.breakpoints.down("xs")]: {
            minWidth: 320,
        },
    },
    modalImage: {
        marginTop: '5px',
        maxWidth: '22vw',
        [theme.breakpoints.down("xs")]: {
            maxWidth: '79vw',
        },
    },
    section: {

        width: 580,
        [theme.breakpoints.down("xs")]: {
            width: 350,
        },
    },
    iconBtn: {

        width: 540,
        [theme.breakpoints.down("xs")]: {
            width: 310,
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100vw',
    },
    paper: {
        background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 3, 2, 3),
    },

}));
export default function UploadFile() {
    const classes = useStyles();
    const [values, setValues] = useState({
        caption: '',
        progress: 0,
        profile: '',
        user: {}
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [image, setImage] = useState('');
    const handleImage = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }

    }
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users")
                    .doc(user.uid)
                    .onSnapshot((doc) => {
                        setValues({ user: doc.data(), isLoading: false })
                    });
            } else {
                // No user is signed in.
            }
        });
        return () => {
            setValues({}); // This worked for me
        };
    }, [])

    const uploadFileWithClick = (event) => {
        document.getElementsByClassName('imageFile')[0].click();
    }

    const post = (event) => {
        event.preventDefault();
        const id = uuidV4();
        const user = firebase.auth().currentUser;
        if (!values.caption && image === '') {
            alert("please fill up the following fields")
            setValues({ ...values, isLoading: false });
        }
        else if (image === '') {
            setValues({ ...values, isLoading: true });
            db.collection("posts").add({
                userID: user.uid,
                photoUrl: values.user.photoUrl,//profile pic to
                timeStamp: new Date().toString(),
                caption: values.caption,
                imageUrl: image,
                firstName: values.user.firstName,
                lastName: values.user.lastName,
            })
            setValues({ ...values, progress: 0, isLoading: false })
            setValues({ ...values, caption: "" })
            handleClose();
        } else {
            const uploadTask = storage.ref(`images/${id}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setValues({ ...values, progress: progress });
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    setValues({ ...values, isLoading: true });
                    storage
                        .ref("images")
                        .child(id)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                userID: user.uid,
                                photoUrl: values.user.photoUrl,
                                timeStamp: new Date().toString(),
                                caption: values.caption,
                                imageUrl: url,
                                firstName: values.user.firstName,
                                lastName: values.user.lastName
                            })
                            setValues({ ...values, progress: 0, isLoading: false })
                            setValues({ ...values, caption: "" })
                            setImage("");
                            handleClose();
                        })
                }
            )
        }
    }
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                display: 'flex',
                position: 'static',
                margin: '15px',
                justifyContent: 'center'
            }}
        >
            <Card style={{ background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)', }}>
                <CardContent>
                    {/* header -> avatar + name */}
                    <Grid item xs
                        className={classes.section}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <Avatar
                            alt="ReminisceLogo"
                            src={values.user.photoUrl === "" ? guest : values.user.photoUrl}
                            style={{
                                width: '40px',
                                height: '40px',
                            }} />
                        <Button
                            onClick={handleOpen}
                            className={classes.iconBtn}
                            style={{
                                display: 'flex',
                                justifyContent: "flex-start",
                                borderRadius: '30px',
                                color: '#555',
                                background: '#e2e2e2',
                                opacity: '0.7',
                                marginLeft: '10px',
                                fontSize: '.8rem'
                            }}>{`What's on your mind, ${values.user.firstName}?`}</Button>
                    </Grid>
                    <Grid item xs
                        className={classes.section}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px'
                        }}>
                        <IconButton
                            onClick={handleOpen}
                            style={{
                                borderRadius: '30px',
                                width: '150px',
                                color: '#555',
                                background: '#e2e2e2',
                                opacity: '0.7',
                                marginLeft: '10px',
                                fontSize: '.8rem'
                            }}>Add Photos</IconButton>
                    </Grid>
                </CardContent>
            </Card>
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
                        xs={11}
                        lg={3}
                        className={classes.paper}
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Grid item
                            style={{
                                display: 'flex',
                                width: '350px',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                            <Avatar
                                alt="ReminisceLogo"
                                src={values.user.photoUrl}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                }} />
                            <Typography style={{
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}>{`${values.user.firstName} ${values.user.lastName}`}</Typography>
                        </Grid>

                        <Grid item
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <TextField
                                id="caption"
                                name="caption"
                                placeholder={`What's on your mind, ${values.user.firstName}?`}
                                variant="outlined"
                                autoComplete='off'
                                fullWidth
                                multiline
                                rows={4}
                                size='small'
                                onChange={handleChange('caption')}
                            />
                            {/* <img onChange={uploadFileWithClick} className={classes.modalImage} /> */}

                            <Grid item style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" component="span" onClick={uploadFileWithClick}>
                                        <PhotoCamera />
                                        <input type="file" className="imageFile" onChange={handleImage} style={{ display: "none" }} />
                                    </IconButton>
                                </label>
                            </Grid>

                        </Grid>
                        <Button onClick={post} variant='contained' color='secondary' disabled={!values.caption && image === ""}>POST</Button>


                    </Grid>
                </Fade>
            </Modal>
        </Grid>
    )
}
