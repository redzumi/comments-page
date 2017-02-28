import React                  from 'react';
import { UncontrolledAlert }  from 'reactstrap';
import {
  Button, Form,
  FormGroup,
  Label, Input,
  FormFeedback }              from 'reactstrap';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: { name: '', body: '' }, tooltips: {} };
  }

  handleValue = (event) => {
    let target = event.currentTarget;
    this.setState({ comment: {
      ...this.state.comment,
      [target.name]: target.value }
    });
  };

  handleComment = (event) => {
    event.preventDefault();

    if(this.props.form.processing)
      return;

    let comment = this.state.comment;

    if(this.validateComment(comment)) {
      this.props.addComment(comment);
      this.resetForm();
    }
  };

  //TODO better validation
  validateComment = (comment) => {
    if(comment.name.length < 3) {
      this.showTooltip('name', 'Минимальная длинна 3 символа');
      return false;
    }
    if(comment.body.length < 3) {
      this.showTooltip('body', 'Минимальная длинна 3 символа');
      return false;
    }
    return true;
  };

  showTooltip = (name, message) => {
    this.setState({ tooltips: { [name]: message } });
  };

  resetForm = () => {
    this.setState({ comment: { name: '', body: '' }, tooltips: {} });
  };

  showAlert = (result) => {
    if(!result) return null;
    return (
      <UncontrolledAlert color={(result.success) ? 'success' : 'danger'}>
        {(result.success)
          ? (<span><strong>Добавлено!</strong> Комментарий успешно добавлен.</span>)
          : (<span><strong>Упс!</strong>{` Ошибка: ${result.error}`}</span>) }
      </UncontrolledAlert>
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleComment}>
        {this.showAlert(this.props.form.result)}
        <FormGroup color={(this.state.tooltips.name) && 'danger'}>
          <Label>Ваше имя</Label>
          <Input type="text" name="name"
                 value={this.state.comment.name}
                 onChange={this.handleValue}/>
          <FormFeedback>{this.state.tooltips.name}</FormFeedback>
        </FormGroup>

        <FormGroup color={(this.state.tooltips.body) && 'danger'}>
          <Label>Комментарий</Label>
          <Input type="textarea" name="body"
                 value={this.state.comment.body}
                 onChange={this.handleValue}/>
          <FormFeedback>{this.state.tooltips.body}</FormFeedback>
        </FormGroup>

        <Button color="primary" {...{disabled: (this.props.form.processing)}}>
          {(this.props.form.processing) ? 'Обработка...' : 'Отправить'}
        </Button>
      </Form>
    )
  }
}

CommentForm.propTypes = {
  addComment:   React.PropTypes.func.isRequired
};
