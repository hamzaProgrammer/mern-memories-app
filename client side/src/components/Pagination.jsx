import React , {useEffect} from 'react'
import { Pagination , PaginationItem  } from '@material-ui/lab';
import  { makeStyles } from '@material-ui/core'
import {Link} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux'
import {getPosts} from '../actions/Posts';


const useStyles = makeStyles(() => ({
    ul: {
        justifyContent: 'space-around',
    },
}));
const PaginationComp = ({page}) => {
    const classes = useStyles();
    const { numberOfPages } = useStyles(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if(page){
            dispatch(getPosts(page))
        }
    },[page])
    return (
        <>
            <Pagination
                classes={{ul: classes.ul}}
                count={numberOfPages}
                page={Number(page) || 1}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
                ) }
            />
        </>
    )
}

export default PaginationComp
