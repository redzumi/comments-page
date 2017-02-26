import React                from 'react';

import './styles.css';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  updateCurrentPage = (event) => {
    let currentPage = event.currentTarget.dataset.index;
    this.setState({ currentPage: currentPage });
    this.props.showPage(currentPage);
  };

  render() {
    let pages = [];
    for(let i = 0; i <= this.props.pages; i++) {
      pages.push(
        <li className={`page-item ${(i == this.state.currentPage) ? 'active' : ''}`}
            key={`page-index-${i}`} data-index={i}
            onClick={this.updateCurrentPage}>
          <span className="page-link">{i + 1}</span>
        </li>
      );
    }
    return (
      <ul className="pagination">
        {pages}
      </ul>
    )
  }
}

Pagination.propTypes = {
  showPage:     React.PropTypes.func.isRequired,
  pages:        React.PropTypes.number.isRequired
};
