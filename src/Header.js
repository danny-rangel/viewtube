import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
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
  position: static;
  color: black;
  background-color: #FF0000;
  background-color: white;
  height: 4rem;
  display: grid;
  grid-template-columns: 2fr 4fr 1fr 1fr;
  grid-gap: 10px;
  align-items: center;

  ${media.medium`
    grid-template-columns: 2fr 4fr 1fr;
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

const Input = styled(InputBase)`
&& {
  flex: 1;
  color: black;
  border-radius: 5px;
  height: 1rem;
  padding: 10px;
  width: 95%;
  border: 1px solid #d7d7e2;
}
`;

const Icon = styled(IconButton)`
&& {
  color: black;
  justify-self: start;
}
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
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
    const [ searchTerm, setSearchTerm ] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
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
              <Input 
                placeholder="Search"
                onChange={e => setSearchTerm(e.target.value)}
                onSubmit={handleSubmit}
                required
              >
              </Input>
            </form>
            <Icon onClick={handleSubmit} aria-label="Search">
              <SearchIcon />
            </Icon>
        </Nav>
    );
}

export default Header;