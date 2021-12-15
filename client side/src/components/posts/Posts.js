import React from 'react'
import Post from './post/Post'
import { makeStyles, Grid , CircularProgress} from '@material-ui/core'
import {useSelector} from 'react-redux'
import { deepPurple } from '@material-ui/core/colors';

const useStyles =  makeStyles((theme) => ({
   mainContainer: {
       borderRadius: 15,
       margin: '30px 0',
       display: 'flex',
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       padding: '10px 50px',
     },
     heading: {
       color: 'rgba(0,183,255, 1)',
       textDecoration: 'none',
     },
     image: {
       marginLeft: '15px',
     },
     toolbar: {
       display: 'flex',
       justifyContent: 'flex-end',
       width: '400px',
     },
     profile: {
       display: 'flex',
       justifyContent: 'space-between',
       width: '400px',
     },
     userName: {
       display: 'flex',
       alignItems: 'center',
     },
     brandContainer: {
       display: 'flex',
       alignItems: 'center',
     },
     smMargin: {
       margin: theme.spacing(1),
     },
     purple: {
       color: theme.palette.getContrastText(deepPurple[500]),
       backgroundColor: deepPurple[500],
     },
     [theme.breakpoints.down('sm')]: {
       appBar: {
         padding: '10px 20px',
       },
       heading: {
         display: 'none',
       },
       userName: {
         display: 'none',
       },
       image: {
         marginLeft: '5px',
       },
       toolbar: {
         display: 'flex',
         justifyContent: 'flex-end',
         width: '160px',
       },
     },

     actionDiv: {
       textAlign: 'center',
     },
}));
const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const { posts  , isLoading } = useSelector((state) => state.posts);

  if(!posts.length  &&  !isLoading) {
    return 'No Posts';
  }
    return (
        isLoading ? <CircularProgress /> :
                              (
                                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                  {
                                    posts.map((post) => (
                                      <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                                            <Post post={post} setCurrentId={setCurrentId} />
                                      </Grid>
                                    ))
                                  }
                                </Grid>
                              )
    )
}

export default Posts
