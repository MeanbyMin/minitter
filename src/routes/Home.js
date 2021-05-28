import Minit from "components/Minit";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import MinitFactory from "components/MinitFactory";

const Home = ({ userObj }) => {
  const [minits, setMinits] = useState([]);

  // const getMinits = async () => {
  //   // get()메서드만 사용하면 querysnapshot을 리턴한다. 다향한 프로퍼티와 메서드를 포함하고 있다.
  //   const dbMinits = await dbService.collection("minits").get();
  //   // querysnapshot에서 forEach 메서드를 사용해서 data들을 가져온다
  //   dbMinits.forEach((document) => {
  //     const minitObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setMinits((prev) => [minitObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getMinits();
    // 위와 다른 방식인데, dbService.collection에서 받아오는 snapshot을 onSnapshot을 이용해서 받아오고,
    // snapshot 안에 있는 docs들을 map을 이용해서 가져온다.
    // snapshot을 이용하는 이유는 CRUD가 일어날때마다 발생하고 realtime을 사용할 수 있음
    dbService.collection("minits").onSnapshot((snapshot) => {
      const minitArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMinits(minitArray);
    });
  }, []);

  return (
    <div>
      <MinitFactory userObj={userObj} />
      <div>
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
