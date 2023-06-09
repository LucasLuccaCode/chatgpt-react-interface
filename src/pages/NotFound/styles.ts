import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: .6rem; */
  padding: 1rem;
  border-radius: .5rem;
  background: #3a3a40;
  
  
  h1,
  h2 {
    font-size: 1.1rem;
    color: #efefff;
    text-align: center;
  }
`

export const Button = styled.button`
  cursor: pointer;
  all: unset;
  text-align: center;
  color: #efefff;
  font-weight: bold;
  margin-top: 1rem;
  padding: .6rem;
  border-radius: .3rem;
  transition: all .3s ease;
  background: #5768ef;

  &:hover {
    background-color: #4758df;
  }
`