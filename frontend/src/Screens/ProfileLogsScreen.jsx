import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

function ProfileLogsScreen() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      profilePicture: "placeholder.jpg",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      profilePicture: "placeholder.jpg",
    },
    {
      id: 3,
      username: "user3",
      email: "user3@example.com",
      profilePicture: "placeholder.jpg",
    },
  ]);

  const deleteUser = (userId) => {
    console.log("Delete user with ID:", userId);
  };

  const managePermissions = (userId) => {
    console.log("Manage permissions for user with ID:", userId);
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
        <div
          className="table-responsive"
          style={{ overflowX: "auto", width: "100%" }}
        >
          <Table
            striped
            bordered
            hover
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th style={{ textTransform: "uppercase" }}>Profile Picture</th>
                <th style={{ textTransform: "uppercase" }}>Username</th>
                <th style={{ textTransform: "uppercase" }}>Email</th>
                <th style={{ textTransform: "uppercase" }}>Delete</th>
                <th style={{ textTransform: "uppercase" }}>
                  Manage Permissions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      <i className="bi bi-trash-fill"></i> Delete
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => managePermissions(user.id)}>
                      <i className="bi bi-shield-lock-fill"></i> Manage
                      Permissions
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default ProfileLogsScreen;
