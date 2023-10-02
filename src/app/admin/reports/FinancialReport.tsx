import { useState, useEffect } from "react";
import clsx from "clsx";

import { getUsersCreatedBy } from "@/api/userManagement";
import GeneralTable from "@/app/components/admin/reports/FinancialReport/GeneralTable";
import UserTable from "@/app/components/admin/reports/FinancialReport/UserTable";

const FinancialReport = ({ currentTab }: any) => {
  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");

  const [prSelected, setPrSelected] = useState(false);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const _userinfo = await getUsersCreatedBy(0);
    setUserList(_userinfo);
  };

  const getChildren = async (username: string, id: number) => {
    const _childrenInfo = await getUsersCreatedBy(id);
    console.log(_childrenInfo)
    if (_childrenInfo.length !== 0) {
      const _newUserList = addUserList(userList, username, _childrenInfo);
      setUserList([..._newUserList]);
    }
  };

  const removeChildren = (username: string, id: number) => {
    const _newUserList = removeUserList(userList, username, id);
    setUserList([..._newUserList]);
  };

  const removeUserList = (userInfo_: any[], username: string, id: number) => {
    for (let i = 0; i < userInfo_.length; i++) {
      if (Array.isArray(userInfo_[i]) === true) {
        if (userInfo_[i][0].createdBy === String(id)) {
          userInfo_.splice(i, 1);
          break;
        }
        else {
          removeUserList(userInfo_[i], username, id);
          if (i === userInfo_.length-1)
            break;
        }
      }
    }
    return userInfo_;
  };

  const addUserList = (
    userInfo_: any[],
    username: string,
    _childrenInfo: any[]
  ) => {
    for (let i = 0; i < userInfo_.length; i++) {
      if (Array.isArray(userInfo_[i]) === true) {
        addUserList(userInfo_[i], username, _childrenInfo);
        if (i === userInfo_.length-1)
          break;
      }
      if (userInfo_[i].username === username) {
        userInfo_.splice(i + 1, 0, _childrenInfo);
        break;
      }
    }
    return userInfo_;
  };

  const createTable = (child: any, parentId: number) => {
    return (
      <>
        <td colSpan={11} className="p-2 border border-gray-600">
          <UserTable
            parentId_={parentId}
            child={child}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
          />
        </td>
      </>
    );
  };

  const onHandleSearch = async () => {};

  return (
    <section
      className={clsx(
        "flex-col gap-4 pt-4 px-4",
        currentTab === "Financial Report" ? "flex" : "hidden"
      )}
    >
      <section className="flex flex-col gap-4">
        <div className="flex gap-1 justify-center">
          <div className="flex flex-col">
            <p className="text-sm text-white">From:</p>
            <input
              type="date"
              className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none border border-primary bg-white"
              value={startingOn}
              onChange={(e) => setStartingOn(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-white">To:</p>
            <input
              type="date"
              className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none border border-primary bg-white"
              value={endingOn}
              onChange={(e) => setEndingOn(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            className="w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
            onClick={onHandleSearch}
          >
            Search
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-4 pt-4">
        <table className="w-full text-sm text-white text-center">
          <thead className="text-sm bg-[#222] uppercase">
            <tr>
              <th scope="col" className="py-1.5 border border-black"></th>
              <th scope="col" className="py-1.5 border border-black">
                tax
              </th>
              <th scope="col" className="py-1.5 border border-black">
                ggr
              </th>
              <th scope="col" className="py-1.5 border border-black">
                t.o.
              </th>
              <th scope="col" className="py-1.5 border border-black">
                bonus
              </th>
              <th scope="col" className="py-1.5 border border-black">
                converted
              </th>
              <th scope="col" className="py-1.5 border border-black">
                ngr
              </th>
              <th scope="col" className="py-1.5 border border-black">
                hands
              </th>
              <th scope="col" className="py-1.5 border border-black">
                to partners
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-brand-dark-grey border border-black">
              <td
                className={clsx(
                  "py-1 border border-black cursor-pointer hover:bg-brand-yellow text-black w-14",
                  prSelected === true ? "bg-brand-yellow" : "bg-white"
                )}
                onClick={() => setPrSelected(!prSelected)}
              >
                Pr
              </td>
              <td className="py-1 border border-black">0.00</td>
              <td className="py-1 border border-black bg-brand-plus-cell">
                28,126.59
              </td>
              <td className="py-1 border border-black">0.00</td>
              <td className="py-1 border border-black">1,940.36</td>
              <td className="py-1 border border-black">1,311.81</td>
              <td className="py-1 border border-black bg-brand-plus-cell">
                26,814.78
              </td>
              <td className="py-1 border border-black">26,814.63</td>
              <td className="py-1 border border-black">0.15</td>
            </tr>
            {prSelected === true && (
              <tr className="bg-brand-dark-grey border border-black">
                <td colSpan={9} className="p-4">
                  <GeneralTable />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <UserTable
          parentId_={0}
          child={userList}
          createTable={createTable}
          getChildren={getChildren}
          removeChildren={removeChildren}
        />
      </section>
    </section>
  );
};

export default FinancialReport;
