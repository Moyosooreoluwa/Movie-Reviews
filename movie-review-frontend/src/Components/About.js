import React from 'react';
import Container from 'react-bootstrap/Container';

export default function About() {
  return (
    <div>
      <div className="mb-3">
        <h2>About MovieReviews</h2>
      </div>
      <Container>
        <div className="form-border mt-5">
          I am Frontend Developer and also recently became very interested in
          movies. I figured I use two of my hobbies to make something and I
          thought of MovieReviews. This entire website is built from scratch
          with the MERN stack. (MongoDB, Express, Reactjs, and Nodejs). Anyone
          can view the website but only the admin(me) can upload and edit
          reviews. So, if you're ever looking for a movie to watch, feel free to
          visit this site to see my opinion on movies I have watched. If you're
          interested, my Github, which has all my projects(some private for
          security reasons) is at the top of the page. You can also find my
          email there if you wish to reach out. Enjoy.
        </div>
      </Container>
    </div>
  );
}
