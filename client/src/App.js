import React from 'react';
import { MainNavbar } from './components/Nav';
import { Home } from './components/Home';
import { About } from './components/About';
import { CategoryList } from './components/CategoryList';
import { CategoryDetail } from './components/CategoryDetail';
import { CategoryForm } from './components/CategoryForm';
import { CategoryDelete } from './components/CategoryDelete';
import { ItemDetail } from './components/ItemDetail';
import { ItemForm } from './components/ItemForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Set the 'Detail' route at the end, to avoid conflict with dynamic url => category/:id and category/create (same as :id)

function App() {
  return (
    <Router>
      <header>
        <MainNavbar />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/category">
            <CategoryList />
          </Route>
          <Route exact path="/category/create">
            <CategoryForm title="Create" />
          </Route>
          <Route exact path="/category/:id/update">
            <CategoryForm title="Update" />
          </Route>
          <Route exact path="/category/:id/delete">
            <CategoryDelete />
          </Route>
          <Route exact path="/category/:id">
            <CategoryDetail />
          </Route>
          <Route exact path="/item/create">
            <ItemForm title="Create" />
          </Route>
          <Route exact path="/item/:id/update">
            <ItemForm title="Update" />
          </Route>
          <Route exact path="/item/:id">
            <ItemDetail />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
