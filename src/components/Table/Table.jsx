import { Fragment } from 'react';
import React, { useEffect, useState} from 'react'
import { TableVirtuoso } from "react-virtuoso";
import './Table.css'

function Table() {
  
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  
  const API_KEY = 'AIzaSyAZG85nkvoeUrm64WV5rNHviTiArz99uX0';
  const SHEET_ID = '1_Xz8HDeCnPzGdoZx6hNG4GGGvyumiNO7BGvtN0RHnNI';
  const RANGE = 'A2:G'
  
  const handleRowClick = () => {
    setActive(!active)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const result = await response.json();
        if (result.values) {
          setData(result.values)
        } else {
          console.error("No data found in the sheet.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
    fetchData();
  }, []);
  
  return (
    <TableVirtuoso 
      data={data}
      fixedHeaderContent={() => (
        <tr>
          <th>Title</th>
          <th>Issue</th>
          <th>Year</th>
        </tr>
      )}
      itemContent={(index, row) => (
        <tr key={index} className = {`dropdown-row ${index % 2 === 0 ? "odd" : "even"} ${active ? "active" : ""}`} onClick={handleRowClick}>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          {active && (
          <tr className={`dropdownInfo ${active ? 'expanded' : 'collapsed'}`}>
            <td colSpan={3}>
              Significance: {row[3] ? row[3] : 'N/A'}
              <br />
              <br />
              Slab: {row[4] ? row[4] : 'Raw'}
            </td>
          </tr>
          )}
        </tr>
      )}
      components={{
        Table: (props) => <table {...props} style={{ width: "100%", borderCollapse: "collapse" }} />,
        TableHead: (props) => <thead {...props} style={{ backgroundColor: "#f0f0f0" }} />,
        TableBody: (props) => <tbody {...props} style={{ backgroundColor: "#fff" }} />,
        TableRow: (props) => <>{props.children}</>, // Ensure rows are rendered correctly
      }}
      style={{ height: "100vh" }}
    />
  )
}

export default Table