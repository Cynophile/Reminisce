import React from 'react';
import moment from 'moment';
import {
    makeStyles,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Grid
} from '@material-ui/core';
import guest from '../images/guestUser.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 530,
        maxWidth: 530,
        backgroundColor: '#e2e2e2',
        [theme.breakpoints.down("xs")]: {
            maxWidth: 350,
        },
    },
    inline: {
        display: 'block',
    },

}));
export default function Comments(props) {
    const classes = useStyles();

    return (
        <>
            {props.commentDetails.map((item, key) => (
                <List >
                    <ListItem alignItems="flex-start" key={key}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={item.photoUrl ==="" ? guest : item.photoUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.firstName + " " + item.lastName}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >{item.comment}
                                    </Typography>

                                    <Grid item>
                                        {moment(item.timeStamp).fromNow()}
                                    </Grid>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            ))}
        </>
    );
}