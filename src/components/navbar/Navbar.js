import './navbar.scss';

function Navbar() {
    return (
        <header className="header">
            <h3 className="header__title"><mark>Marvel</mark> information portal</h3>
            <div className="header__menus">
                <div className="header__menus-item header__menus-item--active">Characters</div>
                <div className="header__menus-item">Comics</div>
            </div>
        </header>
    )
}

export default Navbar;