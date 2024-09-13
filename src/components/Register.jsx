import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:5000/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password }),
      });
      const data = await result.json();
      if (data.message === "User registered successfully")
        alert("User registered successfully now login");
      if (data.message === "Username already exists")
        alert("Username already exists");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" login ">
      <Form className="d-flex flex-column">
        <Form.Group className="mb-3 d-flex">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter userName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </Form>
    </div>
  );
};

export default Register;
