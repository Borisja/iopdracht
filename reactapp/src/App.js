import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './component/layout/Toolbar/Navbar';
import Footer from './component/layout/Footer/Footer';
import { Switch, Route} from 'react-router-dom';
import Home from './component/pages/Home';
import Products from './component/pages/Products';
import Login from './component/pages/Login';
import AdminProductsOverview from './component/pages/Admin/Products/AdminProductsOverview';
import AdminProducttsFormNew from './component/pages/Admin/Products/AdminProductsFormNew';
import AdminProducttsFormEdit from './component/pages/Admin/Products/AdminProducttsFormEdit';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/products" component={Products}/>
        <Route path="/login" component={Login}/>
        <Route path="/admin/products/new" component={AdminProducttsFormNew}/>
        <Route path="/admin/products/edit" component={AdminProducttsFormEdit}/>
        <Route path="/admin/products" component={AdminProductsOverview}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
