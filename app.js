
      class App extends React.Component{

        constructor(props){
          super(props)

          this.state = {myUrls:[]};

          this.onSuccess = this.onSuccess.bind(this);
          this.refresh = this.refresh.bind(this);
      }


        onSuccess(response){
          console.log(response);
          let urls =[];
          for(var i=0; i<20; i++){
            var doc = response.response.docs[i];
            var url = doc.web_url;
            urls.push(url);
        }
          this.setState({myUrls: urls});

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

          return(
            <div>
              <Documents urls={this.state.myUrls}/>
            </div>
            );
           }
    }
/*
      function Document (props){

      return <p><a href={props.url} target="_blank">{props.url}</a></p>;

     }
*/
      function Documents (props){

        return (
          <div>
            {
            props.urls.map(
            (url, index) =><ArticlePreview key={index} url={url}/>
            )
            }
          </div>
        );


       /* return (
          <div>
            {
            props.urls.map(
            (url, index) =><Document key={index} url={url}/>
            )
            }

          </div>
             
        );*/
      }


      class ArticlePreview extends React.Component{

        constructor (props){
          super(props)

          this.state = {test: {}}

          this.setData = this.setData.bind(this)
     
          
      }

        setData(result){
          console.log(result);
           // debugger;
          this.setState({test: result});
          // debugger;
        }

        componentDidMount(){
          $.ajax({
            url: 'http://api.linkpreview.net/?key=123456&q=https://www.google.com',
            method:'GET',
            data: {
              'api-key': '5a8dbedf066865eae002fe395bc3c2796b36e4942be39'
            },
            success: this.setData

        })

        }

        render (){
          const tests = this.state.test;
          /*return(
         {
            "title":"Google",
            "description":"Search webpages, images, videos and more.",
            "image":"https:\/\/www.google.com\/images\/logo.png",
            "url":"https:\/\/www.google.com\/"
          }

          );*/
                             
          return(
            <div>
              <img src={tests.image}/>
              <p>{tests.title}</p>
              <p>{tests.description}</p>
            </div>
          );

      }

    }




      function find(){
        var date=document.getElementById("date").value;
        var sdate = date.split("-");
        var year = sdate[0];
        var month =Number(sdate[1]);

      ReactDOM.render(
      <App year={year} month={month}/>,
      document.getElementById('root')
      );
      }