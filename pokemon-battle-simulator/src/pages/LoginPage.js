import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([
    { username: "user", password: "password" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const handleRegister = () => {
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      alert("이미 존재하는 아이디입니다.");
    } else if (username && password) {
      const newUsers = [...users, { username, password }];
      setUsers(newUsers);
      localStorage.setItem("users", JSON.stringify(newUsers));
      alert("등록되었습니다. 이제 로그인할 수 있습니다.");
    } else {
      alert("아이디와 비밀번호를 입력하세요.");
    }
  };

  const handleDelete = (usernameToDelete) => {
    const newUsers = users.filter((user) => user.username !== usernameToDelete);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <div className="login-form">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="submit">로그인</button>
          <button type="button" onClick={handleRegister}>
            등록
          </button>
        </div>
      </form>
      <div className="registered-users">
        <h3>등록된 사용자</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} / {user.password}
              <button
                onClick={() => handleDelete(user.username)}
                className="delete-button"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
