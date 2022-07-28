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
          <Route path = "/dashboard" element = {<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// [1,1.25,1,1,1] gen
// [1.25,1,1,1,1] min
// [1,1,1,0,2.25] forge  
// [1,1.25,1,1.1,1.1] industrial
// [1,1,1,2.25,0] factory