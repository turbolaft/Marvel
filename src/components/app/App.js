import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from '../navbar/Navbar.js';
import {RandomCharacter} from '../randomCharacter/RandomCharacter';
import MainSection from '../mainSection/MainSection.js';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.scss';
import '../../styles/nullStyles.scss';

import vizen from '../../img/vizen.png';

function App() {
    return (
        <div className='page'>
            <div className="container">
                <Navbar />
                <ErrorBoundary>
                    <RandomCharacter/>
                </ErrorBoundary>
                <MainSection/>
            </div>
            <div className="footer__img">
                <img src={vizen} alt="" className="img" />
            </div>
        </div>
    )
}

export default App;