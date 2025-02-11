import React, { Component } from 'react'

export default class NewsItem extends Component {


  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
    return (
      <>
        <div>
          <div className="card" style ={{position:'relative'}} >
          <span className="position-absolute  top-0 end-0  badge rounded-pill bg-danger" style={{zIndex:1, transform:'translate(0%,-50%)'}}>{source}</span>
            <img src={imageUrl ? imageUrl : "https://www.mlive.com/resizer/v2/MSVB4J62L5FY7JF5HUCV66T5F4.PNG?auth=66f39ea2b5bdcab109fd80c34ae63c8dbfbe7b48cd70b2c54b316aa7ff84965c&width=1280&quality=90"} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title"> {title}... </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>  {/* btn-sm is used to make the button small */}
            </div>
          </div>
        </div>
      </>
    )
  }
}
