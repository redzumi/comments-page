import React                from 'react';
import {
  Card, CardTitle,
  CardText, CardBlock }     from 'reactstrap';

import './styles.css';

export default class Comment extends React.PureComponent {
  render() {
    return (
      <Card className="comment-card">
        <CardBlock>
          <CardTitle>{this.props.comment.name}</CardTitle>
          <CardText>{this.props.comment.body}</CardText>
        </CardBlock>
      </Card>
    )
  }
}

Comment.propTypes = {
  comment:     React.PropTypes.object.isRequired
};
