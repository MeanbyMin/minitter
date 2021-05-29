import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
      // setNewDisplayName("");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            type="text"
            autoFocus
            placeholder="프로필 이름"
            onChange={onChange}
            value={newDisplayName}
            className="formInput"
          />
          <input
            type="submit"
            value="프로필 수정"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
          로그아웃
        </span>
      </div>
    </>
  );
};
