import React, { Component } from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

import GalleryView from './GalleryView/GalleryView'
import {Gallery as GalleryCss, GalleryHeader} from './Gallery.module.scss'


class Gallery extends Component {
	constructor() {
		super();

		this.state = {
			movie: {},
		};


		var apiKeyT = '6ba336a703592bd0c40cebd0ee9528a8';
		this.discoverUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKeyT + "&with_genres=";
		axios.get(this.discoverUrl).then((response) => {
					this.setState({
						movie: response.data
					});
					this.num += 1;
					// console.log(this.state.movie);
				}).catch((error) => {
					console.log(error);
				})
	}

	Action() {
		var discoverUrl = this.discoverUrl + '28';
		axios.get(discoverUrl).then((response) => {
				this.setState({
					movie: response.data
				});
			}).catch((error) => {
				console.log(error);
			})
	}

	Documentary() {
		var discoverUrl = this.discoverUrl + '16';
		axios.get(discoverUrl).then((response) => {
				this.setState({
					movie: response.data
				});
			}).catch((error) => {
				console.log(error);
			})
	}

	Drama() {
		var discoverUrl = this.discoverUrl + '18';
		axios.get(discoverUrl).then((response) => {
				this.setState({
					movie: response.data
				});
			}).catch((error) => {
				console.log(error);
			})
	}

	Romance() {
		var discoverUrl = this.discoverUrl + '10749';
		axios.get(discoverUrl).then((response) => {
				this.setState({
					movie: response.data
				});
			}).catch((error) => {
				console.log(error);
			})
	}

	Adventure() {
		var discoverUrl = this.discoverUrl + '12';
		axios.get(discoverUrl).then((response) => {
				this.setState({
					movie: response.data
				});
			}).catch((error) => {
				console.log(error);
			})
	}

	render() {
		if(this.state.movie === {}) {
			return null;
		}	


		
		return(
			<div className={GalleryCss}>
			<Header/>
	        	<h1 className={GalleryHeader}>Movie Gallery</h1>
				<Segment inverted>
			      <Button onClick={this.Action.bind(this)} basic inverted color='red'>
			        Action
			      </Button>
			      <Button onClick={this.Documentary.bind(this)} basic inverted color='orange'>
			        Documentary
			      </Button>
			      <Button onClick={this.Drama.bind(this)} basic inverted color='yellow'>
			        Drama
			      </Button>
			      <Button onClick={this.Romance.bind(this)} basic inverted color='grey'>
			        Romance
			      </Button>
			      <Button onClick={this.Adventure.bind(this)} basic inverted color='black'>
			        Adventure
			      </Button>
			    </Segment>
	        <GalleryView movie={this.state.movie}/>
	    	</div>
		);
	};
}

export default Gallery;