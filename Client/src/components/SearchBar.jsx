import React from "react";

import styled from "styled-components";

// icons
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  return (
    <StyledSearch>
      <input type="text" placeholder="search..." />
      <button>
        <AiOutlineSearch />
      </button>
    </StyledSearch>
  );
};

export const StyledSearch = styled.form`
  display: flex;
  flex: 1.5;
  input {
    width: 100%;
    background-color: white;
  }
  button {
    background-color: white;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;

export default SearchBar;
