import styled from "styled-components"

export const StyledNav = styled.div`
  background-color: white;
  min-height: 100vh;
  min-width: fit-content;
  padding: 2rem;
  gap: 2rem;

  ul {
    flex: 1;
    align-items: flex-start;
    gap: 2rem;
    .link {
      display: block;
      display: flex;
      gap: 10px;
      align-items: center;
      width: 100%;
      text-decoration: none;
      color: black;
      padding: 1rem;
      border: 2px solid transparent;
      transition: all 0.5s ease;
    }
    .link:hover, .active {
        border: 2px solid var(--primary);
        background-color: var(--secondary);
        color: var(--primary);
        border-radius: 10px;
    }

  }
`;