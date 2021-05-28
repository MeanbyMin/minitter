import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Minit = ({ minitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMinit, setNewMinit] = useState(minitObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 이 Minit을 삭제하시겠습니까?");
    if (ok) {
      // Minit 삭제
      // minits collection에 있는 해당 id를 찾아서 삭제한다.
      await dbService.doc(`minits/${minitObj.id}`).delete();
      await storageService.refFromURL(minitObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`minits/${minitObj.id}`).update({
      text: newMinit,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewMinit(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Minit 수정하기"
                  value={newMinit}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Minit 수정" />
              </form>
              <button onClick={toggleEditing}>취소</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{minitObj.text}</h4>
          {minitObj.attachmentUrl && (
            <img
              src={minitObj.attachmentUrl}
              width="50px"
              height="50px"
              alt={minitObj.attachmentUrl}
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Minit 삭제</button>
              <button onClick={toggleEditing}>Minit 수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Minit;
