import React, { Component } from 'react'
import { Button, Input, Menu, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieView from './MovieView/MovieView'
import Header from '../Header/Header'
import {Movie as MovieCss, MovieHeader, LeftButton, RightButton} from './Movie.module.scss'

class Movies extends Component {
	// const flag = 1
	
	constructor() {
		super();

		this.state = {
			value: '',
			movieContent: {},
			view: 'gallery',
			order: 'ascending',
			sortType: 'title',
			movie: ''
		};

		var apiKeyT = '6ba336a703592bd0c40cebd0ee9528a8';
		this.searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyT + "&query=";
		this.contentUrl = 'https://api.themoviedb.org/3/movie/';

	}

	// handle the click event
	componentDidMount() {
		const keyword = this.props.match.params.keyword;
		// console.log(keyword)
		if(keyword.length === 0) {
			this.setState({movie: {}});
			return;
		}

		let searchUrl = `${this.searchUrl}${keyword}`;

			axios.get(searchUrl).then((response) => {
				this.setState({
					movie: response.data
				});
				
			}).catch((error) => {
				console.log(error);
			}).then(async () => {

				const contentUrls = await this.state.movie.results.map((result) => {
					return (`${this.contentUrl}` + result.id + '?api_key=6ba336a703592bd0c40cebd0ee9528a8')
				});
				function axiosTest(url) {
				  return axios.get(url).then(response => {
				    return response.data
				  })
				}

				let contentMap =  await contentUrls.map((url, idx) => {
					return axiosTest(url);
				});

				await Promise.all(contentMap).then((results) => {
					this.setState({
						movieContent: results
					})

				}).then(this.titleSortClickHandler.bind(this))
			
			});
	}


	// navigate to the gallery view page
	galleryViewClickHandler(e) {
		this.setState({ view: 'gallery'});
	}

	// sort by the title
	titleSortClickHandler() {
		const myData = [].concat(Object.values(this.state.movieContent))
		    .sort((a, b) => {
		    if (a.title < b.title && this.state.order === 'descending') //sort string ascending
			  return -1;
			 if (a.title > b.title && this.state.order === 'descending')
			  return 1;
			if (a.title < b.title && this.state.order === 'ascending') //sort string ascending
			  return 1;
			 if (a.title > b.title && this.state.order === 'ascending')
			  return -1;});
		this.setState({
			movieContent: myData,
			sortType: 'title'
		})
	}

	// the handler of the sort based on ranking 
	rankingSortClickHandler() {
		const myData = [].concat(Object.values(this.state.movieContent))
		    .sort((a, b) => {
		    	if(this.state.order === 'descending') return b.vote_average - a.vote_average;
				else return a.vote_average - b.vote_average;
			})
		// console.log(myData);
		this.setState({
			movieContent: myData,
			sortType: 'ranking'
		})
	}

	// the handler of sort in ascending order
	ascendingSortClickHandler() {
		(async () => {
			await this.setState({
				order: 'ascending'
			})
			console.log(this.state.order);
			if(this.state.sortType === 'title'){
				this.titleSortClickHandler();
			} else {
				this.rankingSortClickHandler();
			}
		})();
	}

	// the handler of sort in descending order
	descendingSortClickHandler(e) {
		(async () => {
			await this.setState({
				order: 'descending'
			})
			console.log(this.state.order);
			if(this.state.sortType === 'title'){
				this.titleSortClickHandler();
			} else {
				this.rankingSortClickHandler();
			}
		})();
		
	}

	render() {
		// console.log(this.state.movieContent);
		return (

			<div className={MovieCss}>
			<Header/>

	        <h1 className={MovieHeader}>Search Results</h1>

			<Button.Group className={LeftButton} size='large'>
				<Button onClick={this.titleSortClickHandler.bind(this)}>Sort by Title</Button>
				<Button.Or />
				<Button onClick={this.rankingSortClickHandler.bind(this)}>Sort by Ranking</Button>
			</Button.Group>
			<Button.Group className={RightButton} size='large'>
				<Button onClick={this.ascendingSortClickHandler.bind(this)}>Ascending</Button>
				<Button.Or />
				<Button onClick={this.descendingSortClickHandler.bind(this)}>Descending</Button>
			</Button.Group>
	        <MovieView view={this.state.view} movie={this.state.movie} movieContent={this.state.movieContent}/>
	      </div>
		);
	};
}	

export default Movies;