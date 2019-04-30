import React, { Component} from 'react';
import './Navigation.css';
import movies from '../../movies.json';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class Navigation extends Component {
  constructor(){
    super();
    this.state = {
      search : ' some',
      showMovies : [],
      movieInfo :[],
      contentType : 'Movie',
      movies
    }
    this.setType = this.setType.bind(this);
    this.searchEvent = this.searchEvent.bind(this);
    this.searchMovieInformation=this.searchMovieInformation.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
  }
  setType(e){
    let type=(e.currentTarget.value);
    this.setState({
       contentType:type
    });
  }

  searchEvent(e){
   document.getElementById("home").style.padding = "5px";



    const {name,value} = e.target;
    this.setState({
      [name]:value
    });


    let temporal = this.state.movies.movie;
    let tempBusqueda= this.state.search;

    console.log(tempBusqueda);
    let newMovies = temporal.filter(function (movie) {
    return movie.Title.toUpperCase().includes(tempBusqueda.toUpperCase())
    });

    //console.log(newMovies);
    //console.log('sending..');
    //console.log(this.state);
    this.searchOnlineMovies(tempBusqueda);
      // this.setState({
      //    showMovies:newMovies
      // });

  }
  submitEvent(e){
    e.preventDefault();

    let temporal = this.state.movies.movie;
    let tempBusqueda= this.state.search;
    console.log(tempBusqueda);
    let newMovies = temporal.filter(function (movie) {
    return movie.Title.toUpperCase().includes(tempBusqueda.toUpperCase())
    });

    //console.log(newMovies);
    //console.log('sending..');
    //console.log(this.state);
    this.searchOnlineMovies(tempBusqueda);
      // this.setState({
      //    showMovies:newMovies
      // });
  }

  searchOnlineMovies(search){
    let promesa = fetch('https://www.omdbapi.com/?page=12&apikey=aaed1908&s='+search+'&type='+this.state.contentType);
    promesa.then(response => response.json()).then(data => {
    //  console.log(data);
      if(data.Response==='True'){
        this.setState({
           showMovies:data.Search
        });
      }
    });

  //  console.log(this.state.showMovies);
  }

  searchMovieInformation(e){
    let title = e.target.offsetParent.title;

    //console.log(e.target.offsetParent.title);
    let promesa = fetch('https://www.omdbapi.com/?apikey=aaed1908&t='+title);
    promesa.then(response => response.json()).then(data => {
      console.log(data);

        this.setState({
           movieInfo:data
        });

    });

   console.log(this.state.movieInfo);
  }


  render(){

    return (
      <div>
        <nav id="home" className="custom-nav navbar navbar-dark home ">
            <a href="https://" className="navbar-brand font-weight-bold menu-icon">Movies and Series </a>
            <form name="formulario" className="form-inline" onSubmit={this.submitEvent}>
              <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                  </div>
                  <input name="search" type="text" className="form-control mr-sm-2" placeholder="Search"
                    aria-label="Search" onInput={this.searchEvent}></input>
                </div>
            </form>
        </nav>
        <div className="row custom-nav">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio"
                name="inlineRadioOptions" id="inlineRadio1" value="movie"
                 onChange={this.setType}></input>
              <label className="form-check-label" htmlFor="inlineRadio1">Movies</label>
            </div>
            <div className="form-check form-check-inline pb-2">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="series"
                onChange={this.setType}></input>
              <label className="form-check-label" htmlFor="inlineRadio2">Series</label>
            </div>
          </div>
        </div>

        <div className="container">
          <h5 className="text-left pl-2">{this.state.showMovies.length}  results for 'busqueda' </h5>
          <div className="container pt-2">
            <div className="card-deck ">
              {

                this.state.showMovies.map((movie,i)=>{
                 return(

                     <div key={movie.imdbID} title={movie.Title} className="col-md-3 poster" onClick={this.searchMovieInformation}>
                       <a href="#" data-target={'#'+movie.imdbID} data-toggle="modal" className="color-gray-darker c6 td-hover-none">
                       <img src={movie.Poster} className="card-img-top poster " alt="..."></img>
                       <div className="card-body">
                         <h6 className="card-title">{movie.Title}</h6>
                         <p className="card-text"><small className="text-muted">{movie.Year}</small></p>
                       </div>
                       </a>
                       <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade" id={movie.imdbID}  role="dialog" tabIndex="-1">
                         <div className="modal-dialog modal-md " role="document">
                           <div className="modal-content">
                             <div className="modal-body mb-0 p-6">
                                 <div className="media">
                                   <img src={movie.Poster} alt="" className="modal-poster align-self-center mr-3"></img>
                                   <div className="media-body">
                                     <h5 className="mt-3">{movie.Title}</h5>
                                     <p className="mb-0">{movie.Year}</p>
                                     <p className="mb-0">Rating : {this.state.movieInfo.imdbRating}</p>
                                     <Rater interactive={false} total={10} rating={this.state.movieInfo.imdbRating} />
                                     <div className="display-inline"><span className="badge badge-pill badge-primary">{this.state.movieInfo.Genre}</span></div>
                                     <p className="text-muted">{this.state.movieInfo.Actors}</p>
                                     <p className="mb-2 text-justify">{this.state.movieInfo.Plot}</p>
                                   </div>
                                 </div>
                             </div>
                             <div className="modal-footer">
                               <button className="btn btn-outline-primary btn-rounded btn-md ml-4 text-center" data-dismiss="modal" type="button">Close</button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                 )
               })
              }
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Navigation;
