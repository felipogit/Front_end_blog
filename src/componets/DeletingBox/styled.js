import styled from "styled-components";

export const StyledContainerBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .close{
    position: relative;
    top: -48px;
    right: -21px;
  }
  

  .teste {
    background: black;
    padding: 2rem;
    width: 100%;
    max-width: 400px;

    .buttons{
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      button{
        background-color: #D2EEF9;
        width: 70px;
        height: 30px;
        border-radius: 5px;
      }

    }
  }
  
`