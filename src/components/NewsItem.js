import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card">
                <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 1, textTransform:'{0%,-50%}' }}>
                    <span className="badge bg-danger rounded-pill">{source}</span>
                </div>
                <img 
                    src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} 
                    className="card-img-top" 
                    alt="News" 
                />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
                        </small>
                    </p>
                    <a 
                        rel="noreferrer" 
                        href={newsUrl} 
                        target="_blank" 
                        className="btn btn-sm btn-dark"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;