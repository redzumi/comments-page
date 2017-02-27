import React                    from 'react'
import { connect }              from 'react-redux'

import CommentsList
  from '../../presentational/Comments/CommentsList';

class CommentsListContainer extends React.Component {
  render() {
    return <CommentsList comments={this.props.comments} />;
  }
}

const mapStateToProps = (state) => {
  return { comments: state.comments };
};

export default connect(mapStateToProps)(CommentsListContainer);
