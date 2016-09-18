"use strict";

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "div",
      { className: "header" },
      React.createElement("img", { src: "https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg", alt: "learn to code javascript at Free Code Camp logo", "class": "img-responsive" })
    );
  }
});

var Footer = React.createClass({
  displayName: "Footer",

  render: function render() {
    return React.createElement(
      "div",
      { className: "footer" },
      React.createElement(
        "span",
        null,
        "Copyrights © 2016 "
      ),
      React.createElement(
        "span",
        null,
        " ",
        React.createElement(
          "a",
          { href: "https://twitter.com/premp_singh" },
          "By Prem Singh"
        )
      )
    );
  }
});

var recentUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var allTimeUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
var userProfile = "https://www.freecodecamp.com/";
var Leaderboard = React.createClass({
  displayName: "Leaderboard",

  getInitialState: function getInitialState() {
    return {
      List: []
    };
  },
  handleRecent: function handleRecent() {
    var that = this;
    $.getJSON(recentUrl, function (data) {
      that.setState({
        List: data
      });
    });

    var recent = document.getElementById('sortAll');
    recent.innerHTML = "All Time Points";
    var recent = document.getElementById('sortRecent');
    recent.innerHTML = "Points in Past 30 Days  <i class='fa fa-sort-amount-desc' aria-hidden='true'></i>";
  },
  handleAllTime: function handleAllTime() {
    var that = this;
    $.getJSON(allTimeUrl, function (data) {
      that.setState({
        List: data
      });
    });

    var recent = document.getElementById('sortRecent');
    recent.innerHTML = "Points in Past 30 Days";
    var recent = document.getElementById('sortAll');
    recent.innerHTML = "All Time Points  <i class='fa fa-sort-amount-desc' aria-hidden='true'></i>";
  },
  componentDidMount: function componentDidMount() {
    this.handleRecent();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "table-responsive" },
        React.createElement(
          "table",
          { className: "table table-bordered" },
          React.createElement(
            "caption",
            null,
            "Freecodecamp Leaderboard"
          ),
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "#"
              ),
              React.createElement(
                "th",
                null,
                "Camper Name"
              ),
              React.createElement(
                "th",
                { id: "sortRecent", onClick: this.handleRecent },
                "Points in Past 30 Days"
              ),
              React.createElement(
                "th",
                { id: "sortAll", onClick: this.handleAllTime },
                "All Time Points"
              )
            )
          ),
          React.createElement(ListTable, { data: this.state.List })
        )
      )
    );
  }
});

var ListTable = React.createClass({
  displayName: "ListTable",

  render: function render() {
    var html;

    {
      html = this.props.data.map(function (item, index) {
        return React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            index + 1
          ),
          React.createElement(
            "td",
            { className: "intro" },
            React.createElement("img", { className: "img-responsive", src: item.img, alt: "avatar" }),
            React.createElement(
              "a",
              { href: userProfile + item.username },
              React.createElement(
                "span",
                null,
                item.username
              )
            )
          ),
          React.createElement(
            "td",
            { className: "recent" },
            item.recent
          ),
          React.createElement(
            "td",
            { className: "alltime" },
            item.alltime
          )
        );
      });
    }
    return React.createElement(
      "tbody",
      null,
      html
    );
  }
});

var App = React.createClass({
  displayName: "App",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Header, null),
      React.createElement(Leaderboard, null),
      React.createElement(Footer, null)
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));