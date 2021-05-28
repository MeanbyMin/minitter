import React from "react";
import { authService } from "fbase";
import { firebaseInstance } from "fbase";

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
    <div>
      <button onClick={onSocialClick} name="google">
        Google로 로그인
      </button>
      <button onClick={onSocialClick} name="github">
        Github로 로그인
      </button>
    </div>
  );
};

export default SocialLogin;
