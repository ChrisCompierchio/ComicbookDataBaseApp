import React, { useEffect, useState} from 'react'
import { Virtuoso } from "react-virtuoso";
import './TableTest.css'
import { fetchFromGoogleSheets } from '../../utils/FetchFromGoogleSheets';
import { getFromDB, saveToDB } from '../../utils/IndexedDBOperations';

const Row = ({index, row}) => {
  
  const [active, setActive] = useState(false);
  
  const handleRowClick = () => {
    setActive(!active)
  }
  
  return(
    <>
      <div key={index} className = {`dropdown-row ${index % 2 === 0 ? "odd" : "even"} ${active ? "active" : ""}`} onClick={handleRowClick}>
        <div className='table-cell title'>{row[0]}</div>
        <div className='table-cell issue'>{row[1]}</div>
        <div className='table-cell year'>{row[2]}</div>
        
      </div>
      {active && (
        <div className={`dropdownInfo ${active ? 'expanded' : 'collapsed'}`}>
          <span className="dropdown-subhead">Significance:</span> {row[3] ? `${row[3]}.` : 'N/A'}
          <br />
          <br />
          <span className="dropdown-subhead">Slab:</span> {row[4] ? row[4] : 'Raw'}
          <br />
          <br />
          <span className="dropdown-subhead">Grade:</span> {row[5] ? row[5] : 'Not Graded'}
          <br />
          <br />
          <span className="dropdown-subhead">Signed:</span> {row[6] ? row[6] : 'Not Signed'}
        </div>
      )}
    </>
  )
}

function TableTest({showKeys, showSigned, showGraded, showAll, titleQuery}) {
  
  const [data, setData] = useState([])
  
  const API_KEY = 'AIzaSyAZG85nkvoeUrm64WV5rNHviTiArz99uX0';
  const SHEET_ID = '1_Xz8HDeCnPzGdoZx6hNG4GGGvyumiNO7BGvtN0RHnNI';
  const RANGE = 'A2:G'
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
  //       );
  //       const result = await response.json();
  //       if (result.values) {
  //         setData(result.values);
  //       } else {
  //         console.error("No data found in the sheet.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } 
  //   };
  //   fetchData();
  // }, []);
  
  
  
  useEffect(() => {
    
    if ('serviceWorker' in navigator){
      navigator.serviceWorker.register('./sw.js', { type: 'module' })
        .then((registration) => {
          console.log("Service Worker registered!", registration.scope)
        })
        .catch((error) => {
          console.log("Service Worker registration failed!", error)
        })
    }
    
    const fetchData = async () => {
      try {
        const result = await fetchFromGoogleSheets(SHEET_ID, API_KEY, RANGE);
        if (result){
          setData(result);
        }
      } catch (err) {
        const data = await getFromDB();
        console.log(data);
      }
    };
    fetchData();
  }, []);
  
  const visibleComics = showAll ? 
    data.filter((comic) => {
      return(
        (titleQuery === "" || (comic[0].toLowerCase().includes(titleQuery.toLowerCase())))
      )
    }) : 
    data.filter((comic) => {
      return(
        (titleQuery === "" || (comic[0].toLowerCase().includes(titleQuery.toLowerCase()))) &&
        (!showKeys || (comic[3] && comic[3] !== undefined)) &&
          (!showGraded || (comic[5] && comic[5] !== undefined)) &&
        (!showSigned || (comic[6] && comic[6] !== undefined))
      )
  })
  return (
    <div className="table-container">
      <div className="table-header">
        <div className='table-cell title'>
          Title
        </div>
        <div className='table-cell issue'>
          Issue
        </div>
        <div className='table-cell year'>
          Year
        </div>
      </div>
      <Virtuoso 
        data={visibleComics}
        itemContent={(index, row) => (
          <Row
            index={index}
            row={row}
          />
        )}
        style={{ 
          height: "100vh", 
          scrollbarGutter: "stable",
          WebkitOverflowScrolling: "touch", 
          scrollbarWidth: "none" 
        }}
      />
    </div>
  )
}

export default TableTest