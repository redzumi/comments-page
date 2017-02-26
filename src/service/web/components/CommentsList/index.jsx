import React                from 'react';

import Comment              from '../Comment';
import Pagination           from '../Pagination';

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

  render() {
    return (
      <div>
        { this.props.comments.slice(this.state.offset, this.state.limit)
          .map((comment) => {
            return <Comment comment={comment} key={comment.id}/>
          })
        }
        <Pagination showPage={this.showCommentsFromPage}
                    pages={this.props.comments.length / MAX_COMMENTS}/>
      </div>
    )
  }
}

CommentsList.propTypes = {
  comments:     React.PropTypes.array.isRequired
};
