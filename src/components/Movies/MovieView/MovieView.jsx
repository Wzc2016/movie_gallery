import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Label } from 'semantic-ui-react'
import { Button, Input } from 'semantic-ui-react'

import { MovieView as MovieViewCss, MovieViewHeader, imgButton, titleButton} from './MovieView.module.scss'
import {GalleryModal} from '../GalleryView/GalleryView.jsx'
import {imgBlock, allBlock, modalBody, modalOverlay, prev, next, modalClose} from '../GalleryView/GalleryView.module.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'

library.add(faTimes)


class MovieView extends Component {

	constructor() {
		super();
		this.state = {
			showModal: false,
			url: '',
			idx: 0,
			overview: '',
			title: '',
		}
		this.openDetails = this.openDetails.bind(this);
	}


	// open the details page
	openDetails(result, idx) {
		this.props.history.push(`/details/${idx}`)
	}

	render() {
		// check if there are movies

			if(Object.entries(this.props.movie).length === 0
      && this.props.movie.constructor === Object) 
				return (<Card className={MovieViewCss}>
					<h3>No Match!</h3>
				</Card>);
			// console.log(this.props.movieContent);
			if((Object.values(this.props.movieContent).length) === 0) 
				return (<Card className={MovieViewCss}>
					<h3>No Match!</h3>
				</Card>);
			if(this.props.view === 'gallery') {
				const anotherView = Object.values(this.props.movieContent).map((result, idx) => {
			        console.log(result);
			        return (
			          <div>
				        <Button onClick={(e) => this.openDetails(result, result.id)} className={imgButton}>
		              		<img  src={function(){ if(result.poster_path) return 'http://image.tmdb.org/t/p/w185' + result.poster_path; else return 'https://res.cloudinary.com/dxit5qwki/image/upload/v1552335256/1.png'}()}/>
			          	</Button>
			          	<br/>
			          	<Button className={titleButton} key={idx} onClick={(e) => this.openDetails(result, idx)}>
				            {result.title}
				            <br/>
				            {"Vote Average : " + result.vote_average}
				        </Button>
			          </div>
			        )
			      });
				return (
				<Card className={MovieViewCss}>
					<br/>
					{anotherView}
				</Card>
			)
			}
			}	
	}


// the propTypes of the movie
MovieView.propTypes = {
	movie: PropTypes.shape({
  	page: PropTypes.number,
  	results: PropTypes.arrayOf(PropTypes.shape({
  		adult: PropTypes.bool,
  		backdrop_path: PropTypes.string,
  		genre_id: PropTypes.arrayOf(PropTypes.number),
  		id: PropTypes.number,
  		original_language: PropTypes.string,
  		original_title: PropTypes.string,
  		overview: PropTypes.string,
  		popularity: PropTypes.number,
  		poster_path: PropTypes.string,
  		release_date: PropTypes.string,
  		title: PropTypes.string,
  		video: PropTypes.bool,
  		vote_average: PropTypes.number,
  		vote_count: PropTypes.number,
  	})),
  	total_pages: PropTypes.number,
  	total_results: PropTypes.number,
  }),
	movieContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
		adult: PropTypes.bool,
  		backdrop_path: PropTypes.string,
  		belongs_to_collection: PropTypes.shape({
  			backdrop_path: PropTypes.string,
  			id: PropTypes.number,
  			name: PropTypes.string,
  			poster_path: PropTypes.string,
  		}),
  		budget: PropTypes.number,
  		genres: PropTypes.arrayOf(PropTypes.shape({
  			id: PropTypes.number,
  			name: PropTypes.string,
  		})),
  		homepage: PropTypes.string,
  		id: PropTypes.number,
  		imdb_id: PropTypes.string,
  		original_language: PropTypes.string,
  		original_title: PropTypes.string,
  		overview: PropTypes.string,
  		popularity: PropTypes.number,
  		poster_path: PropTypes.string,
  		production_companies: PropTypes.arrayOf(PropTypes.shape({
  			id: PropTypes.number,
  			logo_path: PropTypes.string,
  			name: PropTypes.string,
  			origin_country: PropTypes.string,
  		})),
  		production_countries: PropTypes.arrayOf(PropTypes.shape({
  			iso_3166_1: PropTypes.string,
  			name: PropTypes.string,
  		})),
  		release_date: PropTypes.string,
  		revenue: PropTypes.number,
  		runtime: PropTypes.number,
  		spoken_languages: PropTypes.arrayOf(PropTypes.shape({
  			iso_639_1: PropTypes.string,
  			name: PropTypes.string,
  		})),
  		status: PropTypes.string,
  		tagline: PropTypes.string,
  		title: PropTypes.string,
  		video: PropTypes.bool,
  		vote_average: PropTypes.number,
  		vote_count: PropTypes.number,
	})), PropTypes.object]),
	view: PropTypes.string,
};

export default withRouter(MovieView);