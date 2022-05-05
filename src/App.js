import Kysely from './components/Kysely';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import Etusivu from './components/Etusivu';
import { Button } from '@mui/material';
import Vastaukset from './components/Vastaukset';

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Router>
            <Routes>
              <Route exact path="/" element={<Etusivu />} />
              <Route path="/kysely/:kyselyid" element={<Kysely />} />
              <Route path="/vastaukset/:kyselyid" element={<Vastaukset />} />
              <Route render={() => <h1>Page not found</h1>} />
            </Routes>
          </Router>
        </AppBar>
      </Box>
    </div>
  );
}

export default App;
