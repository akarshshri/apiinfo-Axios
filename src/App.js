import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import LoggedIn from './components/LoggedIn';

const api = axios.create(
  { baseURL: `https://myphysio.digitaldarwin.in/api/login/` }
)

const Stateless = () => {
  if(localStorage.getItem('apiinfo') === null){
    localStorage.setItem('apiinfo',JSON.stringify([{usename: '', password: '' , userState: '',name:''}]));
  }
};

function App() {

  const userchangeHandle = (event)=>{
    setUsername(event.target.value);
  }
  const passwordchangeHandle = (event)=>{
    setPassword(event.target.value);
  }

  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [res, setRes] = useState(' ');
  useEffect(() => {
  }, []);

  const logout = ()=>{
    setRes('');
    let arr = [{usename: '', password: '' , userState: ''}]
    localStorage.removeItem('apiinfo');
    localStorage.setItem('apiinfo',JSON.stringify(arr));
   
  }

  const submitEvent = async (e)=>{
    e.preventDefault()
    let temp = await api.post('/', { "uid": username, "password": password, "blocked": 0 }) 
    setRes(temp)
    setStatus('OK')
  }

  return (
    <div className="App container">
      {Stateless()}
      {(res.statusText === 'OK' || JSON.parse(localStorage.getItem('apiinfo'))[0].userState === 'OK')?(
        <LoggedIn response ={ res} userState={res.statusText} logout={logout} username={username} password={password} status={status}/>
      ): (
        <form onSubmit={submitEvent}><h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >Username</label>
          <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder='maymis10098' onChange={userchangeHandle}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder='Mayank@123' onChange={passwordchangeHandle}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      )}
      
    </div>
  );
}

export default App;
