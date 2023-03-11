/**
 * @file src/components/Home/Home.jsx
 * @description Home component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  useContext,
  useEffect,
  useRef
} from "react";

import Header from "../Header/Header";

import {AppContext} from "../../App";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
import styles from './Home.module.scss';

// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Home component
 * @return {JSX.Element}
 * @constructor
 **/
const Home = () => {
  // Refs
  const titre_ref = useRef<HTMLHeadingElement>(null);
  const details_ref = useRef<HTMLDivElement>(null);
  const image_container_1_ref = useRef<HTMLImageElement>(null);

  // Context
  const {
    paintingsData,
    getPaintingInfo
  } = useContext(AppContext);

  // Functions
  const handleResize = () => {
    if (titre_ref.current && image_container_1_ref.current) {
      image_container_1_ref.current.style.width = `${titre_ref.current.offsetWidth}px`;
    }

    if (titre_ref.current && details_ref.current) {
      details_ref.current.style.width = `${titre_ref.current.offsetWidth}px`;
    }
  }

  // Effect
  useEffect(() => {
    // Make the image the same width as the title
    if (titre_ref.current && image_container_1_ref.current) {
      image_container_1_ref.current.style.width = `${titre_ref.current.offsetWidth}px`;
    }

    // Make the details the same width as the title
    if (titre_ref.current && details_ref.current) {
      details_ref.current.style.width = `${titre_ref.current.offsetWidth}px`;
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize);

  }, []);

  useEffect(() => {
    if (paintingsData) {
      console.log(paintingsData);
    }
  }, [paintingsData]);

  // Render
  return (
    <div className={styles.home}>
      <Header />

      <main
        className={styles.main}
      >

        <h1
          ref={titre_ref}
        >
          René Magritte
        </h1>

        <img
          ref={image_container_1_ref}
          src="/src/assets/paintings/rene_magritte-the_lovers_ii.jpg"
          alt=""
        />

        <h1
          ref={details_ref}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>1898</span><span>1967</span>
        </h1>

      </main>
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Home;

/**
 * End of file src/components/Home/Home.jsx
 */
