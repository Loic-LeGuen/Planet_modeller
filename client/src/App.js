import AddPlanet from './components/AddPlanet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<AddPlanet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
