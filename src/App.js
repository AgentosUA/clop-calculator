import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Us, Ru, Cart } from './pages';
import { Header, Footer, Navigation } from './components'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Navigation />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/us' exact component={Us} />
          <Route path='/ru' exact component={Ru} />
          <Route path='/cart' exact component={Cart} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
