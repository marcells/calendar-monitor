import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

Modal.setAppElement('#root');

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
