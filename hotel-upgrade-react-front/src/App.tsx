import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';

export default function App() {
  console.log('toto')
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
