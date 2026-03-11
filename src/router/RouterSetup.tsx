import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Table from '../pages/Table';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Start from '../pages/Start';
import Analysis from '../pages/Analysis';

function RouterSetup() {
  return (
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/table" element={<Table />}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/table/analysis' element={<Analysis/>}/>
    </Routes>
  );
}

export default RouterSetup;
