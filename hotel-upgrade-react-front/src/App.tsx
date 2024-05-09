import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import Products from './components/Products';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/products" element={<Products/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
