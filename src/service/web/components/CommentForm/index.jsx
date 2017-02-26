import React                from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: { name: '', body: '' }, tooltips: {} };
  }

  handleValue = (event) => {
    let target = event.currentTarget;
    this.setState({ comment: {
      ...this.state.comment,
      [target.dataset.key]: target.value }
    });
  };

  handleComment = () => {
    if(this.props.form.processing) return;

    let comment = this.state.comment;

    if(comment.name.length <= 3)
      return this.showTooltip('name', 'Слишком короткое имя');

    if(comment.body.length <= 3)
      return this.showTooltip('body', 'Слишком короткий комментарий');

    this.resetTooltips();

    this.props.addComment(comment);
    this.resetValues();
  };

  showTooltip = (type, message) => {
    this.setState({ tooltips: { [type]: message } });
  };

  resetTooltips = () => {
    this.setState({ tooltips: {} });
  };

  resetValues = () => {
    this.setState({ comment: { name: '', body: '' } });
  };

  showAlert = () => {
    const result = this.props.form.result;
    return (
      <div role="alert"
                className={`alert alert-${(result.success)
                  ? 'success'
                  : 'danger'}`}>
      {(result.success)
        ? (<span><strong>Добавлено!</strong> Комментарий успешно добавлен.</span>)
        : (<span><strong>Упс!</strong>{` Ошибка: ${result.error}`}</span>) }
    </div>
    );
  };

  render() {
    return (
      <div>
        { (this.props.form.result) && this.showAlert() }
        <div className={`form-group ${(this.state.tooltips.name) && 'has-danger'}`}>
          <label>Ваше имя</label>
          <input type="text" className="form-control" data-key="name"
                 value={this.state.comment.name}
                 onChange={this.handleValue} />
          <div className="form-control-feedback">{this.state.tooltips.name}</div>
        </div>
        <div className={`form-group ${(this.state.tooltips.body) && 'has-danger'}`}>
          <label>Комментарий</label>
          <textarea className="form-control" rows="3" data-key="body"
                    value={this.state.comment.body}
                    onChange={this.handleValue} />
          <div className="form-control-feedback">{this.state.tooltips.body}</div>
        </div>
        <button className={`btn btn-primary ${(this.props.form.processing) ? 'disabled' : ''}`}
                onClick={this.handleComment}>
          {(this.props.form.processing) ? 'Обработка...' : 'Добавить'}
          </button>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment:   React.PropTypes.func.isRequired
};
