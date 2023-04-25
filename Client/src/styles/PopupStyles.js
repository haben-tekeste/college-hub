import styled from "styled-components";

export const StyledPopup = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #00000059;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  .container {
    position: relative;
    width: 50vw;
    height: 70vh;
    .light-btn.close{
        background-color: transparent;
        border: none;
        font-size: 2rem;
        font-weight: bold;
        position: absolute;
        top: 0;
        right: 0;
    }
}
`