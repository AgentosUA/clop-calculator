import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home, Us } from './pages';
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
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
