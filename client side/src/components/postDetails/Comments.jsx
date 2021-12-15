import React ,{useState} from 'react'
import { Typography , TextField , Button , makeStyles } from '@material-ui/core'
import { useSelector , useDispatch } from 'react-redux'
import { commentPost } from '../../actions/Posts';

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
        commentsOuterContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        commentsInnerContainer: {
            height: '200px',
            overflowY: 'auto',
            marginRight: '30px',
        },
}))
const Comments = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    //const commentsRef = useRef();

    const handleComment = async () => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    //commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };


    return (
        <>
            <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div  />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
        </>
    )
}

export default Comments
