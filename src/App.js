import React, {Component} from 'react';

import Authorization from './containers/Authorization';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Authorization/>
            </div>
        );
    }
}

export default App;
