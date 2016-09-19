const React = require('react')
const Router = require('react-router')
const Image = require('./Image')
const {Link, browserHistory} = Router
 
const Gallery = React.createClass({

  getInitialState(){
    return {searchQuery: '', images: [], user_id: ''}
  },

  componentDidMount(){
    const url = 'http://localhost:5000/users/[????]'
    const request = new XMLHttpRequest()
    request.open( "GET", url )
    request.setRequestHeader('Content-Type', "application/json")
    request.withCredentials = true

    request.onload = () => {
      if (request.status === 200){
        const data = JSON.parse(request.responseText)
        const data2 = data.reverse()
        console.log(data2)
        this.setState({images: data2})
        }
        else{
          console.log("Oh dear, you ain't logged in")
          browserHistory.goBack()
        }
      }
      request.send( null )
  },

  doSearch(event){
    this.setState({searchQuery: event.target.value})
  },


// pu in nav after <link>

// 


  render(){

    return(
      <div className="user">
        <nav>
          <Link className="title" to='/'>Bookmarker</Link>
          <Link className="login" to='/home'>Login</Link>
          <input className="search-box" type='text' placeholder='search...' value={this.state.searchQuery} onChange={this.doSearch} />
        </nav>
        <div className='images-container'>
          
          {
            this.state.images.filter((image) => `${image.title} ${image.description}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
              .map((image) => (
              <Image { ...image } key={image.title} />
              ))


          }

        </div>
      </div>
      )
  }

})


module.exports = Gallery