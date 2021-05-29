import Minit from "components/Minit";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import MinitFactory from "components/MinitFactory";

const Home = ({ userObj }) => {
  const [minits, setMinits] = useState([]);

  useEffect(() => {
    dbService
      .collection("minits")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const minitArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMinits(minitArray);
      });
  }, []);

  return (
    <div className="container">
      <MinitFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {minits.map((minit) => (
          <Minit
            key={minit.id}
            minitObj={minit}
            isOwner={minit.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
