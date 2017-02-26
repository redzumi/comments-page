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
    let comments = [];
    for(let i = this.state.offset; i <= this.state.limit - 1; i++) {
      let comment = this.props.comments[i];
      if(!comment) break;
      comments.push(
        <Comment comment={comment} key={comment.id}/>
      );
    }
    return (
      <div>
        {(comments.length == 0)
          ? <p>Тут пока ничего нет...</p>
          : comments
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
