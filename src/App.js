import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Home, Us, Ru, Cart } from './pages';
import { Header, Footer, Navigation, Sidebar } from './components'
import { setUnits, setCategories } from './store/catalog';
import { Fragment } from 'react';
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function fetchProducts() {
      const { data: units } = await axios.get('http://localhost:2000/units');
      const { data: categories } = await axios.get('http://localhost:2000/categories');
      dispatch(setUnits(units));
      dispatch(setCategories(categories));
    }

    fetchProducts();
  });

  return (
    <Fragment>
      <Header />
      <main>
        {location.pathname !== '/' && <Sidebar />}
        {/*{console.log(currentLocation)}*/}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/us' exact component={Us} />
          <Route path='/ru' exact component={Ru} />
          <Route path='/cart' exact component={Cart} />
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
