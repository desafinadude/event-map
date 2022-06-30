import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './app.scss';

import { Welcome } from './components/Welcome';


export class App extends React.Component {


    constructor(){
        super();
        this.state = {
        }
        
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
            <Welcome />
        )
    }

}


const container = document.getElementsByClassName('app')[0];
const root = createRoot(container);
root.render(<App />);