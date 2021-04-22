import './App.css';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={`/`} component={Projects} exact/>
          <Route path={`/edit/:id`} component={ProjectDetails} />
        </Switch>
      </BrowserRouter>

      {/* <Projects></Projects> */}
    </div>
  );
}

export default App;
