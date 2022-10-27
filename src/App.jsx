
import { Route, Routes } from 'react-router-dom';

import { ItemDetailContainer } from './components/ItemDetail/ItemDetailContainer';
import { ItemListContainer } from './components/Item/ItemListContainer';
import { NavBar } from './components/Header/NavBar';
import { Search } from './components/Search/Search';

import './App.css';
import { Contacto } from './components/Contacto/Contacto';
import { Nosotros } from './components/Nosotros/Nosotros';
import { Cart } from './components/Cart/Cart';
import { CartProvider } from './components/context/CartContext';
import { Footer } from './components/Footer/Footer';
import { exportDataToFirestore} from './services/firestore';
import { useEffect } from 'react';
import { UserProvider } from './components/context/UserContext';
import { Register } from './components/Register/Register';
import { OrderList } from './components/Order/OrderList';
import { Checkout } from './components/Checkout/Checkout';
import { Order } from './components/Order/Order';
import { Modal } from './components/ModalLogin/Modal';
import { ModalProvider } from './components/context/ModalContext';
import { Carrusel } from './components/Carrusel/Carrusel';





function App() {

  useEffect(() => {
    exportDataToFirestore()
  }, [])


  return (
    <>

      <UserProvider>
        <CartProvider>
          <ModalProvider>
            <Modal />
            <NavBar />

            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/categoria/:cat" element={<ItemListContainer />} />
              <Route path="/search" element={<Search />} />

              <Route path="/contacto" element={<Contacto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/register" element={<Register />} />

              <Route path='/checkout' element={<Checkout />} />
              <Route path='/account/orders' element={<OrderList />} />
              <Route path="/account/orders/:id" element={<Order />} />

            </Routes>
            <Footer />

          </ModalProvider>
        </CartProvider>
      </UserProvider>

    </>

  );
}

export default App;
