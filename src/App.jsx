
import { Route, Routes } from 'react-router-dom';

import { ItemDetailContainer } from './components/ItemDetail/ItemDetailContainer';
import { ItemListContainer } from './components/Item/ItemListContainer';
import { NavBar } from './components/Header/NavBar';
import { Search } from './components/Search/Search';

import './App.css';
import { Login } from './components/Login/Login';
import { Contacto } from './components/Contacto/Contacto';
import { Nosotros } from './components/Nosotros/Nosotros';
import { Cart } from './components/Cart/Cart';
import { CartProvider } from './components/context/CartContext';



function App() {


  return (
    <>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/categoria/:cat" element={<ItemListContainer />} />
          <Route path="/search" element={<Search />} />

          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </CartProvider>
    </>

  );
}

export default App;
