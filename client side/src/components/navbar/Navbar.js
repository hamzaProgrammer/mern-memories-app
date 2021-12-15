import React,{useState , useEffect} from 'react'
import { makeStyles,  AppBar , Avatar , Typography, Toolbar, Button} from '@material-ui/core'
import memories from '../../images/memories.png'
import { deepPurple } from '@material-ui/core/colors';
import {Link, useHistory , useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
    appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation(); // gives us live current url

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        setUser(null);
        history.push('/');

    }

    useEffect(()=> {
        const token = user?.token;

        // This will automatically sign out iser if his token expires
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography componet={Link} to="/" className={classes.heading} variant="h3" align="center">Memories</Typography>
                <img src={memories} className={classes.image}  alt="Memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar  className={classes.purple} alt={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.username} vriant="h6" >{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button  component={Link} variant="contained" to="/auth" color="primary" >Sign In</Button>
                    )
                }
            </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
