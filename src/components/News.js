import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize:5,
    category:"sports"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);

      this.capitalizeFirstLetter = (str)=> {
      return str[0].toUpperCase() + str.slice(1);
    }
    console.log("this is constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title=   `${this.capitalizeFirstLetter(this.props.category)}  - NewsMonkey`;

  }

  // componentDidMount = async () => {
  //   // console.log("cdm from news component");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a89b0b6992646039854183ea027f6a3&page=1&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   this.setState({loading:true});
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({ articles: parsedData.articles, loading: false,totalResults: parsedData.totalResults });
  // }

  // handlePreviousClick = async () => {
  //   console.log("Previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a89b0b6992646039854183ea027f6a3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   this.setState({loading:true});
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     loading: false,
  //     page: this.state.page - 1,
  //     totalResults: parsedData.totalResults

  //   });


  // }

  // handleNextClick = async () => {
    
  //       console.log("Next");
  //     this.setState({ loading: true });
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a89b0b6992646039854183ea027f6a3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     let data = await fetch(url);
  //     this.setState({loading:true});
  //     let parsedData = await data.json();
  //     console.log(parsedData);
  //     this.setState({
  //       articles: parsedData.articles,
  //       loading: false,
  //       page: this.state.page + 1,
  //       totalResults: parsedData.totalResults

  //     });

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=369a258f8094451e99168f59db242e7e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles || [], 
      loading: false, 
      totalResults: parsedData.totalResults 
    });
  }

  handlePreviousClick = async () => {
    console.log("Previous");
    this.setState({ page: this.state.page - 1 }, this.fetchNews);
  }

  handleNextClick = async () => {
    console.log("Next");
    this.setState({ page: this.state.page + 1 }, this.fetchNews);
  }

    


  render() {
    return (
      <div className="container my-2">

        <h1 className="text-center my-3" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines on from {this.capitalizeFirstLetter(this.props.category)} Category</h1>
        {this.state.loading && <Spinner />} 
        <div className="row" >
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className="col-md-4 my-3 " key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author = {element.author?element.author: "Unknown"} date = {element.publishedAt} source = {element.source.name} />
            </div>
          })}

        </div>
        <div className="d-flex justify-content-end">

          <button disabled={this.state.page <= 1} type="button " className="btn btn-dark my-3 mx-1" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark my-3 mx-1" onClick={this.handleNextClick}>Next &rarr;</button>
          {/* <div className="d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick = {this.handlePrevClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick = {this.handleNextClick}>Next &rarr;</button>
          </div> */}
        </div>
      </div>
    )
  }
}
