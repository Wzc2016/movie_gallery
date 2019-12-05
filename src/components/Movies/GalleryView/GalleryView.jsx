import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Label } from 'semantic-ui-react'
import { Button, Input, Segment } from 'semantic-ui-react'
import Gallery from 'react-grid-gallery';
import { GalleryView as GalleryViewCss, imgBlock, allBlock, modalBody, modalOverlay, prev, next, modalClose} from './GalleryView.module.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'

library.add(faTimes)

export class GalleryModal extends Component {
 render() {
  if (this.props.isOpen === false) {
   return null;
  }
 
  return(
   <div className={modalOverlay}>
    <div className={modalBody}>
     <a className={modalClose} href='#' onClick={this.props.onClick}><FontAwesomeIcon icon="times" /></a>
 	<h2>{this.props.title}</h2>
     <img src={this.props.src} />
     <div>
     	{this.props.overview}
     </div>
    </div>
    	<a className={prev} onClick={this.props.prev}>&#10094;</a>
    	<a className={next} onClick={this.props.next}>&#10095;</a>
   	</div>
  )
 }
}


class GalleryView extends Component {
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

	openDetails(result, idx) {
		this.props.history.push(`/details/${idx}`)
	}

	
	
render() {
	if(this.props.movie.page === undefined) {
		// console.log(1);
		return null;
	}
	// console.log(this.props);
	var IMAGES = this.props.movie.results.map((result, idx) => {
		return (<div className={imgBlock} onClick={(e) => this.openDetails(result, result.id)}>
					<img src={'http://image.tmdb.org/t/p/w185' + result.poster_path}/>
					<br/>
					Rating: {result.vote_average}
					<br/>

					{result.title}
				</div>
			)
	});

	return (
		<div className={allBlock}>
			{IMAGES}
			<GalleryModal title={this.state.title} overview={this.state.overview} isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} next={() => this.next(this.props.movie.results, this.state.idx)} prev={() => this.prev(this.props.movie.results, this.state.idx)}/> 
		</div>);
}
        

}

GalleryView.propTypes = {
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
};


GalleryModal.propTypes = {
	title: PropTypes.string,
	overview: PropTypes.string,
	isOpen: PropTypes.bool,
	onClick: PropTypes.func,
	src: PropTypes.string,
	next: PropTypes.func,
	prev: PropTypes.func,
}

export default withRouter(GalleryView);