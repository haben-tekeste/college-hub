import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";
import { useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { toggleCreatePost } from "../../states/blogs";

// components
import Uploader from "../Uploader";

//icons
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const notify = () => {
    toast.success("Blog created succesfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image[0]);
      await axios.post("https://studenthub.dev/api/blogs", formData);
      notify();
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  return (
    <StyledAsk>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => {
            dispatch(toggleCreatePost());
            setImage(null);
          }}
        >
          <AiOutlineClose />
        </button>
        <h3>Create a Post</h3>
        <form className="flex-col" onSubmit={submitHandler}>
          <div className="flex">
            <input
              id="title"
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <input id="tags" type="text" placeholder="Tag separated by comma" /> */}
          </div>
          <textarea
            rows={7}
            id="description"
            type="text"
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {image && <img src={URL.createObjectURL(new Blob(image))} />}
          <Uploader image={image} setImage={setImage} />
          <button className="purple-btn" type="submit">
            Post
          </button>
          {error && (
            <div className="alert alert-danger" style={{ marginTop: "1rem" }}>
              <h4>Ooops....</h4>
              <ul className="my-0">
                {error.map((err) => (
                  <li key={err.message}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
  .alert {
    color: white;
    background-color: #f77c86;
    border-color: #d6e9c6;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 20rem;
  }
`;

export default CreatePost;
