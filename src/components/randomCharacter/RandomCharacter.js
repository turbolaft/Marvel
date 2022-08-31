import { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

import wait from '../../img/animations/1484.gif';
import error from '../../img/animations/400.jfif';
import MyLoader from '../skeleton/SmallSkeleton';

import shield from '../../img/shield.png';
import mjolnir from '../../img/mjolnir.png'
import MarvelServices from '../../services/MarvelServices';
import './randomCharacter.scss';

class RandomCharacter extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelServices();

    onCharLoaded = char => {
        this.setState({char, loading: false});
    }

    onCharError = () => {
        this.setState({error: true, loading: false});
    }

    updateChar = () => {
        this.setState({
            char: {},
            loading: true,
            error: false
        });
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCertainCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onCharError);
    }

    componentDidMount() {
        this.updateChar();  
    }

    render() {
        const {char, loading, error} = this.state,
            loadingMessage = loading ? <MyLoader/> : null,
            errorMessage = error ? <Error/> : null,
            getResult = !loading && !error ? <View char={char}/> : null;

        return (
            <div className="random__character-section random">
                <div className="random__char">
                    {loadingMessage}
                    {errorMessage}
                    {getResult}
                </div>
                <div className="random__change">
                    <div className="random__change-title">
                        Random character for today!
                        Do you want to get to know him better?
                    </div>
    
                    <div className="random__change-descr">
                        Or choose another one
                    </div>
    
                    <div onClick={this.updateChar} className="random__change-button button">TRY IT</div>
    
                    <div className="random__change-shield">
                        <img className="img" src={shield} alt="Shield" />
                    </div>
    
                    <div className="random__change-mjolnir">
                        <img className="img" src={mjolnir} alt="Shield" />
                    </div>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    let imgClass = "img";
    const descr = char.description ? char.description.slice(0, 150) + '...' : "We haven't got description on this character";

    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgClass += " contain";
    }

    return (
        <>
            <div className="random__char-img">
                <img className={imgClass} src={char.thumbnail} alt="hero" />
            </div>
            <div className="random__char-content content-char">
                <div className="content-char__name">{char.name}</div>
                <div className="content-char__descr">
                    {descr}
                </div>
                <div className="content-char__buttons">
                    <a href={char.homepage} className="content-char__button button">HOMEPAGE</a>
                    <a href={char.wikiPage} className="content-char__button button">WIKI</a>
                </div>
            </div>
        </>
    )
}

const Waiting = () => {
    return (
        <div className="message__wrapper-loading">
            <img src={wait} alt="loading" className="img" />
        </div>
    )
}

const Error = () => {
    return (
        <div className="message__wrapper-error">
            <h1>400</h1>
            <h2>Bad request</h2>
        </div>
    )
}

export {RandomCharacter, Waiting, Error};