import React, { useEffect } from "react";

import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";

//icons
import { AiOutlineClose } from "react-icons/ai";
import Biders from "../Biders";
import { fetchBook, showBids } from "../../Actions/bookActions";
import Loading from "../Loading";

const BidingPopup = ({ setIsPopup }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(showBids({ bookId: isPopup.bookId }));
  //   dispatch(fetchBook({ bookId: isPopup.bookId }));
  // }, [dispatch]);
  const {
    details,
    loading: detailsLoading,
    bidingDetails,
  } = useSelector((state) => state.bookDetails);
  if (detailsLoading) return <Loading />;
  return (
    <StyledAsk>
      <div className="container">
        <button className="light-btn close" onClick={() => setIsPopup(false)}>
          <AiOutlineClose />
        </button>
        <h2>{details?.title}</h2>
        <div className="flex book">
          <div className="image">
            <img src={details.coverImageUrl} alt={details.title} />
          </div>
          <div className="details flex-col">
            <h3>
              Author: <span>{details.author}</span>
            </h3>
            <h3>Condition: {details.condition}</h3>
            <div className="genere flex">
              <h3>Genere:</h3>
              {details?.genre?.map((genre, index) => (
                <button key={index} className="tag-btn">
                  {genre}
                </button>
              ))}
            </div>
            <h3>Description</h3>
            <p>{details.description}</p>
            <button className="purple-btn">Edit</button>
          </div>
        </div>
        <Biders biders={bidingDetails} />
      </div>
    </StyledAsk>
  );
};

const StyledAsk = styled(StyledPopup)`
  .container {
    width: 50vw !important;
    height: 70vh;
    overflow-y: scroll;
    padding: 1.5rem;
  }
  .book {
    margin: 2rem 0rem;
  }
  .image {
    height: 30vh;
    width: 30vw;
    img {
      height: 100%;
    }
  }
  form * {
    width: 100%;
  }
  form {
    margin-top: 2rem;
  }
`;

export default BidingPopup;
