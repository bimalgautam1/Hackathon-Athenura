import { useState } from 'react';
import { Search, Menu, X, Zap } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ onSearch, onNavigate, currentView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const handleNavigate = (view) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div onClick={() => handleNavigate('home')} className={styles.logo} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}><Zap size={18} /></div>
          <span>HackVerse</span>
        </div>

        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search hackathons..."
            value={searchVal}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.links}>
          <button 
            onClick={() => handleNavigate('home')} 
            className={`${styles.link} ${currentView === 'home' ? styles.active : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigate('about')} 
            className={`${styles.link} ${currentView === 'about' ? styles.active : ''}`}
          >
            About
          </button>
          <button 
            onClick={() => handleNavigate('contact')} 
            className={`${styles.link} ${currentView === 'contact' ? styles.active : ''}`}
          >
            Contact
          </button>
          <button className={styles.btnOutline}>Log In</button>
          <button className={styles.btnPrimary}>Sign Up</button>
        </div>

        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button onClick={() => handleNavigate('home')}>Home</button>
          <button onClick={() => handleNavigate('about')}>About</button>
          <button onClick={() => handleNavigate('contact')}>Contact</button>
          <button className={styles.btnPrimary}>Sign Up</button>
        </div>
      )}
    </nav>
  );
}
