import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Home, Us, Ru } from './pages';
import { Header, Footer, Sidebar } from './components';
import { setUnits, setCategories } from './store/catalog';
import { Fragment } from 'react';
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function fetchProducts() {
      const { data: units } = await axios.get('http://localhost:2000/units');
      const { data: categories } = await axios.get(
        'http://localhost:2000/categories'
      );
      dispatch(setUnits(units));
      dispatch(setCategories(categories));
    }

    fetchProducts();
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <main>
        {location.pathname !== '/' && <Sidebar />}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/us' exact component={Us} />
          <Route path='/ru' exact component={Ru} />
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
