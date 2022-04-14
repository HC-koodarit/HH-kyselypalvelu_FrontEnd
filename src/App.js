import KatsoKysely from './katsoKysely';
import './App.css';

function App() {
  return (
    <div className="App">
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Router>
      <Toolbar>
        <Link className="link" to="/">Customers</Link>
        <Link className="link" to="/traininglist">Traininglist</Link>
        <Link className="link" to="/calendar">Calendar</Link>
      </Toolbar>
      <Routes>
        <Route exact path="/" element={<Customerlist />} />
        <Route path="/traininglist" element={<Traininglist />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route render = {() => <h1>Page not found</h1>} />
      </Routes>
      </Router>
    </AppBar>
  </Box>
</div>
  );
}

export default App;
