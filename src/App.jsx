import './App.css'
import { useState } from 'react'
import ActionButton from './components/ActionButton/ActionButton.jsx'
import Navbar from './components/Navbar/Navbar'
import TableTest from './components/Table/TableTest.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'

function App() {
  
  const [showKeys, setShowKeys] = useState(false);
  const [showSigned, setShowSigned] = useState(false);
  const [showGraded, setShowGraded] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [titleQuery, setTitleQuery] = useState("");
  
  const toggleKeys = () => {
    setShowKeys((prev) => !prev);
    setShowAll(false);
  }
  
  const toggleSigned = () => {
    setShowSigned((prev) => !prev);
    setShowAll(false);
  }
  
  const toggleGraded = () => {
    setShowGraded((prev) => !prev);
    setShowAll(false);
  }
  
  const toggleReset = () => {
    setShowAll(true);
    setShowKeys(false);
    setShowGraded(false);
    setShowSigned(false);
    setTitleQuery("");
  }
  
  return (
    <div className="App">
      <Navbar />
      <SearchBar 
        showKeys={showKeys}
        showSigned={showSigned}
        showGraded={showGraded}
        showAll={showAll}
        titleQuery={titleQuery}
        toggleKeys={toggleKeys}
        toggleSigned={toggleSigned}
        toggleGraded={toggleGraded}
        toggleReset={toggleReset}
        setTitleQuery={setTitleQuery}
      />
      <TableTest 
        showKeys={showKeys}
        showSigned={showSigned}
        showGraded={showGraded}
        showAll={showAll}
        titleQuery={titleQuery}
      />
    </div>
  )
}

export default App
