import React, { Component} from 'react';
import './MultimediaCard.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class MultimediaCard extends Component {
  constructor(props){
    super(props);
    this.state={
      showMovie : {},
    }

   this.searchOnlineMovie = this.searchOnlineMovie.bind(this);
   this.searchOnlineMovie();

  }

  searchOnlineMovie(){
    let promesa = fetch('http://www.omdbapi.com/?apikey=aaed1908&t='+this.props.Title);
    promesa.then(response => response.json()).then(data => {
      console.log(data);
      if(data.Response==='True'){
        this.setState({
           showMovie:data.Search
        });
      }
    });

    //console.log(this.state.showMovie);
  }


  render(){
    if(true){
    return(
        <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade"
             id={this.props.moviee.imdbID}  role="dialog" tabIndex="-1" >
          <div className="modal-dialog modal-md " role="document">
            <div className="modal-content">
              <div className="modal-body mb-0 p-6">
                  <div className="media">
                    <img src={this.showMovie.Poster} alt="" className="modal-poster align-self-center mr-3"></img>
                    <div className="media-body">
                      <h5 className="mt-3">{this.showMovie.Title}</h5>
                      <p className="mb-0">{this.showMovie.Year}</p>
                      <p className="mb-0">Rating : {this.showMovie.imdbRating}</p>
                      <Rater interactive={false} total={10} rating={this.showMovie.imdbRating} />
                      <div className="display-inline"><span className="badge badge-pill badge-primary">{this.showMovie.Genre}</span></div>
                      <p className="text-muted">{this.showMovie.Actors}</p>
                      <p className="mb-2 text-justify">{this.showMovie.Plot}</p>
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                <div><a href={this.showMovie.Poster} target="_blank">Download</a></div>
                <button className="btn btn-outline-primary btn-rounded btn-md ml-4 text-center" data-dismiss="modal" type="button">Close</button>
              </div>
            </div>
          </div>
        </div>
    );
  }else{
    return(<div>hola</div>);
  }
}
}
export default MultimediaCard;
