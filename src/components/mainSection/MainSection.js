import CharCards from '../charCards/CharCards';
import CharAbout from '../charAbout/CharAbout.js';

import './mainSection.scss';

function MainSection() {
    return (
        <main className="main-section">
            <CharCards/>
            <CharAbout/>
        </main>
    )
}

export default MainSection;

