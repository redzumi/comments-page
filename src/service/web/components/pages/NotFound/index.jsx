import React                from 'react';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>Page not found</p>
      </div>
    )
  }

}
