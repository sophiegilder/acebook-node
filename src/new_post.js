"use strict";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: "",
      body: {posts: []}
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    this.fetchData()
    console.log(this.state)
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  fetchData() {
    fetch(`/posts/getposts`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        body: responseJson
    });
  });
  }

  handleSubmit(event) {
    console.log('This confirms a new post has been added:' + this.state.value);
    event.preventDefault();
    fetch('/posts', {
       method: "POST",
       headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(this.state),
    });
    this.setState({value: ""})
    this.fetchData();
    console.log(this.state.body.posts)
  }

  render() {
    return (
      <div class="all-posts">
        <form onSubmit={this.handleSubmit}>
          <textarea rows="4" cols="50" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="New Post" />
        </form>
      </div>
    );
  }
}


