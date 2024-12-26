import { getFromDB, saveToDB } from "./IndexedDBOperations";

export async function fetchFromGoogleSheets(sheetId, apiKey, range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  
  try{
    const response = await fetch(url);
    const data = await response.json();
    
    await saveToDB(data.values)
    return data.values;
    
  } catch (error) {
    console.warn('Network request failed, trying IndexedDB', error);
    
    const cachedData = await getFromDB();
    if (cachedData) {
      return cachedData;
    }
    
    throw new Error('No data available offline');
  }
  
}