/**
 * @file src/components/Tests/Tests.tsx
 * @date Tests component.
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
import PaintingImage from "../PaintingImage/PaintingImage";
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
  // State
  const [randomPainting, setRandomPainting] = useState<any>(null);

  // Context
  const {
    getPaintingFromId,
    paintingsData
  } = useContext(AppContext);

  // Functions
  /**
   * Get the painting date.
   *
   * data has the following structure:
   * {
   *   "id": "rene_magritte-the_large_family.jpg",
   *   "description": "The Large Family ('La Grande Famille') was created by Rene Magritte in 1963,. At first glance, one immediately questions the appropriateness of the title for there is no image of a family, human or otherwise. However, that should not come as a surprise as Magritte was well-known to derive great pleasure in confusing his viewers. The background of The Large Family displays a dreary sky, either on the verge of a storm or, could the pink light on the horizon signify the end of one? The ominous clouds together with the rolling sea below evoke turbulent feelings, perhaps symbolizing the trials and tribulations that families often endure together. On the other hand, a significant contrast is created between the gloomy surroundings and the frontal white bird, a common symbol of peace. Window-like, this bird reveals within its silhouette a calm blue sky with white fluffy clouds that bring about feelings of warmth, much like those experienced on a beautiful summer day. The bird may well represent the unity and love within a family unit. In depicting harmony and discord, Magritte skillfully portrayed the concept of family in The Large Family by evoking relevant and intense emotions through symbolic surrealism. To be a surrealist means barring from your mind all remembrance of what you have seen, and being always on the lookout for what has never been.” - Rene Magritte",
   *   "date":"1963",
   *   "url": "https://www.renemagritte.org/the-large-family.jsp"
   * }
   *
   * @param id {string} Painting id
   * @return {any} Painting date
   */
  const getPaintingDate = (id: string) => {
    // Get painting
    const painting = paintingsData.find((painting: any) => painting.id === id);

    // If painting is found, return date
    return painting ? painting.date : null;
  }

  // useEffect

  useEffect(() => {
    if (paintingsData) {
      console.log(`[Tests] Paintings loaded: ${paintingsData.length}`);

      setRandomPainting(() => {
        // return paintingsData[Math.floor(Math.random() * paintingsData.length)]

        console.log(getPaintingDate('rene_magritte-the_lovers_ii.jpg'));

        return getPaintingFromId('rene_magritte-the_lovers_ii.jpg');
      })

    }
  }, [paintingsData]);


  useEffect(() => {
    if (randomPainting) {
      console.log(`` +
      `[Tests] Random painting set.\n` +
      `\t- id: ${randomPainting.id}\n` +
      `\t- title: ${randomPainting.title}\n` +
      `\t- date: ${getPaintingDate(randomPainting.id)}\n` +
      `\t- url: ${randomPainting.url}`
      );
    }
  }, [randomPainting]);

  // Render
  return (
    <div className={styles.Tests}>
      {
        randomPainting ?
          <PaintingImage
            painting={randomPainting}
            className={styles.img}
          /> :
          <h1>Loading...</h1>

      }
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/Tests/Tests.tsx
 */
