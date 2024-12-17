import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Homepage from './webpages/Homepage';
import './style/musicplayerstyle.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UploadMusic from './webpages/UploadMusic';
import PlayMusic from './webpages/PlayMusic';
import ProfileUser from './webpages/ProfileUser';
import UserSetting from './webpages/UserSetting';

function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<Homepage />} />
    <Route path='/upload' element={<UploadMusic/>}/>
    <Route path='/listen/:id' element={<PlayMusic/>}/>
    <Route path='/profile/:id' element={<ProfileUser/>}/>
    <Route path='/setting' element={<UserSetting/>}/>
    </Routes>
  </Router>
  );
}

export default App;
