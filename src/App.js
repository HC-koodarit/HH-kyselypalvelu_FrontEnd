import Kysely from './components/Kysely';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import React, { useState } from 'react';
import Etusivu from './components/Etusivu';
import Statistiikka from './components/Statistiikka';
import { Button } from '@mui/material';
import Vastaukset from './components/Vastaukset';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [value, setValue] = useState('etusivu');
  const handleTabChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App" id="tabscss">
      <div>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab value="etusivu" label="Etusivu"/>
        <Tab value="statistiikka" label="Statistiikka"/>
      </Tabs>
      </div>
      <div id="app">
      {value === "etusivu" && <Etusivu />}
      {value === "statistiikka" && <Statistiikka />}
      </div>
    </div>
  );
}

export default App;
