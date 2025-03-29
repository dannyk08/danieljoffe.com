import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import About from './About';
import { Nav } from './shared/Nav';
import Projects from './Projects';
import Contact from './Contact';

// TODO: Add comments and store to projects child routes
// const Comments = React.lazy(() => import('comments/Module'));
// const Store = React.lazy(() => import('store/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Nav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </React.Suspense>
  );
}

export default App;
