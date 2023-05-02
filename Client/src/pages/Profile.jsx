import { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import Loading from "../components/Loading";

// components
import Stats from "../components/Stats";
import Experience from "../components/Experience";
import Skill from "../components/Skill";
import { useSelector } from "react-redux";
import { AiOutlineConsoleSql } from "react-icons/ai";

const Profile = ({ name, id }) => {
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const userId = !name ? userInfo.id : id;
    const fetchProfile = async () => {
      setError("");
      try {
        const { data } = await axios.get(
          `https://studenthub.dev/api/profiles/${userId}`
        );
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  if (!profile)
    return (
      <h3 style={{ textAlign: "center" }}>
        {name || "User"} does not have profile yet
      </h3>
    );

  return (
    <StyledProfile>
      <div className="banner">
        <div className="profile-pic">
          <h6>{profile?.name?.charAt(0)}</h6>
        </div>
        <div className="banner-pic"></div>
      </div>
      <div className="info flex">
        <div className="flex-col">
          <h1>{name}</h1>
          <h3>
            Major: <span>{profile?.major}</span>
          </h3>
          <h3>
            Concentration: <span>{profile?.concentration}</span>
          </h3>
          <div className="flex">
            <h3 className="tag-btn">cGPA: {profile?.cGPA}</h3>
            <h3 className="tag-btn">Year: {profile?.yearOfStudy}</h3>
          </div>
        </div>
        <Stats />
      </div>
      <div className="about flex">
        <div className="flex-col">
          <h2>About</h2>
          <p>{profile?.summary}</p>
        </div>
        <div className="flex-col">
          <h2>Resume</h2>
          <p>{profile?.resume}</p>
        </div>
      </div>
      <div className="experience flex-col">
        <h2>Experiences</h2>
        {profile?.experiences?.map((experience, index) => (
          <Experience key={index} experience={experience} />
        ))}
      </div>
      <div className="info flex-col">
        <h2>Skills</h2>
        {profile?.skills?.map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  height: 100vh;
  overflow-y: scroll;
  .banner {
    position: relative;
    min-height: 25vh;
    .profile-pic {
      width: 13rem;
      height: 13rem;
      background-color: var(--primary);
      border-radius: 50%;
      display: grid;
      place-content: center;
      transform: translate(3rem, 4rem);
      h6 {
        color: white;
        font-size: 5.5rem;
      }
    }
    .banner-pic {
      height: 20vh;
      width: 100%;
      background-color: var(--secondary);
      border-radius: 10px;
      position: absolute;
      top: 0;
      z-index: -1;
    }
  }
  .info,
  .experience {
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    justify-content: space-between;
  }
  .about {
    .flex-col {
      background-color: white;
      padding: 2rem;
    }
  }
`;
export default Profile;
