/**
 * @file src/components/Gallery/Gallery.tsx
 * @description Gallery component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import Header from "../Header/Header";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
import styles from './Gallery.module.scss';
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Gallery component
 * @return {JSX.Element}
 * @constructor
 **/
const Gallery = () => {

  // Render
  return (
    <div className={styles.Gallery}>
        <Header activeTab="gallery" />
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Gallery;

/**
 * End of file src/components/Gallery/Gallery.tsx
 */
