import React, { useState, useEffect } from 'react'
import firebase, { db } from '../utils/firebase';
import {
    Card,
    Grid,
    Avatar,
    Typography,
    CardContent,
    Collapse,
    Button,
    IconButton,
    makeStyles,
    TextField,
    Popover,
    MenuItem,
    ListItemIcon,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { BsReplyFill, BsChatSquare } from 'react-icons/bs'
import Comments from '../components/Comments';
import SendIcon from '@material-ui/icons/Send';
import { AiFillDelete } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import guest from '../images/guestUser.jpg'
const useStyles = makeStyles((theme) => ({
    image: {
        width: 580,
        maxHeight: 580,
        [theme.breakpoints.down("xs")]: {
            minWidth: 320,
            maxHeight: 350,
        },
    },
    caption: {
        width: 580,
        [theme.breakpoints.down("xs")]: {
            width: 350,
        },
    },
    icon: {
        transform: [{ scaleX: '270deg' }]
    },
}));
export default function Post({ caption, photoUrl, firstName, lastName, timeStamp, imageUrl, postId, userID }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [commentDetails, setCommentDetails] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likeDetails, setLikeDetails] = useState([])
    const [currentUID, setCurrentUID] = useState('')
    const [currentFirstname, setCurrentFirstName] = useState('')
    const [currentLastname, setCurrentLastName] = useState('')
    const [currentPhotoUrl, setcurrentPhotoUrl] = useState('')
    const [likeCount, setLikeCount] = useState(null)

    const handleExpandClick = (postId) => {
        db.collection("posts")
            .doc(postId)
            .collection("comments").orderBy('timeStamp', 'desc')
            .onSnapshot((doc) => {
                let foundContents = commentDetails || [];
                doc.forEach((c) => {
                    foundContents.push({ ...c.data(), id: c.id });
                });
                let check = {};
                let res = [];
                for (let i = 0; i < foundContents.length; i++) {
                    if (!check[foundContents[i]["comment"]]) {
                        check[foundContents[i]["comment"]] = true;
                        res.push(foundContents[i]);
                    }
                }
                setCommentDetails(res);
                setExpanded(!expanded);
            });
    };
    const [payload, setPayload] = useState({
        comment: "",
        forComment: {},
        forLike: {}
    })
    const handleChange = (prop) => (event) => {
        setPayload({ ...payload, [prop]: event.target.value });
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users")
                    .doc(user.uid)
                    .onSnapshot((doc) => {
                        setPayload({ forComment: doc.data(), isLoading: false })
                    });
            } else {
                // No user is signed in.
            }
        });
        return () => {
            setPayload({}); // This worked for me
        };
    }, [])

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            photoUrl: payload.forComment.photoUrl,//profile pic to
            timeStamp: new Date().toString(),
            comment: payload.comment,
            firstName: payload.forComment.firstName,
            lastName: payload.forComment.lastName,
        })
        setPayload({ ...payload, comment: "" })
    }

    const deletePost = (event) => {
        handleClose();
        event.preventDefault();
        db.collection("posts")
            .doc(postId)
            .get()
            .then((doc) => {
                console.log(doc.data().userID);
                if (doc.data().userID === currentUID) {
                    db.collection("posts")
                        .doc(postId)
                        .delete()
                        .then(() => {
                            //success
                        })
                        .catch((error) => {
                            //error
                        });
                }
            })


    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const user = firebase.auth().currentUser;
        db.collection("users")
            .doc(user.uid)
            .onSnapshot((doc) => {
                setCurrentUID(user.uid);
                setCurrentFirstName(doc.data().firstName);
                setCurrentLastName(doc.data().lastName);
                setcurrentPhotoUrl(doc.data().photoUrl);

            });
    }, []);

    useEffect(() => {
        const user = firebase.auth().currentUser;
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .get().then(snap => {
                setLikeCount(snap.size) // will return the collection size
                db.collection("posts")
                    .doc(postId)
                    .collection("likes")
                    .onSnapshot((doc) => {
                        doc.forEach((doc) => {
                            if (user.uid === doc.data().likeUserId) {
                                setLiked(true);
                            }
                        });
                    });
            });

    }, [postId]);

    const niLike = (postId) => {
        const user = firebase.auth().currentUser;
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .add({
                likeUserId: user.uid,
                likePhotoUrl: currentPhotoUrl,
                likeFirstName: currentFirstname,
                likeLastName: currentLastname,
            })
            .then((doc) => {
                //success
                setLiked(true);
                setLikeDetails([]);
                db.collection("posts")
                    .doc(postId)
                    .collection("likes")
                    .get().then(snap => {
                        setLikeCount(snap.size) // will return the collection size
                    });
            })
            .catch((err) => {
                //error
                console.log(likeDetails)
            });
    };

    const niUnlike = (postId) => {
        const user = firebase.auth().currentUser;
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .get()
            .then((doc) => {
                doc.forEach((doc) => {
                    if (user.uid === doc.data().likeUserId) {
                        db.collection("posts")
                            .doc(postId)
                            .collection("likes")
                            .doc(doc.id)
                            .delete()
                            .then(() => {
                                //success
                                setLiked(false);
                                setLikeDetails([]);
                                db.collection("posts")
                                    .doc(postId)
                                    .collection("likes")
                                    .get().then(snap => {
                                        setLikeCount(snap.size) // will return the collection size
                                    });
                            })
                            .catch((error) => {
                                //error
                            });
                        // return;
                    }
                });
            });

    };

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                margin: '15px',
                minWidth: 350
            }}>

            <Card style={{
                background: 'linear-gradient(45deg, #FF92FF 30%, #69E7FE 90%)',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <CardContent>
                    {/* header -> avatar + name */}
                    <Grid item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <Avatar
                            alt="ReminisceLogo"
                            src={photoUrl === "" ? guest : photoUrl}
                            style={{
                                width: '35px',
                                height: '35px',
                            }} />
                        <Typography style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginLeft: '15px'
                        }}>{firstName + " " + lastName}</Typography>
                        <Grid >
                            <IconButton onClick={handleClick}
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                disableRipple
                                style={{
                                    position: 'inherit',
                                    right: 15
                                }}>
                                <BsThreeDots fontSize="small" />
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={deletePost}>
                                    <ListItemIcon >
                                        <AiFillDelete fontSize="small" />
                                    </ListItemIcon>Delete
                                </MenuItem>
                            </Popover>
                        </Grid>

                    </Grid>

                    <Grid item>
                        <Typography style={{
                            fontSize: '.7rem',
                            marginLeft: '50px'
                        }}>{timeStamp}
                        </Typography>
                    </Grid>

                    {/* TEXT INPUT */}
                    <Grid item
                        className={classes.caption}
                        style={{
                            display: 'flex',
                            marginTop: '15px',
                            alignItems: 'center'
                        }}>
                        <Typography paragraph variant='h6' style={{
                            fontSize: '.8rem',
                            fontWeight: 'normal',
                        }}>{caption}</Typography>
                    </Grid>

                    <Grid item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <img src={imageUrl} className={classes.image} alt="" />

                    </Grid>
                    <hr />
                    <Grid item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: '20px',
                            marginRight: '20px'
                        }}>

                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: '.8rem' }}>{likeCount}</Typography>
                            <p style={{ fontSize: 16 }}>
                                {liked ? <FavoriteIcon
                                    color='secondary'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        niUnlike(postId);
                                    }} /> :
                                    <FavoriteBorderIcon
                                        color='disabled'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            niLike(postId);
                                        }} />}
                            </p>
                        </Grid>
                        <Button
                            onClick={() => handleExpandClick(postId)}
                            aria-expanded={expanded}>
                            <BsChatSquare style={{ fontSize: '1rem', marginRight: '5px' }} />Comment
                        </Button>

                        <Button>
                            <BsReplyFill style={{ fontSize: '1.5rem' }} /> Share
                        </Button>
                    </Grid>
                    <Card>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent style={{ backgroundColor: 'rgba(237, 142, 152, 1)' }}>
                                <Comments commentDetails={commentDetails} />
                            </CardContent>
                            <form style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(237, 142, 152, 1)' }}>
                                <TextField
                                    id="comment"
                                    variant="outlined"
                                    autoComplete='off'
                                    value={payload.comment}
                                    size='small'
                                    fullWidth
                                    onChange={handleChange('comment')}
                                    style={{ margin: '5px', }}
                                />
                                <IconButton
                                    variant="contained"
                                    size="medium"
                                    disabled={!payload.comment}
                                    type="submit"
                                    onClick={postComment}
                                >
                                    <SendIcon />
                                </IconButton>
                            </form>
                        </Collapse>
                    </Card>
                </CardContent>
            </Card>
        </Grid >
    )
}
