import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections, createMatch } from "../store/exploreUsers";
import DropDown from "./DropDown";

export default function ExploreUsers() {
  // react-redux
  const dispatch = useDispatch();
  const myConnections = useSelector((state) => state.exploreUsers);

  // use effect below
  useEffect(() => {
    dispatch(fetchConnections());
  }, []);

  return (
    <div>
      {myConnections.map((connection) => {
        return (
          <div key={connection.id}>
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{connection.username}</p>
              </header>
            </div>

            <DropDown key={connection.id} connection={connection} />
          </div>
        );
      })}
    </div>
  );
}
