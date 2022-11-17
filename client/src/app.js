import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import {Home} from './components/Home';
import {About} from './components/About';
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import {Navbar} from './components/Navbar';
import { Contact } from './components/Contact';
import {Error} from './components/Error';
import { createContext,useContext,useState } from 'react';

export const logContext = createContext(null);
const App = ()=>{
    const [login,setLogin] = useState(false)
    return(
        <BrowserRouter>
        <logContext.Provider value={{login,setLogin}}>
    <Navbar/>
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/logout' element={<Error/>}/>
        </Routes>
    </logContext.Provider>
    </BrowserRouter>
    )
};
export default App;