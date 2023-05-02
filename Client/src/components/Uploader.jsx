import React from "react";
import styled from "styled-components";

//icons
import { MdCloudUpload } from "react-icons/md";

const Uploader = ({ setFile, file }) => {
  const uploadHandler = () => {
    document.querySelector(".upload-input").click();
  };
  return (
    <StyledUploader onClick={uploadHandler}>
      <span>
        <MdCloudUpload color="var(--primary)" />
      </span>
      <h3>
        Drop a file here, or <span onClick={uploadHandler}>Browse</span>
      </h3>
      <input
        type="file"
        name="resume"
        hidden
        className="upload-input"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </StyledUploader>
  );
};

const StyledUploader = styled.form`
  min-height: 20vh;
  width: 100%;
  border: 2px dashed var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: var(--secondary);
  }
  h3 {
    font-weight: normal;
    text-align: center;
    span {
      font-size: inherit;
      font-weight: bold;
      display: inline;
    }
  }
  span {
    pointer-events: none;
    display: block;
    font-size: 5rem;
    text-align: center;
  }
`;
export default Uploader;
