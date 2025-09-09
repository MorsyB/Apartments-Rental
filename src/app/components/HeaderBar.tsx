"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderBar() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://e7.pngegg.com/pngimages/940/524/png-clipart-computer-icons-icon-design-address-others-miscellaneous-heart.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default HeaderBar;