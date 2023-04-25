import React from 'react'
import styled from 'styled-components';
import ProfileComponent from './ProfileComponent';


const SuggestedUsers = () => {
    const users = ["Ashley", "Salman", "Haben", "Ferid", "Mary", "Paige", "Hamad"]
  return (
    <StyledSuggested>
      <h3>Suggested Users</h3>
      {users.map((user, index) => <ProfileComponent key={index} name={user}/>)}
    </StyledSuggested>
  );
}

const StyledSuggested = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h3{
        margin-bottom: 2rem;
    }
`
export default SuggestedUsers