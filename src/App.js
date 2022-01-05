import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Home, Us, Ru } from './pages';
import { Header, Footer, Sidebar } from './components';
import { setUnits, setCategories } from './store/catalog';
import { Fragment } from 'react';
import { useClopType } from './hooks';
function App() {
  const dispatch = useDispatch();
  const clopType = useClopType();
  const location = useLocation();

  useEffect(() => {
    async function fetchProducts() {
      const { data: units } = await axios.get('https://clop.armaproject.ru/units');
      const { data } = await axios.get(
        'https://clop.armaproject.ru/categories'
      );
      dispatch(setUnits(units));
      dispatch(setCategories({ categories: data, clopType }));
    }

    fetchProducts();
    // eslint-disable-next-line
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
          <Route path='/us-light' exact component={Us} />
          <Route path='/ru-light' exact component={Ru} />
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
