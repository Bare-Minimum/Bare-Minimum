class Popup extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.text}</h1>
        <button onClick={this.props.popup}>create trip</button>
      </div>
    );
  }
}

export default Popup;