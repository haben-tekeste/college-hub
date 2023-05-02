import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  setApplications,
  filterApplications,
  searchApplications,
} from "../../states/application";

//styles
import styled from "styled-components";
import { StyledPopup } from "../../styles/PopupStyles";
import { StyledSearch } from "../SearchBar";

//icons
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

// demo data
import { applicationData } from "../../data/projectData";
import Spinner from "../Spinner";
import { fetchMyApplications } from "../../Actions/applicationActions";

//
import { formatDate } from "../../utils/date";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyApplications());
    dispatch(setApplications(applicationData));
  }, []);

  const { filteredApplications, myApplications, loading } = useSelector(
    (state) => state.application
  );

  // handling search queries
  const searchHandler = (value) => {
    dispatch(searchApplications(value));
  };

  if (loading) return <Spinner />;

  return (
    <StyledPopup>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => navigate("/projects")}
        >
          <AiOutlineClose />
        </button>
        <h3>My Applications ({myApplications.length})</h3>

        <StyledApplications>
          <div className="flex">
            <StyledSearch>
              <input
                type="text"
                onChange={(e) => searchHandler(e.target.value)}
                placeholder="Search applications..."
              />
              <button className="search-btn">
                <AiOutlineSearch />
              </button>
            </StyledSearch>
            <div className="sort">
              <label htmlFor="application-sort">Filter by:</label>
              <select
                name="application-sort"
                onChange={(e) => dispatch(filterApplications(e.target.value))}
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="selected">Selected</option>
                <option value="not selected">Not Selected</option>
              </select>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Project</th>
                <th>Project ID</th>
                <th>Status</th>
                <th>Applied Date</th>
                {/* <th>Action</th> */}
              </tr>
              {myApplications?.map((application, i) => (
                <tr key={i}>
                  <td>{application.projectId.topic}</td>
                  <td>
                    <h6>{application.projectId.id}</h6>
                  </td>
                  <td>{application.status}</td>
                  <td>{formatDate(new Date(application.createdAt))}</td>
                  {/* <td>
                    <button className="light-btn">View</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredApplications.length < 1 && (
            <div className="nothing">
              <h1>No Applications</h1>
              <button className="light-btn" onClick={() => searchHandler("")}>
                Reset
              </button>
            </div>
          )}
        </StyledApplications>
      </div>
    </StyledPopup>
  );
};

const StyledApplications = styled.div`
  background-color: var(--lightgrey);
  padding: 1rem;
  margin-top: 2rem;
  table {
    width: 100%;
    margin-top: 2rem;
  }
  td,
  th {
    padding: 1rem;
  }
  th {
    text-align: left;
  }
  h6 {
    font-size: 1rem;
  }
  .nothing {
    min-height: 30vh;
    width: 100%;
    color: black;
    display: grid;
    place-content: center;
    h1 {
      margin-bottom: 1rem;
      color: var(--primary);
    }
  }
  .search-btn {
    margin-right: 3rem;
  }
`;
export default Applications;
