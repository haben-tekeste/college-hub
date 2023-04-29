import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleIsBid } from "../states/bookDetails";

// components
import SearchBar from "../components/SearchBar";
import RelatedBooks from "../components/RelatedBooks";
import BidingPanel from "../components/pop-ups/BidingPanel";

// styles
import styled from "styled-components";

// icons
import { BiArrowBack } from "react-icons/bi";
import { BsHandThumbsUpFill } from "react-icons/bs";

const BookDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { details, isBid } = useSelector((state) => state.bookDetails);

  return (
    <StyledDetails>
      {isBid && <BidingPanel />}
      <header>
        <SearchBar />
      </header>
      <div className="container">
        <h2 className="flex back" onClick={() => navigate("/books")}>
          <BiArrowBack /> Back
        </h2>
        <div className=" details flex">
          <div className="image">
            <img src={details.coverImageUrl} alt="" />
          </div>
          <div className="info flex-col">
            <h1>{details.title}</h1>
            <p>{details.description}</p>
            <h4>Author: {details.author}</h4>
            <h4>Condition: {details.condition}</h4>
            <div className="genere flex">
              <h4>Genere:</h4>
              {details.genre.map((genre, index) => (
                <button key={index} className="tag-btn">
                  {genre}
                </button>
              ))}
            </div>
            <h4 className="flex">
              Likes: <BsHandThumbsUpFill /> {details.likes.length}
            </h4>
            <button
              className="purple-btn"
              onClick={() => dispatch(toggleIsBid())}
            >
              Bid
            </button>
          </div>
          <RelatedBooks />
        </div>
      </div>
    </StyledDetails>
  );
};

const StyledDetails = styled.div`
  padding: 2rem;
  width: 100%;
  .container {
    margin-top: 2rem;
    height: 85vh;
    width: 100%;
    .back {
      cursor: pointer;
      color: var(--primary);
      transition: color 0.5s ease;
      margin-bottom: 3rem;
      &:hover {
        color: var(--secondary);
      }
    }
    .image {
      flex: 1;
      height: 70vh;
      img {
        height: 100%;
      }
    }
    .details {
      align-items: flex-start;
      gap: 2rem;
      h1 {
        font-size: 3rem !important;
      }
      p,
      h4,
      button {
        font-size: 1.2rem;
      }
      .purple-btn {
        width: 100%;
      }
    }
    .info {
      flex: 1;
      gap: 2rem;
    }
  }
`;
export default BookDetails;