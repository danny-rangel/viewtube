import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 240;
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
  
  }
  `;

  const Tool = styled(Toolbar)`
  && {
    color: black;
    background-color: #FF0000;
    background-color: white;
    height: 4rem;
    display: grid;
    grid-template-columns: 0.5fr 1fr 4fr 1fr;
    grid-gap: 10px;
    align-items: center;
  
    ${media.medium`
      grid-template-columns: 1fr 4fr 1fr;
    `} 
  }
  `;
  
  const Text = styled.h2`
  font-weight: bold;
  text-decoration: none;
  font-size: 1.4rem;
  color: black;
  margin: 0;
  letter-spacing: -1.75px;
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
    padding: 16px;
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
    grid-template-columns: 1fr 1fr;
    align-self: center;
    justify-self: center;
    align-items: center;
    justify-items: center;

    ${media.medium`
      display: none;
    `} 
  `;

  const MobileDiv = styled.div`
  display: none;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;

  ${media.medium`
    display: grid;
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
  

const styles = theme => ({

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    
    justifyContent: 'flex-end',
  }
});

class Sidebar extends React.Component {
  state = {
    open: false,
    searchTerm: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onTermSubmit(this.state.searchTerm);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root} >
        <CssBaseline />
        <Nav
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Tool disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open)}
              style={{width: '50px', justifySelf: 'center'}}
            >
              <MenuIcon />
            </IconButton>
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
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <Input 
                placeholder="Search"
                onChange={e => this.setState({ searchTerm: e.target.value})}
                onSubmit={this.handleSubmit}
                required
              >
              </Input>
            </form>
            <Icon onClick={this.handleSubmit} aria-label="Search">
              <SearchIcon />
            </Icon>
          </Tool>
        </Nav>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
          <MobileDiv>
            <StyledLink to="/" style={{justifySelf: 'end'}}>
                <Logo src="/viewtube.png" />
              </StyledLink>
              <StyledLink to="/">
                <Text >
                  ViewTube
                </Text>
              </StyledLink>
          </MobileDiv>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Home', 'Trending', 'Subscriptions'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Library', 'History', 'Watch Later', 'Liked Videos'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sidebar);