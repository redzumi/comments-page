import React                from 'react';
import {
  Card,
  CardTitle, Button,
  CardText, CardBlock }     from 'reactstrap';

import './styles.css';

export default class Comment extends React.PureComponent {

  removeComment = () => this.props.removeComment(this.props.comment);

  render() {
    return (
      <Card className="comment-card">
        <CardBlock>
          <CardTitle>{this.props.comment.name}</CardTitle>
          <CardText>{this.props.comment.body}</CardText>
          {
            (this.props.comment.canRemove) && (
              <Button size="sm" outline color="danger"
                      onClick={this.removeComment}>Удалить</Button>
            )
          }
        </CardBlock>
      </Card>
    )
  }
}

Comment.propTypes = {
  comment:     React.PropTypes.object.isRequired
};
