import React, { useState } from 'react'
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faKey, faPencil } from '@fortawesome/free-solid-svg-icons';

function SearchBar({showKeys, showSigned, showGraded, showAll, titleQuery, toggleKeys, toggleSigned, toggleGraded, toggleReset, setTitleQuery}) {
  
  return (
    <div className='search-container'>
      <div className='search-items'>
        <div className="icon-container" onClick={toggleReset}>
          <FontAwesomeIcon icon={faRotateRight} />
        </div>
        <input type="text" className='search-input' placeholder='Search Comics' value={titleQuery} onChange={(e) => setTitleQuery(e.target.value)} />
      </div>
      <div className="filter-icons">
        <div className={`icon-container ${(showKeys && showAll === false) ? 'active-icon' : ''}`} onClick={toggleKeys}>
          <FontAwesomeIcon icon={faKey} />
        </div>
        <div className={`icon-container ${(showSigned && showAll === false) ? 'active-icon' : ''}`} onClick={toggleSigned}>
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className={`icon-container ${(showGraded && showAll === false) ? 'active-icon' : ''}`} onClick={toggleGraded}>
          A+
        </div>
      </div>
    </div>
  )
}

export default SearchBar