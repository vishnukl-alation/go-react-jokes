class App extends React.Component {
  render() {
    return (<LoggedIn/>);
  }
}


class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
  }

  serverRequest() {
    $.get("/api/jokes", res => {
      this.setState({
        jokes: res
      });
    });
  }

  componentDidMount() {
    this.serverRequest();
  }

  render() {
    return (
      <div className="container">
        <div className="">
          <br/>
          <h2>Jokeish</h2>
          <p>Let's feed you with some funny Jokes!!!</p>
          <div className="row">
            {this.state.jokes.map(function (joke, i) {
              return (<Joke key={i} joke={joke}/>);
            })}
          </div>
        </div>
      </div>
    )
  }
}

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      joke: this.props.joke,
    };
    this.like = this.like.bind(this);
    this.sendLike = this.sendLike.bind(this);
    this.reloadJoke = this.reloadJoke.bind(this);
  }

  reloadJoke(jokeId) {
    $.get("/api/joke/" + jokeId,
      res => {
        this.setState({joke: res});
      }
    )
  }

  like() {
    let joke = this.props.joke;
    this.sendLike(joke);
  }

  sendLike(joke) {
    $.post("/api/jokes/like/" + joke.id,
      res => {
        this.setState({status: "Liked!"});
        this.reloadJoke(joke.id);
      }
    );
  }

  render() {
    return (
      <div className="col-12 col-lg-4">
        <div className="panel panel-default">
          <div className="panel-heading">#{this.state.joke.id}</div>
          <div className="panel-body">
            {this.state.joke.joke}
          </div>
          <div className="panel-footer">
            {this.state.joke.likes} Likes &nbsp;
            {
              this.state.status ?
                <a>
                  <span className="pull-right glyphicon glyphicon-heart" style={{'color': 'red'}}></span>
                </a> :

                <a onClick={this.like} className="btn btn-default">
                  <span className="glyphicon glyphicon-thumbs-up"></span>
                </a>
            }
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));