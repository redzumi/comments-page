import React                  from 'react'

import './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}