/**
 * @file Main component for the application.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import React, {createContext, useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import Museum from "./components/Museum/Museum";
import Biography from "./components/Biography/Biography";
import Tests from "./components/Tests/Tests";

import {getPaintings} from "./assets/utils";

import styles from './App.module.scss'
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
export const AppContext = createContext<any>(null);
// END VARIABLES =======================================================================================  END VARIABLES


// COMPONENT ================================================================================================ COMPONENT
/**
 * @type {React.FC}
 * @returns {React.ReactElement}
 * @constructor
 */
const App = (): React.ReactElement => {
  // States
  const [paintingsData, setPaintingsData] = useState<any>(null);

  // methods
  /**
   * Get painting info from paintingsData
   * @param paintingId {string} Painting ID
   */
  const getPaintingInfo = (paintingId: string): string => {
    return paintingsData.find((painting: any) => painting.id === paintingId);
  }

  // effects
  useEffect(() => {
    getPaintings()
      .then((data) => {
        /*data has the following structure:
          {
            "pating_1": {
              "description": "blabla",
              "url": "url_1"
            },
            ...
          }

          We want to transform it into:
          [
             {
                "id": "painting_1",
                "description": "blabla",
                "url": "url_1"
              },
              ...
          ]
        */
        const paintingsData = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key]
          }
        });

        setPaintingsData(paintingsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <BrowserRouter>
      <AppContext.Provider value={{paintingsData, getPaintingInfo}}>
        <div className="App">
          <Routes>

            <Route index element={<Home />} />
            <Route path="/biography" element={<Biography />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/museum" element={<Museum />} />

            <Route path="/tests" element={<Tests />} />

            <Route path="*" element={<h1>Route: '{location.pathname}' not found</h1>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  )
}
// END COMPONENT ======================================================================================== END COMPONENT
export default App

/**
 * End of file App.tsx
 */
