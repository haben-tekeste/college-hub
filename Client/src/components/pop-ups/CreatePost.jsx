import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";
import { toggleCreatePost } from "../../states/blogs";

// components
import Uploader from "../Uploader";

//icons
import { AiOutlineClose } from "react-icons/ai";

const CreatePost = () => {
  const dispatch = useDispatch();

  return (
    <StyledAsk>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => dispatch(toggleCreatePost())}
        >
          <AiOutlineClose />
        </button>
        <h3>Create a Post</h3>
        <form className="flex-col">
          <div className="flex">
            <input id="title" type="text" placeholder="Project title" />
            <input id="tags" type="text" placeholder="Tag separated by comma" />
          </div>
          <textarea
            rows={7}
            id="description"
            type="text"
            placeholder="Description"
          />
          <Uploader/>
          <button className="purple-btn">Post</button>
        </form>
      </div>
    </StyledAsk>
  );
};

const StyledAsk = styled(StyledPopup)`
  .container {
    min-width: 40vw;
    height: fit-content !important;
    overflow: hidden;
  }
  form * {
    width: 100%;
  }
  form {
    margin-top: 2rem;
  }
`;

export default CreatePost;