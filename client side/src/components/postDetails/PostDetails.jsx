import React , { useEffect } from 'react'
import { Paper , Typography , CircularProgress , Divider , makeStyles } from '@material-ui/core'
import { useSelector , useDispatch } from 'react-redux'
import moment from 'moment'
import { useParams , useHistory } from 'react-router-dom'
import {getPost , getPostBySearch} from '../../actions/Posts'
import CommentSection from './Comments'

const useStyles = makeStyles((theme) => ({
    media: {
            borderRadius: '20px',
            objectFit: 'cover',
            width: '100%',
            maxHeight: '600px',

        },
        card: {
            display: 'flex',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
                flexDirection: 'column',
            },
        },
        section: {
            borderRadius: '20px',
            margin: '10px',
            flex: 1,
        },
        imageSection: {
            marginLeft: '20px',
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
            },
        },
        recommendedPosts: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        loadingPaper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '15px',
            height: '39vh',
        },
}));
const PostDetails = () => {
    const { posts , isLoading , post } = useSelector((state) => state.posts)
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams()

     useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    console.log(recommendedPosts);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>


        {/* Recommended Posts */}
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
    )
}

export default PostDetails
