
import UserLayout from './layouts/UserLayout'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Products from './pages/Produit/Products';
import AdminProduits from './pagesAdmin/AdminDashboard';
import LoginPage from './pages/login/LoginPage';
import AdminDashboard from './pagesAdmin/AdminDashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout/>}>
            <Route path="/" element={ <Home />} />
            <Route path="/acceuil" element={ <Home />} />
            {/* <Route path="/home/produits" element={<Products />} /> */}
            <Route path="/home/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

