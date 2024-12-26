import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCheck } from '@fortawesome/free-solid-svg-icons';
import './ActionButton.css'

const SearchMenu = ({visible}) => {
  return(
    <div className={`menu-container ${visible ? 'slide-up' : ''}`}>
      <input className='title-input' type="text" placeholder='Title' name="title" />
    </div>
  )
}

function ActionButton() {
  
  const [showSlideMenu, setShowSlideMenu] = useState(false);
  
  const toggleSlideMenu = () => {
    setShowSlideMenu(!showSlideMenu);
  }
  
  return (
    <>
      <div className='action-container' onClick={toggleSlideMenu}>
        <div className="action-main">
          <FontAwesomeIcon icon={ showSlideMenu ? faCheck : faMagnifyingGlass } />
        </div>
      </div>
      <SearchMenu visible={showSlideMenu} />
    </>
  ) 
}

export default ActionButton