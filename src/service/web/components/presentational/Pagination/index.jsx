import React                from 'react';
import {
  Pagination as RSPagination,
  PaginationItem,
  PaginationLink }          from 'reactstrap';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  updateCurrentPage = (event) => {
    event.preventDefault();

    let currentPage = event.currentTarget.dataset.index;
    this.setState({ currentPage: currentPage });

    this.props.showPage(currentPage);
  };

  createPages = (count) => {
    let pages = [];
    for(let i = 0; i <= count; i++) {
      pages.push(
        <PaginationItem {...{active: (i == this.state.currentPage)}}
            key={`page-index-${i}`}>
          <PaginationLink href="#" data-index={i}
                          onClick={this.updateCurrentPage}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  render() {
    return (
      <RSPagination>
        {this.createPages(this.props.pages)}
      </RSPagination>
    )
  }
}

Pagination.propTypes = {
  showPage:     React.PropTypes.func.isRequired,
  pages:        React.PropTypes.number.isRequired
};
