import React                    from 'react'

import CommentsListContainer
  from '../../containers/Comments/CommentsListContainer';
import CommentFormContainer
  from '../../containers/Comments/CommentFormContainer';

import './styles.css';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <CommentFormContainer />
        <CommentsListContainer />
      </div>
    );
  }
}

export default Home;
