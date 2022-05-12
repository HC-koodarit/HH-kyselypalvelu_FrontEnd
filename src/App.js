import Kysely from './components/Kysely';
import Etusivu from './components/Etusivu';
import Vastaukset from './components/Vastaukset';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Route, Routes, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">     
          <Router>
            <navbar />
            <Routes>
                <Route exact path="/" element={<Etusivu />} />
                <Route path="/kysely/:id" element={<Kysely />} />
                <Route path="/vastaukset/:id" element={<Vastaukset />} />
                <Route render={() => <h1>Page not found</h1>} />
            </Routes>
          </Router>
        </AppBar>
      </Box>
    </div>
  );
}

export default App;
