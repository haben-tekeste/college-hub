import React, { useState } from "react";

import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";
import { toggleIsShareBook } from "../../states/books";

// components
import Uploader from "../Uploader";

//icons
import { AiOutlineClose } from "react-icons/ai";
import { createBook, fetchBooks } from "../../Actions/bookActions";
import { useNavigate } from "react-router-dom";

const ShareBook = () => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  const [condition, setCondition] = useState();
  let [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState();
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  genre = genre.split(",");
  const handleSubmit = async (e) => {
    e.preventDefault();

    let image = await toBase64(file);
    // const formData = {
    //   image,
    //   title,
    //   author,
    //   publishedDate,
    //   condition,
    //   description,
    //   genre,
    // };
    dispatch(
      createBook({
        image,
        title,
        author,
        publishedDate,
        condition,
        description,
        genre,
      })
    );
    // dispatch(fetchBooks());
    // dispatch(toggleIsShareBook())
    navigate(-1);
  };
  return (
    <StyledAsk>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => dispatch(toggleIsShareBook())}
        >
          <AiOutlineClose />
        </button>
        <h3>Share a Book</h3>
        <form className="flex-col" onSubmit={handleSubmit}>
          <div className="flex">
            <input
              name="title"
              type="text"
              placeholder="Book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              name="author"
              type="text"
              placeholder="Book Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="flex">
            <select
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option disabled selected value="">
                Book Condition
              </option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
            </select>
            <input
              name="genre"
              type="text"
              placeholder="Genre separated by comma"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <input
            type="date"
            name="published"
            id=""
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
          <textarea
            rows={7}
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Uploader setFile={setFile} file={file} />
          <button className="purple-btn" type="submit">
            Share Book
          </button>
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
  
    label{
        display: block;
    }
  form * {
    width: 100%;
  }
  form {
    margin-top: 2rem;
  }
`;

export default ShareBook;
