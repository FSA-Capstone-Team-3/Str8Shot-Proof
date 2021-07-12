import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "./DropDown";

export default function ExploreUsers({
  setSharedLines,
  myConnections,
  setStationsOnLine,
}) {
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

            <DropDown
              key={connection.id}
              connection={connection}
              setSharedLines={setSharedLines}
              setStationsOnLine={setStationsOnLine}
            />
          </div>
        );
      })}
    </div>
  );
}
