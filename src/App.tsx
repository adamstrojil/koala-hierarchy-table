import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"

import "./App.css"
import { Table, TableData } from "./components/Table"
import { useState, useEffect } from "react"



export const parseJsonDataToTableData = (jsonData: any): TableData => {
  const parsedData = {
    headers: [...Object.keys(jsonData[0].data)],
    rows: [
      ...jsonData.map((record: any) => ({
        data: Object.values(record.data),
        children: record.children,
      })),
    ],
  }

  return parsedData
}

function App() {
  const [jsonData, setJsonData] = useState<any>(null)
  const [tableData, setTableData] = useState<TableData>({
    headers: [],
    rows: [],
  })

  useEffect(() => {
    const jsonFilePath = "src/data/example-data.json"

    fetch(jsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        setJsonData(data)
      })
      .catch((error) => {
        console.error("Error reading JSON file:", error)
      })
  }, [])

  useEffect(() => {
    if (jsonData) {
      console.log("jsonData: ", jsonData)

      setTableData(parseJsonDataToTableData(jsonData))
    }
  }, [jsonData])

  return (
    <div>
      {/* {console.log("tableData: ", tableData)} */}
      <h1>Table Example</h1>
      <Table data={tableData} />
    </div>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <Counter />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <span>
  //         <span>Learn </span>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           React
  //         </a>
  //         <span>, </span>
  //         <a
  //           className="App-link"
  //           href="https://redux.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Redux
  //         </a>
  //         <span>, </span>
  //         <a
  //           className="App-link"
  //           href="https://redux-toolkit.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Redux Toolkit
  //         </a>
  //         ,<span> and </span>
  //         <a
  //           className="App-link"
  //           href="https://react-redux.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           React Redux
  //         </a>
  //       </span>
  //     </header>
  //   </div>
  // )
}

export default App
