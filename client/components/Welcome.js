import React from "react";

const Welcome = () => {
  return (
    <>
      <section className="section">
        <h1
          className="title is-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          Welcome to
          <img
            src="Str8shot-logo-cropped.svg"
            width={"350"}
            height={"auto"}
            style={{ marginLeft: ".25em" }}
          />
        </h1>
        <br />
        <h2 className="subtitle is-2">
          Connect with people in NYC who share your subway lines.
        </h2>
        <h2 className="subtitle is-2">Get started with the tips below.</h2>
      </section>

      <section className="section">
        <div className="columns ">
          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Tip 1</p>
              </header>
              <div className="card-content">
                <div className="content">
                  On the My Stations page, select a subway line near you.
                </div>
              </div>
              <div className="card-image">
                <figure className="image" id="figure">
                  <img
                    src="screenshot-standin.png"
                    alt="Placeholder image"
                    width="100"
                    height="auto"
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Tip 2</p>
              </header>
              <div className="card-content">
                <div className="content">
                  On the My Stations map, click your station on the selected subway line and
                  then click "Add Station." You can add as many stations, on as many
                  lines, as you'd like.
                </div>
              </div>
              <div className="card-image">
                <figure className="image" id="figure">
                  <img
                    src="screenshot-standin.png"
                    alt="Placeholder image"
                    width="100"
                    height="auto"
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Tip 3</p>
              </header>
              <div className="card-content">
                <div className="content">
                  Each of your stations will be indicated on the My Stations map with a
                  large green icon. To remove a station, select the green icon
                  and click "Remove Station."
                </div>
              </div>
              <div className="card-image">
                <figure className="image" id="figure">
                  <img
                    src="screenshot-standin.png"
                    alt="Placeholder image"
                    width="100"
                    height="auto"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>

        <div className="columns ">
          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Tip 4</p>
              </header>
              <div className="card-content">
                <div className="content">
                  On the Explore page, you will see a list of users that are on
                  one or more of your subway lines. For any user, select a line
                  and on the Explore map, you will see the subway path that
                  connects you to that user.
                </div>
              </div>
              <div className="card-image">
                <figure className="image" id="figure">
                  <img
                    src="screenshot-standin.png"
                    alt="Placeholder image"
                    width="100"
                    height="auto"
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Tip 5</p>
              </header>
              <div className="card-content">
                <div className="content">
                  The user's station on the line you select will be indicated on
                  the Explore map with an orange icon.
                </div>
              </div>
              <div className="card-image">
                <figure className="image" id="figure">
                  <img
                    src="screenshot-standin.png"
                    alt="Placeholder image"
                    width="100"
                    height="auto"
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Tip 6</p>
              </header>
              <div className="card-content">
                <div className="content">
                  Click "Request" to request to match with another user. Your
                  request will be "Pending" until the other user requests to
                  match with you. Once matched, users can email one another to
                  coordinate a plan to meet up!
                </div>
              </div>
              <div className="card-image">
                <figure className="image" id="figure">
                  <img
                    src="screenshot-standin.png"
                    alt="Placeholder image"
                    width="100"
                    height="auto"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;

