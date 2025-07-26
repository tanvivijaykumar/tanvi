import {BrowserRouter ,Routes, Route, Form} from 'react-router-dom' 
import Home from './Components/Home';
import Insert from './Components/InsertProduct';
import View from './Components/ViewProduct';
import AppBarrr from './Components/AppBarrr';


function App() {
  return (
    <div>
      <BrowserRouter>
      <AppBarrr/>
        <Routes>
          
          <Route exact path='/' element={<Home/>}/>
          <Route path='/InsertProduct' element={<Insert/>}/>
          <Route path='/ViewProduct' element={<View/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;