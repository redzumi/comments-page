import React                from 'react';

import './styles.css';

export default class Comment extends React.Component {
  render() {
    const comment = this.props.comment;
    return (
      <div className="card comment-card">
        <div className="card-block">
          <h4 className="card-title">{comment.name}</h4>
          <p className="card-text">{comment.body}</p>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment:     React.PropTypes.object.isRequired
};
