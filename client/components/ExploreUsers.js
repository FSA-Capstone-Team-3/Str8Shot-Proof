import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections, createMatch } from "../store/exploreUsers";

export default function ExploreUsers() {
  // react-redux
  const dispatch = useDispatch();
  const myConnections = useSelector((state) => state.exploreUsers);

  // state below

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

            {/* Dropdown needs to be updated to be dynamic*/}
            <div className="dropdown">
              <div className="dropdown-trigger">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls={`dropdown-menu${connection.id}`}
                >
                  <span>Click me</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div
                className="dropdown-menu"
                id={`dropdown-menu${connection.id}`}
                role="menu"
              >
                <div className="dropdown-content">
                  <a href="#" className="dropdown-item">
                    Overview
                  </a>
                  <a href="#" className="dropdown-item">
                    Modifiers
                  </a>
                  <a href="#" className="dropdown-item">
                    Grid
                  </a>
                  <a href="#" className="dropdown-item">
                    Form
                  </a>
                  <a href="#" className="dropdown-item">
                    Elements
                  </a>
                  <a href="#" className="dropdown-item">
                    Components
                  </a>
                  <a href="#" className="dropdown-item">
                    Layout
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
