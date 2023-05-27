import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";
import axios from "axios";
import useClickOutSide from "../hooks/useClickOutSide.jsx";
import { Link } from "react-router-dom";
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  position: relative;
`;
const Boximage = styled.div`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
const FlexProduct = styled.div`
  display: flex;
  :hover {
    background-color: brown;
    color: white;
  }
  width: 230px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  :focus {
    outline: 0;
  }
`;
const ParamsContainer = styled.div`
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  width: 250px;
  position: absolute;
  top: 45px;
  max-height: 500px;
  overflow-y: scroll;
`;
const SearchParams = () => {
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const { show, setShow, nodeRef } = useClickOutSide();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products/");
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);
  return (
    <SearchContainer ref={nodeRef}>
      <Input
        placeholder="Search"
        onChange={(e) => setSearchTitle(e.target.value)}
        onClick={() => {
          setShow(!show);
        }}
      />
      {show && (
        <ParamsContainer>
          {loading ? (
            <h4>Loading ...</h4>
          ) : (
            posts
              .filter((value) => {
                if (searchTitle === "") {
                  return "";
                } else if (
                  value.title.toLowerCase().includes(searchTitle.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((item) => (
                <Link to={`/product/${item._id}`}>
                  <FlexProduct>
                    <Boximage>
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={item.img}
                        alt=""
                      />
                    </Boximage>
                    <h5
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                      key={item.id}
                    >
                      {item.title}
                    </h5>
                  </FlexProduct>
                </Link>
              ))
          )}
        </ParamsContainer>
      )}
      <Search style={{ color: "gray", fontSize: 16 }} />
    </SearchContainer>
  );
};

export default SearchParams;
