import React , {useState} from 'react'
import { makeStyles, TextField , Button , Typography , Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch , useSelector} from 'react-redux'
import  {createPost , updatePost} from '../../actions/Posts'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
   root: {
       '& .MuiTextField-root': {
         margin: theme.spacing(1),
       },
     },
     paper: {
       padding: theme.spacing(2),
     },
     form: {
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'center',
     },
     fileInput: {
       width: '97%',
       margin: '10px 0',
     },
     buttonSubmit: {
       marginBottom: 10,
     },
}));

// getting current post id

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const history = useHistory();
    const [postData, setPostData] = useState({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
    const post =useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user?.result?.name){
      return(
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center"> Please Create Account to create your own memories or like other memories </Typography>
        </Paper>
      )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
          dispatch(updatePost(currentId, {...postData ,name: user?.result?.name}));
        }else{
          dispatch(createPost({...postData ,name: user?.result?.name}));
        }
        clear();
        history.push('/')
    }

    const clear = () => {
        setCurrentId(null);
        console.log("called null");
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

    /* useEffect(()=> {
        if(post) setPostData(post)
    },[post]) */
    return (
        <>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Updating': 'Creating'} Memories</Typography>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData , title: e.target.value}) }  />
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData , message: e.target.value}) }  />
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData , tags: e.target.value.split(',') }) }  />
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false}  onDone={({base64}) => setPostData({...postData, selectedFile: base64}) } />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" size="large" color="primary" type="submit" fullWidth>Submit</Button>
                    <Button  variant="contained" size="small" color="secondary" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </>
    )
}

export default Form
