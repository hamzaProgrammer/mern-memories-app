import React , {useState}from 'react'
import { Container , Grid  , Grow , makeStyles, Paper, AppBar, TextField , Button } from '@material-ui/core'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import {useDispatch} from 'react-redux'
import {getPosts , getPostBySearch} from '../../actions/Posts'
import Pagination from '../Pagination';
import { useLocation , useHistory } from 'react-router-dom';
import ChipInput  from 'material-ui-chip-input';

// for getting page no
function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
    appBarSearch: {
            borderRadius: 4,
            marginBottom: '1.2rem',
            display: 'flex',
            padding: '16px',
        },
        pagination: {
            borderRadius: 4,
            marginTop: '1rem',
            padding: '16px',
        },
        gridContainer: {
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column-reverse',
            },
        },
}));
const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const [search , setSearch] = useState(''); // search words
    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1; // if no page then page will be 1
    const searchQuery = query.get('searchQuery');

    // on pressing enter whgile search
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){ // measn usehas pressed enter key
            searchPost();
        }
    }

    // on adding new tags
    
    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }
    // Deleting Tags
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete ))
    }

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostBySearch({search , tags: tags.join(',')})); //  we are converting array
                                // of tags to string query , as we can not pass array o tags in search bar
            history.push(`/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/')
        }
    }

    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid  container className = {classes.gridContainer}
                    justifyContent = "space-between"
                    alignItems = "stretch"
                    spacing = {
                        3
                    } >
                        <Grid item xs={12}  sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12}  sm={6} md={3}>
                            <AppBar className = {classes.appBarSearch }
                            position = "static"
                            color = "inherit" >
                                <TextField
                                    name="search"
                                    variant="outlined"
                                    label="Search Memories"
                                    fullWidth
                                    value={search}
                                    onChange={(e)=>{setSearch(e.target.value)}}
                                    onKeyPress={handleKeyPress}
                                />
                                <ChipInput
                                    style={{margin: '10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search tags"
                                />
                                <Button onClick={searchPost} variant="contained" className={classes.seatchButton} color="primary">Search</Button>
                            </AppBar>
                            <Form currentId={currentId}  setCurrentId={setCurrentId} elevation={6} />
                            {(!searchQuery && !tags.length) &&(
                                <Paper className={classes.pagination} elevation={6}>
                                    <Pagination page={page}  />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        
        </>
    )
}

export default Home
