import React                from 'react';

import './styles.css';

export default class Comment extends React.PureComponent {
  render() {
    return (
      <div className="card comment-card">
        <div className="card-block">
          <h4 className="card-title">{this.props.comment.name}</h4>
          <p className="card-text">{this.props.comment.body}</p>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment:     React.PropTypes.object.isRequired
};
