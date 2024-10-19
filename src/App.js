import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AddItem from './pages/Upload';
import ViewItems from './pages/ViewItems';

function App() {
  return (
    <div className="App">
      {/* <Login />
      <FileUpload /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<AddItem />} />
          <Route path="/items" element={<ViewItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
