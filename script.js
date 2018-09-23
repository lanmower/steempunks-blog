
  const {
    colors,
    createMuiTheme,
    CssBaseline,
    MuiThemeProvider,
    Typography,
    withStyles,
    Paper,
    CircularProgress
  } = window['material-ui'];
  const React = window.React;
  const steem = window.steem;
  const ReactDOM = window.ReactDOM;
  const reactMarkdown = window.reactMarkdown;
  const theme = createMuiTheme();
  const styles = theme => ({
    page: {
      maxWidth: '800px',
      marginLeft:"auto",
      marginRight:"auto",
      padding:"15px"
    }
  });
  const create = React.createElement;

  const iframe = (src, width="768px", height="432px")=>{
    return create(
        "iframe",
        { src, width, height,"frameborder":"0", "allowfullscreen":"true", "webkitallowfullscreen":"true", "mozallowfullscreen":"true"}
      )
 }
  class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {loading:true};
    }

    componentDidMount() {
      steem.api.getDiscussionsByAuthorBeforeDateAsync('steempunks-blog',null,new Date().toISOString().split('.')[0],1).then(
        (post)=>{this.setState({source: post[0].body, loading:false})}
      )
    }
    render() {
      const { classes } = this.props;
      const { open, loading } = this.state;
      if(loading) return create(CircularProgress);
      const card = create(
        Paper, {
          className:classes.page
        },
        create("center",
      {},
      [
      iframe("https://www.vimm.tv/@steempunks-live/embed"),
      iframe("https://titanembeds.com/embed/367741339393327104"),
      create(
        Typography,
        {
          variant:"subheading",
          gutterBottom:true
        },
        create(
          reactMarkdown, {
            source:this.state.source
          }
        )
      )
    ]
    ),
      )

      return create(
        MuiThemeProvider, {
          theme
        },
        [create(
          CssBaseline
        ),
        card]
      )
    }
  }
  const App = withStyles(styles)(Index);
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
