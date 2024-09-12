import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:5000/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password }),
      });
      const data = await result.json();
      console.log(data);
      if (data.message === "User not found")
        alert("User not found register first");
      if (data.token) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userId", data?.user?.id);
        alert("Login successful");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-50 d-flex ">
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
          Login
        </Button>
        <p>
          Dont have an account? <a href="/register">Register</a>
        </p>
      </Form>
    </div>
  );
};

export default Login;
