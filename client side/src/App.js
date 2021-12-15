import React  from 'react'
import {Container } from '@material-ui/core'
import './App.css';
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import {Switch , Route, Redirect} from 'react-router-dom'
import Auth from './components/auth/Auth';
import PostDetails from './components/postDetails/PostDetails'

function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <>
        <Container maxWidth="lg">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Home} />
            <Route path="/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/" /> )} />
          </Switch>
        </Container>
    </>
  );
}

export default App;
