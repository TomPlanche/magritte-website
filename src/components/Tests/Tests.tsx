/**
 * @file src/components/Tests/Tests.tsx
 * @description Tests component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  useContext,
  useEffect, useState
} from "react";

import {
  AppContext
} from "../../App";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
import styles from './Tests.module.scss';
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
// END FUNCTIONS =======================================================================================  END FUNCTIONS

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Tests component
 * @return {JSX.Element}
 * @constructor
 **/
const Tests = () => {
  // Context
  const {
    paintingsData
  } = useContext(AppContext);

  // Functions
  /**
   * Get painting by id
   *
   * data has the following structure:
   * [
   *    {
   *       "id": "painting_1",
   *       "description": "blabla",
   *       "url": "url_1"
   *     },
   *     ...
   * ]
   *
   *
   * @param id {string} Painting id
   * @return {any} Painting
   */
  const getPaintingDescription = (id: string) => {
    // Get painting
    const painting = paintingsData.find((painting: any) => painting.id === id);

    // If painting is found, return description
    return painting ? painting.description : null;
  }

  // useEffect

  useEffect(() => {
    if (paintingsData) {
      console.log(`[Tests] Paintings loaded: ${paintingsData.length}`);

      // Test getPaintingDescription
      console.log(`[Tests] getPaintingDescription: ${getPaintingDescription('rene_magritte-the_son_of_man.jpg')}`);
    }
  }, [paintingsData]);

  // Render
  return (
    <div className={styles.Tests}>
        Tests
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/Tests/Tests.tsx
 */
