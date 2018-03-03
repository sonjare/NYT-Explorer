class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {myUrls:[], myDocs: [], theSelectedArticle: null};
    this.onSuccess = this.onSuccess.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
  }

  handleArticleClick(theNewSelectedArticle){
    this.setState({theSelectedArticle: theNewSelectedArticle})
  }

  onSuccess(response){
    console.log(response);
    let urls =[];
    let docs = [];
    for(var i=0; i<20; i++){
      var doc = response.response.docs[i];
      var url = doc.web_url;
      urls.push(url);
      docs.push(doc);
    }
    this.setState({myUrls: urls, myDocs: docs});
  }

  refresh(newProps){
    $.ajax({
      url: 'https://api.nytimes.com/svc/archive/v1/'+newProps.year+"/"+newProps.month+'.json',
      method: 'GET',
      data: {
          'api-key': "9b98b8d3102b4c98b7c14e81de2e368e"
      },
      success: this.onSuccess
    });
  }

  componentDidMount(){
    $.ajax({
      url: 'https://api.nytimes.com/svc/archive/v1/'+this.props.year+"/"+this.props.month+'.json',
      method: 'GET',
      data: {
          'api-key': "9b98b8d3102b4c98b7c14e81de2e368e"
      },
      success: this.onSuccess
    });
  }

  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps)
  }

  render(){
    return (
      <div className="page">
        <div className="master"><Documents
          selectionHandler={this.handleArticleClick}
          urls={this.state.myUrls} docs={this.state.myDocs}/></div>
        <div className="details"><ArticleDetails theDoc={this.state.theSelectedArticle}/></div>
      </div>
    );
  }
}

function ArticleDetails(props){
  if(!props.theDoc) {
    return "Nothing to display."
  }
  return (
    <div>
      <h4>Article Details: </h4>
      <ul>
        <li><b>Source:</b> {props.theDoc.source}</li>
        <li><b>Snippet:</b> {props.theDoc.snippet}</li>
        <li><b>Word Count:</b>{props.theDoc.word_count}</li>
        <li><b>Published Date:</b> {props.theDoc.pub_date}</li>
      </ul>
    </div>
  );
}

class Documents extends React.Component{
  render() {
    const det = (
      <div className="articlediv">
        {
          this.props.docs.map((doc, index) =>
          <ArticlePreview 
            key={index} 
            url={doc.web_url}
            doc={doc}
            clickHandler={this.props.selectionHandler}/>
          )
        }
      </div>
    );
    return det;
  }
}

class ArticlePreview extends React.Component{
  constructor (props){
    super(props)
    this.state = {test: {}}
    this.setData = this.setData.bind(this)
    this.onRealClick = this.onRealClick.bind(this)
  }
  onRealClick(){
    this.props.clickHandler(this.props.doc)
  }
  setData(result){
    // console.log(result);
    this.setState({test: result});
  }
  componentDidMount(){
    $.ajax({
      url: 'https://api.linkpreview.net/?key=5a8dbedf066865eae002fe395bc3c2796b36e4942be39&q=' + this.props.url,
      method:'GET',
      // data: {
      //   'api-key': '5a8dbedf066865eae002fe395bc3c2796b36e4942be39'
      // },
      success: this.setData
    })
  }
  render (){
    const tests = this.state.test;                
    return(
      <div className="article" onClick={this.onRealClick}>
        <div>
          <img src={tests.image} />
          <h3>{tests.title}</h3>
          <p>{tests.description}</p>
        </div>
      </div>
    );
  }
}


function find(){
  var month = Number(document.getElementById("month").value);
  var year = document.getElementById("year").value;
  ReactDOM.render( <App year={year} month={month}/>, document.getElementById('root'));
}








    // <h4>{props.theDoc.web_url}</h4>
  