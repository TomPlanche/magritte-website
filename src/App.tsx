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

export const fromWhere = {
  fromLeft: 'fromLeft',
  fromTop: 'fromTop',
  fromRight: 'fromRight',
  fromBottom: 'fromBottom',
  unknown: 'unknown'
}
// END VARIABLES =======================================================================================  END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
/**
 * Get the direction from where the cursor is coming from
 * @param e {any} Event
 * @param ifFromLeft {() => void} Callback if from left
 * @param ifFromTop {() => void} Callback if from top
 * @param ifFromRight {() => void} Callback if from right
 * @param ifFromBottom {() => void} Callback if from bottom
 * @param unknown {() => void} Callback if unknown
 */
export const determinateOnHoverFromWhere = (
  e: any,
  ifFromLeft: () => void,
  ifFromTop: () => void,
  ifFromRight: () => void,
  ifFromBottom: () => void,
  unknown: () => void,
): void => {
  const target = e.target as HTMLElement;

  // Find from where the cursor is coming from
  const { x, y } = target.getBoundingClientRect();
  const { clientX, clientY } = e;

  const fromLeft = clientX - x;
  const fromTop = clientY - y;
  const fromRight = target.offsetWidth - fromLeft;
  const fromBottom = target.offsetHeight - fromTop;

  const min = Math.min(fromLeft, fromTop, fromRight, fromBottom);

  switch (min) {
    case fromLeft:
      ifFromLeft();
      break
    case fromTop:
      ifFromTop();
      break
    case fromRight:
      ifFromRight();
      break
    case fromBottom:
      ifFromBottom();
      break
    default:
      unknown();
  }
}
// END FUNCTIONS =======================================================================================  END FUNCTIONS

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
  const getPaintingFromId = (paintingId: string): object => {
    if (!paintingsData) {
      return {};
    }
    return paintingsData.find((painting: any) => painting.id === paintingId);
  }

  // effects
  useEffect(() => {
    getPaintings()
      .then((data) => {
        /*data has the following structure:
          {
            "pating_1": {
              "date": "blabla",
              "url": "url_1"
            },
            ...
          }

          We want to transform it into an array of objects:
          [
            {
              "id": "painting_1",
              "date": "blabla",
              "url": "url_1"
            },
            ...
        */
        const paintingsData = Object.keys(data).map((key) => {
          return {
            id: key,
            title: key
              .split('-')[1]
              .split('.')[0]
              .split('_')
              .map((word: string) => {
                if (word.match(/^(i{1,3}|i?(vi{0,3}|x))$/)) { // all roman numbers from 1 to 10
                  console.log(word);
                  return word.toUpperCase();
                }

                return word.charAt(0).toUpperCase() + word.slice(1);
              })
              .join(' '),

            // @ts-ignore
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
      <AppContext.Provider value={{paintingsData, getPaintingFromId}}>
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
