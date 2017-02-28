import React                    from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'

import CommentsList
  from '../../presentational/Comments/CommentsList';

import * as commentsActions     from '../../../actions/Comments'

class CommentsListContainer extends React.Component {
  render() {
    const { removeComment }  = this.props.commentsActions;
    return <CommentsList comments={this.props.comments}
                         removeComment={removeComment} />;
  }
}

const mapStateToProps = (state) => {
  return { comments: state.comments };
};

const mapDispatchToProps = (dispatch) => ({
  commentsActions: bindActionCreators(commentsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListContainer);
