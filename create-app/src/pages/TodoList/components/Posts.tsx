import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Posts extends Component<{ posts: any[] }> {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  };
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) => (
          <li key={i}> {post.title} </li>
        ))}
      </ul>
    );
  }
}

// Posts.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
