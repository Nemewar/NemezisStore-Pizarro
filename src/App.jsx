
import './App.css';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { NavBar } from './components/NavBar/NavBar';


function App() {


  return (
    <>
      <NavBar/>
      {/* <ItemListContainer greetings="Bienvenido a NemezisStore"/> */}
      <ItemDetailContainer/>
    </>

  );
}

export default App;
