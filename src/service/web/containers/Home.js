import React                    from 'react'
import { bindActionCreators }   from 'redux'
import { connect }              from 'react-redux'

import CommentsList             from '../components/CommentsList';
import CommentForm              from '../components/CommentForm';

import * as commentsActions     from '../actions/Comments'

class Home extends React.Component {
  render() {
    const { addComment }  = this.props.commentsActions;
    return (
      <div>
        <CommentForm addComment={addComment} form={this.props.commentForm}/>
        <hr/>
        <CommentsList comments={this.props.comments} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    commentForm:   state.commentForm
  };
};

const mapDispatchToProps = (dispatch) => ({
  commentsActions: bindActionCreators(commentsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
