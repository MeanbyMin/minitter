import React from "react";
import { authService } from "fbase";
import { firebaseInstance } from "fbase";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialLogin = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="authBtns">
      <button onClick={onSocialClick} name="google" className="authBtn">
        Google로 로그인 <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button onClick={onSocialClick} name="github" className="authBtn">
        Github로 로그인 <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  );
};

export default SocialLogin;
