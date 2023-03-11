/**
 * @file src/components/Biography/Biography.tsx
 * @description Biography component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
import styles from './Biography.module.scss';
import Header from "../Header/Header";
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Biography component
 * @return {JSX.Element}
 * @constructor
 **/
const Biography = () => {

  // Render
  return (
    <div className={styles.Biography}>
        <Header activeTab="biography" />
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Biography;

/**
 * End of file src/components/Biography/Biography.tsx
 */
