import React, { Component} from 'react';
import './MainSearcher.css';
class MainSearcher extends Component {
  render(){
    return (
      <div>
      <div className="navbar navbar-dark">
        <a href="https://" className="navbar-brand font-weight-bold menu-icon">Movies and Series </a>
      </div>
      <article>
        <section>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"></input>
            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
            <label className="form-check-label" for="inlineRadio1">Movies</label>
          </div>
          <div className="form-check form-check-inline pb-2">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
            <label className="form-check-label" for="inlineRadio2">Series</label>
          </div>
        </section>
      </article>

      </div>

    );
  }
}
export default MainSearcher;
