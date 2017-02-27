import React                    from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'

import CommentForm
  from '../../presentational/Comments/CommentForm';

import * as commentsActions     from '../../../actions/Comments'

class CommentFormContainer extends React.Component {
  render() {
    const { addComment }  = this.props.commentsActions;
    return <CommentForm addComment={addComment} form={this.props.commentForm}/>;
  }
}

const mapStateToProps = (state) => {
  return { commentForm:   state.commentForm };
};

const mapDispatchToProps = (dispatch) => ({
  commentsActions: bindActionCreators(commentsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer);
