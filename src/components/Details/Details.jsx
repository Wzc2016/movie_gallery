import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Input, Segment, Menu } from 'semantic-ui-react'
import { DetailsView, imgBlock, allBlock, segment } from './Details.module.scss'
import { withRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
import Header from '../Header/Header'

const history = createHistory({forceRefresh:true});   


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      recommendations: [],
      similar: []
    };

    this.openDetails = this.openDetails.bind(this);
  }

  // open the details page
  openDetails(result, idx) {
    history.push(`/details/${idx}`)
  }

  componentDidMount() {
  	console.log(this.props)
  	// get the details for this movie
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=6ba336a703592bd0c40cebd0ee9528a8`
      )
      .then(res => {
      	console.log(res)
        this.setState({
          movie: res.data
        });
      });

    // get recommendations for the movie
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }/recommendations?api_key=6ba336a703592bd0c40cebd0ee9528a8`
      )
      .then(res => {
      	console.log(res)
        this.setState({
          recommendations: res.data.results
        });
      });

      //get similar movies
      axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }/similar?api_key=6ba336a703592bd0c40cebd0ee9528a8`
      )
      .then(res => {
      	console.log(res)
        this.setState({
          similar: res.data.results
        });
      });
  }

  render() {

  	var similarIMAGES = this.state.similar.map((result, idx) => {

  		if(result.poster_path) {
	  		var poster = 'http://image.tmdb.org/t/p/w92' + result.poster_path;
	  	} else {
	  		var poster = 'https://res.cloudinary.com/dxit5qwki/image/upload/v1552335256/1.png';
	  	}

		return (<div className={imgBlock} onClick={(e) => this.openDetails(result, result.id)}>
					<img src={poster}/>
					<br/>
					{result.title}
				</div>
			)
	});

  	if(this.state.recommendations) {

	var recommendationsIMAGES = this.state.recommendations.map((result, idx) => {

  		if(result.poster_path) {
	  		var poster = 'http://image.tmdb.org/t/p/w92' + result.poster_path;
	  	} else {
	  		var poster = 'https://res.cloudinary.com/dxit5qwki/image/upload/v1552335256/1.png';
	  	}

		return (<div className={imgBlock} onClick={(e) => this.openDetails(result, result.id)}>
					<img src={poster}/>
					<br/>
					{result.title}
				</div>
			)
	}); } else {
		var recommendationsIMAGES = (
			<h3>
				Sorry, there is no recommendations for this movie.
			</h3>
			)
	}


  	if(this.state.movie.poster_path) {
  		var poster = 'http://image.tmdb.org/t/p/w200' + this.state.movie.poster_path;
  	} else {
  		var poster = 'https://res.cloudinary.com/dxit5qwki/image/upload/v1552335256/1.png';
  	}

    return (
      <div className={ DetailsView }>

      <Header/>
        <div className="movie-detail">
          <img src = {poster}/>
          <h2>{this.state.movie.title}</h2>
          <p>{this.state.movie.release_date}</p>
          <p>Vote: {this.state.movie.vote_average}</p>
          <Segment className={segment} >
          <h3>
          Abstract
          </h3>
          <br/>
          {this.state.movie.overview}
          </Segment>
        </div>
        <br/>
        <div>
          <Link onClick={this.forceUpdate} to={process.env.PUBLIC_URL + `/details/${parseInt(this.props.match.params.id) - 1}`}>
				<Button>
		        	Prev
		        </Button>
		　</Link>
          <Link onClick={this.forceUpdate} to={process.env.PUBLIC_URL + `/details/${parseInt(this.props.match.params.id) + 1}`}>
				<Button>
		        	Next
		        </Button>
		　</Link>
		<h1>
			Similar Movies
		</h1>
		<div className={allBlock}>
		<h3>
		{function() {if (recommendationsIMAGES.length == 0) {
		 	return "Sorry, there is no similar movies for this movie."
		 } return "";}()}
		 </h3>
		 {similarIMAGES}
        </div>

        <h1>
			 Recommendations
		</h1>
		<div className={allBlock}>
		<h3>
		 {function() {if (recommendationsIMAGES.length == 0) {
		 	return "Sorry, there is no recommendations for this movie."
		 } return "";}()}
		 </h3>
		 {recommendationsIMAGES}
		 
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);