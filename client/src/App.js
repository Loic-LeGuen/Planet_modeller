import AddPlanet from './components/AddPlanet';
import EditPlanet from './components/EditPlanet';
import Dashboard from './components/ViewAll'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/planets/add" element = {<AddPlanet/>}/>
          <Route path="/planets/edit/:id" element = {<EditPlanet/>}/>
          <Route path = "/" element = {<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;