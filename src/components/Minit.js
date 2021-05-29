import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="minit">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container minitEdit">
                <input
                  type="text"
                  placeholder="Minit 수정하기"
                  value={newMinit}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Minit 수정" className="formBtn" />
              </form>
              <button onClick={toggleEditing} className="formBtn cancelBtn">
                취소
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{minitObj.text}</h4>
          {minitObj.attachmentUrl && (
            <img src={minitObj.attachmentUrl} alt={minitObj.attachmentUrl} />
          )}
          {isOwner && (
            <div class="minit__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Minit;
