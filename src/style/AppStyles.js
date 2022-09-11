import { createGlobalStyle } from "styled-components";
import colors from "./colors";
import spacing from "./spacing";

export const AppStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

 body {
    transition: all 0.50s linear;
    margin: 0;
    padding: 0;
  }

  ${["center", "left", "right", "justify"].map(
		(typo) => `.text-${typo} { text-align: ${typo}; }`
	)}
  
  ${[
		"center",
		"flex-start",
		"flex-end",
		"space-around",
		"space-between",
		"space-evenly",
	].map((type) => `.justify-${type} { justify-content: ${type}; }`)}

   ${["center", "start", "end", "stretch", "baseline", "normal"].map(
			(type) => `.align-items-${type} { align-items: ${type}; }`
		)}



  ${colors}
  ${spacing}

  .flex {
    display: flex;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-desktop {
    display: flex;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .flex-mobile {
    display: block;
    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
    }
  }

  .desktop-only{
	display:flex;
	  @media (max-width: 768px) {
  	     display: hidden;
          }
    }


  .scale {
    cursor: pointer;
    animation: ease-in;
    width: fit-content;
    height: fit-content;
    	&:hover{
      		opacity: 0.6;
      		transform: scale(1.07);
    	}
  }

  .center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }

   .max-width {
    width:100%;
  }

  .fit-width {
    width: fit-content;
  }

  .hover-btn {
    cursor:pointer;
    animation: 0.2s ease-in-out;
    &:hover {
      opacity: 0.6;
      transform: scale(1.08);
  }
  }

  



  .margin-auto {
    width: fit-content;
    margin-inline:auto;
  }


`;
