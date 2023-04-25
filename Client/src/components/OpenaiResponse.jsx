import React from "react";

//styles
import styled from "styled-components";

// icons
import { TbBrandOpenai } from "react-icons/tb";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

const OpenaiResponse = () => {
  return (
    <StyledCard className="flex-col">
      <h2 className="flex">
        <TbBrandOpenai color="BBCFB3" style={{ fontSize: "2rem" }} /> OpenAi
        Answer
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis pariatur
        accusamus itaque sapiente fuga voluptatum! Ex porro deserunt
        consequuntur quibusdam, unde recusandae Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eos commodi nostrum minima unde
        repudiandae nesciunt fugit molestias non atque optio officia doloremque
        assumenda, debitis, voluptate eaque soluta, excepturi molestiae
        reiciendis. consectetur. Molestias, quia?
      </p>
      <div className="flex">
        <h3>Was this helpful?</h3>
        <div>
            <button><FiThumbsUp/></button>
            <button><FiThumbsDown/></button>
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: var(--lightgrey);
  flex: 1;
  height: 30vh;
  margin-bottom: 2.5rem;
  justify-content: space-between;
`;

export default OpenaiResponse;
