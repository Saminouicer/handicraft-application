import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Logup from './components/Logup';
import NavBare from './components/NavBare';
import CraftsmanProfile from './components/CraftsmanProfile';
import ClientProfile from './components/ClientProfile';
import { ContextProvider } from './components/Auth';
import RequireAuth from './components/RequireAuth';
import AdminProfile from './components/AdminProfile';
import CraftsmanLogup from './components/CrsftsmanLogup'
import ClientLogup from './components/ClientLogup'
import EditeUser from './components/EditeUser'
import EditeProduct from './components/EditeProduct';
import UsersList from './components/UsersList';
import Welcome from './components/Welcome';
import MakeOrder from './components/MakeOrder';
import CraftsmanProducts from './components/CraftsmanProducts';
import ImageUpload from './components/ImageUpload';
import ProductDetails from './components/ProductDetails';
import SearchProduct from './components/SearchProduct';

function App() {
  return (
    <div className="App ">
       <Router>
        <ContextProvider>
          <NavBare/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              {/* <Route path='/welcome' element={<Welcome/>}/> */}
              <Route path='/login' element={<Login/>}/>
              <Route path='/logup' element={<Logup/>}/>
              <Route path='/CraftsmanProfile' element={
                <RequireAuth>
                <CraftsmanProfile/>
                </RequireAuth>}/>
              <Route path='/ClientProfile' element={
                <RequireAuth>
                <ClientProfile/>
                </RequireAuth>}/>
              <Route path='/AdminProfile' element={
                <RequireAuth>
                <AdminProfile/>
                </RequireAuth>}/>
              <Route path='/CraftsmanLogup' element={<CraftsmanLogup/>}/>
              <Route path='/ClientLogup' element={<ClientLogup/>}/>
              <Route path='/EditeUser/:userId' element={<EditeUser/>}/>
              <Route path='/EditeProduct/:productId' element={<EditeProduct/>}/>
              <Route path='/makeOrder/:productId' element={<MakeOrder/>}/>
              <Route path='/uploadImage/:productId' element={<ImageUpload/>}/>
              <Route path='/productDetails/:productId' element={<ProductDetails/>}/>
              <Route path='/searchProduct' element={<SearchProduct/>}/>
              {/* <Route path='/craftsmanProducts' element={<CraftsmanProducts/>}/> */}
            </Routes>
          </ContextProvider>
        </Router>
    </div>
  );
}

export default App;
