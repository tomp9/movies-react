import React, { Component} from 'react';

import './App.css';
import Navigation from './components/navigation/Navigation';
import MultimediaCard from './components/multimediaCard/MultimediaCard';



class App extends Component {
  constructor(){
    super();
  }

  render(){

      return (
        <div className="App">
          <Navigation/>
        </div>
      );
    }
  }


export default App;
