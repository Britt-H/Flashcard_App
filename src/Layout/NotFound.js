import React from "react";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
        </ol>
      </nav>
      <h1>Not Found</h1>
    </div>
  );
}

export default NotFound;
