/**
 * @file src/components/PaintingImage/PaintingImage.tsx
 * @date PaintingImage component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {CSSProperties, HTMLAttributes, LegacyRef, MouseEventHandler, MutableRefObject, useRef} from "react";

import {
  gsap
} from "gsap";

import {
  determinateOnHoverFromWhere,
} from "../../App";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
import styles from './PaintingImage.module.scss';

interface Painting {
  id: string;

  title: string;
  date: string;
  description: string;
}

interface PaintingImageProps extends HTMLAttributes<HTMLDivElement> {
  // Mandatory props
  painting: Painting;

  // Optional props
  id?: string;
  style?: CSSProperties;
  className?: string;
  passedRef?: LegacyRef<HTMLDivElement>;
}
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS

// END FUNCTIONS =======================================================================================  END FUNCTIONS


// COMPONENENT  ============================================================================================= COMPONENT
/**
 * PaintingImage component.
 * It can recieve the following props:
 * - id: string
 * - date: string
 * @return {JSX.Element}
 * @constructor
 **/
const PaintingImage = (props: PaintingImageProps) => {
  // Props
  const {
    className,
    id,
    painting,
    style,
    passedRef,
  } = props;

  // Functions
  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget;

    const targetDescription = target.querySelector(`.${styles.PaintingImage__description}`);

    console.log(`[Header] Mouse enter`);

    determinateOnHoverFromWhere(
      e,
      () => {
        // console.log(`[Header] Mouse leave to left`);
        gsap.fromTo(targetDescription, {
          x: '-100%',
          y: '0%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.25,
        });
      },
      () => {
        // console.log(`[Header] Mouse leave to top`);
        gsap.fromTo(targetDescription, {
          x: '0%',
          y: '-100%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.5,
        });
      },
      () => {
        // console.log(`[Header] Mouse leave to right`);
        gsap.fromTo(targetDescription, {
          x: '100%',
          y: '0%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.5,
        });
      },
      () => {
        // console.log(`[Header] Mouse leave to bottom`);
        gsap.fromTo(targetDescription, {
          x: '0%',
          y: '100%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.5,
        });
      },
      () => {
        console.log(`[Header] Mouse leave to bottom`);
        gsap.fromTo(targetDescription, {
          x: '0%',
          y: '100%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.5,
        });
      }
    )
  }


  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget;

    const targetDescription = target.querySelector(`.${styles.PaintingImage__description}`);

    console.log(`[Header] Mouse leave`);

    determinateOnHoverFromWhere(
      e,
      () => {
        // console.log(`[Header] Mouse leave to left`);
        gsap.to(targetDescription, {
          x: '-100%',
          y: '0%',
          opacity: 0,
          duration: 0.25,
        });
      },
      () => {
        // console.log(`[Header] Mouse leave to top`);
        gsap.to(targetDescription, {
          x: '0%',
          y: '-100%',
          opacity: 0,
          duration: 0.5,
        });
      },
      () => {
        // console.log(`[Header] Mouse leave to right`);
        gsap.to(targetDescription, {
          x: '100%',
          y: '0%',
          opacity: 0,
          duration: 0.5,
        });
      },
      () => {
        // console.log(`[Header] Mouse leave to bottom`);
        gsap.to(targetDescription, {
          x: '0%',
          y: '100%',
          opacity: 0,
          duration: 0.5,
        });
      },
      () => {
        console.log(`[Header] Mouse leave to bottom`);
        gsap.to(targetDescription, {
          x: '0%',
          y: '100%',
          opacity: 0,
          duration: 0.5,
        });
      }
    )
  }

  // Render
  return (
    <div
      id={id}
      className={`${styles.PaintingImage} ${className ? className : ''}`}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

      ref={passedRef}

      style={style}
    >
      <img
        src={`src/assets/paintings/${painting.id}`}
        alt={`Magritte's paiting named: ${painting.title}`}
        className={styles.PaintingImage__img}
      />

      <div
        className={styles.PaintingImage__description}

      >
        <h2>{painting.title}</h2>
        <h3>{painting.date}</h3>

      </div>
    </div>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default PaintingImage;

/**
 * End of file src/components/PaintingImage/PaintingImage.tsx
 */
