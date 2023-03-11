/**
 * @file src/components/Header/Header.jsx
 * @description Header component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  HTMLAttributes,
  MouseEvent,

  useEffect,
} from "react";

import {
  gsap,
} from "gsap";

import CSSRulePlugin from "gsap/CSSRulePlugin";
// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(CSSRulePlugin);

// VARIABLES ================================================================================================ VARIABLES
import styles from './Header.module.scss';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  activeTab?: string;
}

const tabs = [
  {
    item: <img src="/imgs/pp_magritte.png" alt="René Magritte" />,
    path: '/',
    options: {
      className: styles.pp_logo,
      id: 'pp_logo'
    },
    isLogo: true,
  },
  {
    item: 'Biography',
    path: '/biography',
    options: {
      id: 'biography',
    },
    isLogo: false,
  },
  {
    item: 'Gallery',
    path: '/gallery',
    options: {
      id: 'gallery',
    },
    isLogo: false,
  },
  {
    item: 'Museum',
    path: '/museum',
    options: {
      id: 'museum',
    },
    isLogo: false,
  }
]
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Header component
 * @return {JSX.Element}
 * @constructor
 **/
const Header = (props: HeaderProps) => {

  // Functions
  const onMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLElement;
    const targetId = target.id;

    if (targetId === 'pp_logo') return;

    const targetUnderline = target.querySelector(`.${styles.underline}`);

    console.log(`[Header] targetUnderline: ${targetUnderline}`);

    // Find from where the cursor is coming from
    const { x, y } = target.getBoundingClientRect();
    const { clientX, clientY } = e;

    const fromLeft = clientX - x;
    const fromTop = clientY - y;
    const fromRight = target.offsetWidth - fromLeft;
    const fromBottom = target.offsetHeight - fromTop;

    const min = Math.min(fromLeft, fromTop, fromRight, fromBottom);

    target.classList.add(styles.underline);

    switch (min) {
      case fromLeft:
        console.log(`[Header] Mouse enter from left`);
        gsap.fromTo(targetUnderline, {
          x: '-100%',
          y: '0%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.25,
        });
        break;
      case fromTop:
        console.log(`[Header] Mouse enter from top`);
        gsap.fromTo(targetUnderline, {
          x: '0%',
          y: '-100%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.25,
        });
        break;
      case fromRight:
        console.log(`[Header] Mouse enter from right`);
        gsap.fromTo(targetUnderline, {
          x: '100%',
          y: '0%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.25,
        });
        break;
      case fromBottom:
        console.log(`[Header] Mouse enter from bottom`);
        gsap.fromTo(targetUnderline, {
          x: '0%',
          y: '100%',
          opacity: 0,
        }, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 0.25,
        });
        break;
      default:
        console.log(`[Header] Mouse enter from unknown`);
    }
  }

  const onMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLElement;
    const targetId = target.id;

    if (targetId === 'pp_logo') return;

    const targetUnderline = target.querySelector(`.${styles.underline}`);

    // Find from where the cursor is exiting
    const { x, y } = target.getBoundingClientRect();
    const { clientX, clientY } = e;

    const fromLeft = clientX - x;
    const fromTop = clientY - y;
    const fromRight = target.offsetWidth - fromLeft;
    const fromBottom = target.offsetHeight - fromTop;

    const min = Math.min(fromLeft, fromTop, fromRight, fromBottom);

    switch (min) {
      case fromLeft:
        console.log(`[Header] Mouse leave to left`);
        gsap.to(targetUnderline, {
          x: '-100%',
          y: '0%',
          opacity: 0,
          duration: 0.25,
        });
        break;
      case fromTop:
        console.log(`[Header] Mouse leave to top`);
        gsap.to(targetUnderline, {
          x: '0%',
          y: '-100%',
          opacity: 0,
          duration: 0.25,
        });
        break;
      case fromRight:
        console.log(`[Header] Mouse leave to right`);
        gsap.to(targetUnderline, {
          x: '100%',
          y: '0%',
          opacity: 0,
          duration: 0.25,
        });
        break;
      case fromBottom:
        console.log(`[Header] Mouse leave to bottom`);
        gsap.to(targetUnderline, {
          x: '0%',
          y: '100%',
          opacity: 0,
          duration: 0.25,
        });
        break;
      default:
        console.log(`[Header] Mouse leave to unknown`);
    }

  }


  // Effects
  useEffect(() => {
    const activeTab = props.activeTab || 'home';

    const activeTabElement = document.querySelector(`.${styles.header} a[href="/${activeTab}"]`) as HTMLElement;

    if (activeTabElement) {
      activeTabElement.classList.add(styles.active);
    }
  }, [])

  // Render
  return (
    <nav className={styles.header}>
      {
        tabs.map((tab, index) => {
          return (
            <a
              key={index}
              href={tab.path}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              {...tab.options}
            >
              {
                !tab.isLogo &&
                <span className={styles.underline} />
              }
              {tab.item}

            </a>
          )
        })
      }
    </nav>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Header;

/**
 * End of file src/components/Header/Header.jsx
 */
