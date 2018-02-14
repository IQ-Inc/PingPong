import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import PingPongApp from './PingPongApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PingPongApp />, document.getElementById('root'));
registerServiceWorker();
