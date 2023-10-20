import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
