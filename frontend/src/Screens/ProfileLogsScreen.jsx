import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, deleteUser, updateUser } from "../actions/userActions";

function ProfileLogsScreen() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userAccountDetail.users);
  const loading = useSelector((state) => state.userAccountDetail.loading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [permissions, setPermissions] = useState({
    is_active: false,
    is_admin: false,
    is_paid: false,
  });
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const filteredUsers = users.filter((user) =>
    `${user.id}`.includes(searchQuery.toLowerCase()) ||
    user.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteConfirmationModal(true);
  };

  const handleManagePermissions = (userId) => {
    const currentUser = users.find((user) => user.id === userId);
    if (currentUser) {
      setPermissions({
        is_active: currentUser.is_active,
        is_admin: currentUser.is_admin,
        is_paid: currentUser.is_paid,
      });
    }
    setShowModal(true);
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
    setPermissions({
      is_active: false,
      is_admin: false,
      is_paid: false,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleSavePermissions = () => {
    dispatch(updateUser(selectedUserId, permissions));
    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(selectedUserId));
    setShowDeleteConfirmationModal(false);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "white",
        border: "black solid 1px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "100%",
        padding: "20px",
      }}
    >
      <div className="text-center" style={{ width: "100%" }}>
        <h1
          className="mt-4"
          style={{
            fontFamily: "Protest Guerrilla",
            textTransform: "uppercase",
            fontWeight: "1",
          }}
        >
          <i className="bi bi-people-fill"></i> User Management
        </h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by user ID, username, or email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="table-responsive"
            style={{ overflowX: "auto", width: "100%" }}
          >
            <Table striped bordered hover style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th style={{ textTransform: "uppercase" }}>Profile Picture</th>
                  <th style={{ textTransform: "uppercase" }}>Username</th>
                  <th style={{ textTransform: "uppercase" }}>Email</th>
                  <th style={{ textTransform: "uppercase" }}>Delete</th>
                  <th style={{ textTransform: "uppercase" }}>Manage Permissions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>
                      <img
                        src={user.profile.image}
                        alt={user.username}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{user.profile.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleManagePermissions(user.id)}
                      >
                        <i className="bi bi-shield-lock-fill"></i> Manage Permissions
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Permissions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCheckbox1">
              <Form.Check
                type="checkbox"
                label="Active"
                name="is_active"
                checked={permissions.is_active}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox2">
              <Form.Check
                type="checkbox"
                label="Admin"
                name="is_admin"
                checked={permissions.is_admin}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox3">
              <Form.Check
                type="checkbox"
                label="Paid"
                name="is_paid"
                checked={permissions.is_paid}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSavePermissions}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteConfirmationModal} onHide={handleCloseDeleteConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirmationModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfileLogsScreen;
