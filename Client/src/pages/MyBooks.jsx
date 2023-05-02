import React, { useEffect, useState } from "react";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BidingPopup from "../components/pop-ups/BidingPopup";

// redux
import { useDispatch } from "react-redux";
import { setBidingDetails } from "../states/books";
import { fetchMyBooks, showBids } from "../Actions/bookActions";
import { fetchBook } from "../Actions/bookActions";
const MyBooks = ({ books }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPopup, setIsPopup] = useState(false);
  const MyBookItem = ({ book }) => {
    return (
      <StyledBook className="flex">
        <div className="image">
          <img src={book.coverImageUrl} alt={book.title} />
        </div>
        <div className="flex-col">
          <h3 className="flex">{book.title}</h3>
          <h4 className="flex">
            {" "}
            condition <span className="tag-btn">{book.condition}</span>
          </h4>
          {/* <h4 className="flex">{book.likes.length} Likes</h4> */}
        </div>
      </StyledBook>
    );
  };
  return (
    <StyledMyBooks className="container flex-col">
      {isPopup && (
        <BidingPopup
          setIsPopup={setIsPopup}
          // bookId={bookId}
          // isPopup={isPopup}
        />
      )}
      <h2 className="flex back" onClick={() => navigate("/books")}>
        <BiArrowBack /> Available Books
      </h2>
      <h2>My books</h2>
      <table>
        <tbody>
          <tr>
            <th>Book</th>
            {/* <th style={{ textAlign: "center" }}>Number of Bids</th> */}
            <th>Action</th>
          </tr>
          {books?.map((book, i) => (
            <tr key={i}>
              <td>
                <MyBookItem book={book} />
              </td>
              {/* <td className="biders">{i * 2}</td> */}
              <td>
                <button
                  className="light-btn"
                  onClick={() => {
                    dispatch(showBids({ bookId: book.id }));
                    dispatch(fetchBook({ bookId: book.id }));
                    setIsPopup(true);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMyBooks>
  );
};

const StyledMyBooks = styled.div`
  table {
    width: 100%;
    margin-top: 2rem;
    th {
      text-align: left;
      font-size: 1.5rem;
    }
    .biders {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: var(--primary);
    }
    td,
    th {
      padding: 1rem;
    }
  }
  .container {
    margin-top: 2rem;
    height: 85vh;
    width: 100%;
  }
  .back {
    cursor: pointer;
    color: var(--primary);
    transition: color 0.5s ease;
    margin-bottom: 3rem;
    &:hover {
      color: var(--secondary);
    }
  }
`;
const StyledBook = styled.div`
  .image {
    width: 10rem;
    object-fit: cover;
  }
  span {
    color: black;
  }
`;
export default MyBooks;
