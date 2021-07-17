import React, { useState, useEffect } from 'react'
import { db } from '../utils/firebase'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import Post from '../isAuthenticated/Post'
import UploadFile from '../isAuthenticated/UploadFile'

export default function Home() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                display: 'flex',
                position: 'static',
                alignItems: 'center',
                marginTop: '15px',
                justifyContent: 'center',
            }}
        >
            <UploadFile />
            {
                posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        userID={post.userID}
                        photoUrl={post.photoUrl}
                        firstName={post.firstName}
                        lastName={post.lastName}
                        timeStamp={moment(post.timeStamp).fromNow()}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                    />

                ))
            }
        </Grid>

    )
}
