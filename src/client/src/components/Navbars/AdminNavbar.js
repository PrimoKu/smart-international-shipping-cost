
import React, { useState } from "react";
import axios from 'axios';
import classNames from "classnames";
import { useAuth } from "contexts/AuthContext.js";

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";

function AdminNavbar(props) {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuth();
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalCancelable, setModalCancelable] = useState(true);
  const [color, setcolor] = React.useState("navbar-transparent");
  const [notifications, setNotifications] = useState([]);
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notifications/`, { withCredentials: true });
        
        // Filter notifications by user ID (assuming user.id exists in your user object)
        const userNotifications = response.data.filter(notifications => notifications.user_id === user?._id);
        
        setNotifications(userNotifications);
      } catch (error) {
        console.error("An error occurred while fetching notifications", error);
      }
    };
    fetchNotifications(); // Fetch notifications when the component mounts
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  }, [user]);

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const toggleModal = () => {
    if (modalCancelable) {
      setModal(!modal);
    }
  };
  const showModal = (title, content, cancelable = true) => {
    setModalTitle(title);
    setModalContent(content);
    setModalCancelable(cancelable);
    setModal(true);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`, { withCredentials: true });
      showModal("BlueJay", "Logout succeeded!", true);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error during logout', error);
      }
    }
  };

  const handleModalClosed = () => {
    window.location.assign('/');
  }
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-sound-wave" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                    {notifications.map((notifications, index) => (
                      <NavLink tag="li" key={index}>
                        <DropdownItem className="nav-item">
                          {notifications.message} {/* Display the message from notifications */}
                        </DropdownItem>
                      </NavLink>
                    ))}
                  </DropdownMenu>
              </UncontrolledDropdown>
              {isAuthenticated 
                ? 
                <UncontrolledDropdown nav>
                  <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                    <div className="photo">
                      <img alt="..." src={require("assets/img/anime3.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Profile</DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Settings</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem className="nav-item" onClick={ handleLogout }> Log out </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown> 
                :
                <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                  <div>
                    <i className="tim-icons icon-single-02" />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item text-dark" href="/login">
                      Login
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item text-dark" href="/register">
                      Register
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
                </UncontrolledDropdown>
              }
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal modalClassName="modal-search" isOpen={modalSearch} toggle={toggleModalSearch} >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button aria-label="Close" className="close" onClick={toggleModalSearch} >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
      <Modal isOpen={modal} toggle={toggleModal} keyboard={modalCancelable} onClosed={handleModalClosed}>
        <ModalHeader toggle={toggleModal}>
            <div className="text-dark mb-0" style={{fontSize: '30px'}}>{modalTitle}</div>
        </ModalHeader>
        <ModalBody style={{height: '75px'}}><p style={{fontSize: '20px'}}>{modalContent}</p></ModalBody>
        <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
            <Button color="secondary" onClick={toggleModal} style={modalCancelable ? {} : { display: 'none' }}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AdminNavbar;
