import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://172.10.7.80:80/users"); // 서버 IP 주소와 포트 사용
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://172.10.7.80:80/login", {
        // 서버 IP 주소와 포트 사용
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://172.10.7.80:80/register", {
        // 서버 IP 주소와 포트 사용
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert("Registered successfully");
        setUsers([...users, { username, password }]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (usernameToDelete) => {
    try {
      const response = await fetch(`http://172.10.7.80:80/delete`, {
        // 서버 IP 주소와 포트 사용
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameToDelete }),
      });
      if (response.status === 200) {
        setUsers(users.filter((user) => user.username !== usernameToDelete));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 강제로 Home 페이지로 이동하는 함수
  const handleForceNavigate = () => {
    setIsLoggedIn(true); // 로그인 상태로 설정
    navigate("/"); // Home 페이지로 이동
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
      {/* 강제로 Home 페이지로 이동하는 버튼 */}
      <button onClick={handleForceNavigate} className="force-navigate-button">
        Home 페이지로 이동
      </button>
    </div>
  );
};

export default LoginPage;
