import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Home from './Home';
const Comments = React.lazy(() => import('comments/Module'));
const Store = React.lazy(() => import('store/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/comments">Comments</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
