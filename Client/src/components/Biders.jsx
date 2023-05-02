//styled
import styled from "styled-components";
import ProfileComponent from "./ProfileComponent";
import { useDispatch } from "react-redux";
import { approveBid } from "../Actions/bookActions";
import { useNavigate } from "react-router-dom";

const Biders = ({ biders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <StyledBiders>
      <h3>Biders</h3>
      <table>
        <tbody>
          <tr>
            <td>User</td>
            <td>Book title</td>
            <td></td>
          </tr>
          {biders.map((bid, i) => (
            <tr key={i}>
              <td>
                <ProfileComponent name={bid.name} />
              </td>
              <td>{bid.bidderBook.title}</td>
              <td>
                <button
                  className="purple-btn"
                  onClick={() => {
                    dispatch(approveBid({ bidId: bid.id }));
                    navigate("/books");
                  }}
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledBiders>
  );
};

const StyledBiders = styled.div`
  background-color: var(--lightgrey);
  padding: 1rem;
  border-radius: 10px;
`;
export default Biders;
