import Kysely from './components/Kysely';
import Etusivu from './components/Etusivu';
import Vastaukset from './components/Vastaukset';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Statistiikka from './components/Statistiikka';

export default function App() {

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">     
          <Router>
            <Routes>
                <Route exact path="/" element={<Etusivu />} />
                <Route path="/kysely/:id" element={<Kysely />} />
                <Route path="/vastaukset/:id" element={<Vastaukset />} />
                <Route path="/Statistiikka" element={<Statistiikka />} />
                <Route render={() => <h1>Page not found</h1>} />
            </Routes>
          </Router>
        </AppBar>
      </Box>
    </div>
  );
}