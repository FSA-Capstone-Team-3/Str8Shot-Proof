import React from 'react';

const Welcome = () => {
  return (
    <>
      <section className="section">
        <h1 className="title" style={{ display: 'flex', alignItems: 'center' }}>
          Welcome to
          <img
            src="Str8shot-logo.svg"
            width={'150'}
            height={'auto'}
            style={{ marginLeft: '.25em' }}
          />
        </h1>
        <h2 className="subtitle">
          The site that connects you to people in NYC who share your subway
          lines.
        </h2>
      </section>
      <section className="section">
        <div className="columns ">
          <div className="column">
            <article className="message is-dark">
              <div className="message-body">
                On the My Stations page, select a line near you
              </div>
            </article>
          </div>
          <img
            className="screenshot column"
            src="screenshot-standin.png"
            width={'300'}
            heigh={'auto'}
          />
        </div>
      </section>
    </>
  );
};

export default Welcome;
