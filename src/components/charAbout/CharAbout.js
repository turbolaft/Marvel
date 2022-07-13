
import logo from '../../img/loki.jpg';
import './charAbout.scss';

function CharAbout() {
    const comicsData = [
        'AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)',
    ];

    for (let i = 0; i < 9; i++) {
        comicsData.push(comicsData[0]);
    }

    const comicses = comicsData.map(item => {
        return (
            <li className="comics__item">
                {item}
            </li>
        )
    });
    
    return (
        <div className="char__about about">
            <div className="about__main-info main-info">
                <div className="main-info__logo">
                    <img src={logo} alt="Logo" className="img" />
                </div>
                <div className="main-info__descr">
                    <div className="main-info__name">LOKI</div>
                    <button className="main-info button">HOMEPAGE</button>
                    <button className="main-info__button button">WIKI</button>
                </div>
            </div>

            <p className="about__descr">
                In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
            </p>

            <div className="about__comics comics">
                <div className="comics__title">Comics:</div>

                <ul className="comics__list">
                    {comicses}
                </ul>
            </div>
        </div>
    )
}

export default CharAbout;