import React                from 'react';

import Comment              from '../Comment';
import Pagination           from '../../Pagination';

const MAX_COMMENTS = 3;

export default class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0, limit: MAX_COMMENTS };
  }

  showCommentsFromPage = (page) => {
    let offset  = page * MAX_COMMENTS;
    let limit   = offset + MAX_COMMENTS;
    this.setState({ offset: offset, limit: limit });
  };

  renderComments = (comments) => {
    if(comments.length == 0)
      return <p>Тут пока ничего нет...</p>;
    return comments.map((comment) => {
        return <Comment comment={comment} key={comment.id}
                        removeComment={this.props.removeComment}/>
      })
  };

  render() {
    return (
      <div>
        { this.renderComments(this.props.comments.slice(this.state.offset, this.state.limit)) }
        <Pagination showPage={this.showCommentsFromPage}
                    pages={this.props.comments.length / MAX_COMMENTS}/>
      </div>
    )
  }
}

CommentsList.propTypes = {
  comments:     React.PropTypes.array.isRequired
};
