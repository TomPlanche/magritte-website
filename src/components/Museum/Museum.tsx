/**
 * @file src/components/Museum/Museum.tsx
 * @description Museum component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import Header from "../Header/Header";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
import styles from './Museum.module.scss';
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Museum component
 * @return {JSX.Element}
 * @constructor
 **/
const Museum = () => {

  // Render
  return (
    <div className={styles.Museum}>
        <Header activeTab="museum" />
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Museum;

/**
 * End of file src/components/Museum/Museum.tsx
 */
