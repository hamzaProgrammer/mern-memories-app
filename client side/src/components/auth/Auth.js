import React,{useState} from 'react'
import {makeStyles , Paper , Container , Typography , Avatar , Grid, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'; // a module
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {signin , signup} from '../../actions/auth';


const useStyles = makeStyles((theme) => ({
    paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        googleButton: {
            marginBottom: theme.spacing(2),
        },
}))

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    conformPassword: ''
}
const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [isSignup, sertisSignup] = useState(false)
    const [showPassword , setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)


    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignup){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData ,[e.target.name]: e.target.value })
    }

    const handleShowPassword = () => setShowPassword((prevShowPass) => !prevShowPass);

    const switchMode = () => {
        sertisSignup((prevState) => !prevState)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // now this will not thrw error if res is not got
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: { result , token }});
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Login was UnsuccessFull. Try again later");
    }
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} evaluation={3}>
                    <Avatar  className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant="h5"> { isSignup ? 'Sign Up' : ' SignIn '} </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus  />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange}  />
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'}  handleShowPassword={handleShowPassword}/>
                            {
                                isSignup &&  <Input name="conformPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                            }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {
                                isSignup ? 'Sign Up' : 'Sign In'
                            }
                        </Button>
                        <GoogleLogin
                            clientId = "235912315114-qb8ju0slg0olmunes0cvu0jkbur79aht.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color = "primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                    >
                                        Google Sign in
                                    </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item >
                                <Button onClick={switchMode}>
                                    {
                                        isSignup ? ' Alreay have an Account? Sign In' : 'Do not have an Account Sig Up'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Auth
