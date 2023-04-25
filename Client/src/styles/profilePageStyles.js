import styled from "styled-components";

export const StyledProfile = styled.div`
  .welcome-card {
    grid-area: welcome-card;
    max-width: 30vw;
  }
  .stats {
    grid-area: stats;
  }
  .badges {
    grid-area: badges;
  }
  .blogs {
    grid-area: blogs;
    max-width: 30vw;
  }
  .projects {
    grid-area: projects;
    max-width: 30vw;
  }
  .users {
    grid-area: users;
    min-width: 15vw;
  }
  display: grid;
  grid-template-areas:
    "welcome-card stats badges"
    "blogs projects users";
  gap: 2rem;
  margin: 3rem;
  width: 100%;
`;
export const StyledCard = styled.div`
  background-color: white;
  color: black;
  border-radius: 1rem;
  padding: 2rem;
  justify-content: space-between;
  margin-top: 1.5rem;
  span{
    font-size: 3rem;
  }
  img {
    max-width: 15rem;
    flex: 1;
  }
`;
export const StyledStat = styled.div`
  background-color: white;
  color: black;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 30vw;
  h3 {
    margin-bottom: 1rem;
  }
  .flex {
    height: 100%;
    * {
      flex: 2;
    }
  }
  .stat {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    text-align: center;
    flex: 1;
  }
`;

export const StyledBadges = styled.div`
  background-color: white;
  color: black;
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;
  .badges {
    display: grid;
    place-items: center;
    height: 80%;
  }
  h3 {
    margin-bottom: 1rem;
  }
  h5 {
    color: var(--primary);
  }
`;
