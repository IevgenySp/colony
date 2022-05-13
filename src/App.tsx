import React from 'react';
import Grid from './components/Grid';
import ControlPanel from './components/ControlPanel';
import GridContainer from './components/context/GridContainer';
import './App.scss';

function App() {
  return (
      <div className="App">
          <GridContainer>
            <ControlPanel />
            <Grid />
          </GridContainer>
      </div>
  );
}

export default App;
