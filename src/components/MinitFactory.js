import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MinitFactory = ({ userObj }) => {
  const [minit, setMinit] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    // uuid는 기본적으로 어떤 특별한 식별자를 랜덤으로 생성해준다.
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const minitObj = {
      text: minit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("minits").add(minitObj);
    setMinit("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setMinit(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    // 파일을 읽고나면 실행된다.
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    // 파일 읽기
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => {
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={minit}
        onChange={onChange}
        type="text"
        placeholder="무슨 생각을 하고 있나요?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="minitter" />
      {attachment && (
        <div>
          <img src={attachment} alt={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachmentClick}>삭제</button>
        </div>
      )}
    </form>
  );
};

export default MinitFactory;
