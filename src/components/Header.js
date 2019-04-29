import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';


const size = {
  small: 400,
  medium: 960,
  large: 1140
}

const media = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
      @media (max-width: ${size[label]}px) {
          ${css(...args)}
      }
  `
  return acc;
}, {});

const Nav = styled(AppBar)`
&& {
  position: fixed;
  color: black;
  background-color: #FF0000;
  background-color: white;
  height: 4rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  align-items: center;
  box-shadow: 0px -5px 10px black;

  ${media.medium`
    grid-template-columns: 2fr 4fr;
  `} 
}
`;

const Text = styled.h2`
  font-weight: 900;
  text-decoration: none;
  color: black;
  margin: 0;
  letter-spacing: -1.5px;
  && {
    display: inline-block;
    justify-self: start;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-size: 16px;
  color: black;
  ${media.medium`
    width: 80%;
  `} 
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
`;


const SearchBarContainer = styled.div`
  height: 31.59px;
  border-radius: 2px;
  background-clip: white;
  padding: 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  width: 70%;
  max-width: 770px;
  box-sizing: border-box;
  display: flex;
  ${media.medium`
    width: 95%;
  `} 
  
`;

const SearchBarButton = styled.button`
  background-color: #F9F9F9;
  border-left: 1px solid #EBEBEB;
  border-right: none;
  border-top: none;
  border-bottom: none;
  height: 31.59px;
  margin-top: 0;
  width: 65px;
  padding: 0px 7px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #F1F1F1;
  }
  ${media.medium`
    width: 50px;
  `} 
`;

const Logo = styled.img`
  width: 40px;
  margin: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
`;


const Header = ({ onTermSubmit }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
      if (searchTerm.length === 0) {
        throw new Error("No input entered!");
      }
      onTermSubmit(searchTerm);
    }

    return (
        <Nav>
            <Div>
              <StyledLink to="/" style={{justifySelf: 'end'}}>
                <Logo src="/viewtube.png" />
              </StyledLink>
              <StyledLink to="/">
                <Text >
                  ViewTube
                </Text>
              </StyledLink>
            </Div>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <SearchBarContainer>
                  <Input 
                    placeholder="Search"
                    onChange={e => setSearchTerm(e.target.value)}
                    onSubmit={handleSubmit}
                    value={searchTerm}
                  >
                  </Input>
                  <SearchBarButton onClick={handleSubmit} aria-label="Search">
                    <SearchIcon style={{width: '22px'}}/>
                  </SearchBarButton>
                </SearchBarContainer>
              </form>
        </Nav>
    );
}

export default Header;