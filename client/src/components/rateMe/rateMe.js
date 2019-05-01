import React, { Component } from 'react';
import './rateMe.css'
const baseShowImgUrl = "/show_img/"

class AddShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            show: false
        };
    }

    modalTrigger() {
        let show = this.state.show ? false : true;

        this.setState({
            show: show
        });
    }

    formOnSubmit(event) {
        event.preventDefault();   // prevent default form submit action

        fetch(`/api/newShow?title=${this.state.title}&description=${this.state.description}`)

        this.setState({
            title: "",
            description: "",
            show: false
        })

        this.props.componentDidMount();
    }

    titleOnChange(event) {
        this.setState({ title: event.target.value });
    }

    descripOnChange(event) {
        this.setState({ description: event.target.value });
    }

    render() {
        let modalClasses = `modal ${this.state.show ? "show" : ""}`;

        return (
            < div className="App-footer">
                <div className="footer-text" onClick={() => this.modalTrigger()}>+ Add More Shows</div>
                <div className={modalClasses}>
                    <div className="modal-background" onClick={() => this.modalTrigger()}></div>
                    <form onSubmit={(e) => this.formOnSubmit(e)} className="modal-form">
                        <div className="modal-close" onClick={() => this.modalTrigger()}>X</div>
                        <div>Title:<input type="text" onChange={(e) => this.titleOnChange(e)} required></input></div>
                        <div>Description:<textarea onChange={(e) => this.descripOnChange(e)} required></textarea></div>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div >
        )
    };
}

class RatingDetail extends React.Component {
    render() {
        let show = this.props.show;
        let one = show.one;
        let two = show.two;
        let three = show.three;
        let four = show.four;
        let five = show.five;

        let numRating = one + two + three + four + five;

        return (
            <div className="rating-detail">
                <div>
                    <div className="star-detail-icon">
                        <div className="rating-star star-full"></div>
                        <div className="star-detail-icon-text">5</div>
                        <div className="star-detail-bar" style={{ width: 72 * five / numRating + '%' }}>
                            <div className="star-detail-bar-num">{Math.round(100 * five / numRating * 100)/100 + '%'}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="star-detail-icon">
                        <div className="rating-star star-full"></div>
                        <div className="star-detail-icon-text">4</div>
                        <div className="star-detail-bar" style={{ width: 72 * four / numRating + '%' }}>
                            <div className="star-detail-bar-num">{Math.round(100 * four / numRating * 100)/100 + '%'}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="star-detail-icon">
                        <div className="rating-star star-full"></div>
                        <div className="star-detail-icon-text">3</div>
                        <div className="star-detail-bar" style={{ width: 72 * three / numRating + '%' }}>
                            <div className="star-detail-bar-num">{Math.round(100 * three / numRating * 100)/100 + '%'}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="star-detail-icon">
                        <div className="rating-star star-full"></div>
                        <div className="star-detail-icon-text">2</div>
                        <div className="star-detail-bar" style={{ width: 72 * two / numRating + '%' }}>
                            <div className="star-detail-bar-num">{Math.round(100 * two / numRating * 100)/100 + '%'}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="star-detail-icon">
                        <div className="rating-star star-full"></div>
                        <div className="star-detail-icon-text">1</div>
                        <div className="star-detail-bar" style={{ width: 72 * one / numRating + '%' }}>
                            <div className="star-detail-bar-num">{Math.round(100 * one / numRating * 100)/100 + '%'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Rating extends React.Component {
    render() {
        const stars = [];
        var wholeRating = Math.floor(this.props.rating);
        var decimalRating = this.props.rating % 1;
        var totalStar = 0;
        let starKey = 1;

        for (var i = 0; i < wholeRating; i++) {
            let show = { id: this.props.showId, rating: starKey };

            stars.push(
                <div
                    key={starKey}
                    className="rating-star star-full"
                    data-show={JSON.stringify(show)}
                    onClick={this.props.onClick}
                ></div>
            );

            starKey++;
            totalStar++;
        }

        if (decimalRating > 0.25) {
            let show = { id: this.props.showId, rating: starKey };
            let classes = `rating-star ${starKey === 5 ? "star-half" : "start-half-2"}`;

            stars.push(
                <div
                    key={starKey}
                    className={classes}
                    data-show={JSON.stringify(show)}
                    onClick={this.props.onClick}
                ></div>
            );

            starKey++;
            totalStar++;
        }

        for (totalStar; totalStar < 5; totalStar++) {
            let show = { id: this.props.showId, rating: starKey };

            stars.push(
                <div
                    key={starKey}
                    className="rating-star star-empty"
                    data-show={JSON.stringify(show)}
                    onClick={this.props.onClick}
                ></div>
            );

            starKey++;
        }

        return (
            <div className="rating-cont">
                {stars}
            </div>
        );
    };
}

class RateMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        };
    }

    componentDidMount() {
        fetch('/api/shows')
            .then(res => res.json())
            .then(shows => this.setState(
                { shows }
            ));
    }

    calcRating(show) {
        let one = show.one;
        let two = show.two;
        let three = show.three;
        let four = show.four;
        let five = show.five;

        let numRating = one + two + three + four + five;
        let totalRating = one + two * 2 + three * 3 + four * 4 + five * 5;

        if (numRating === 0) {
            return 0;
        } else {
            return totalRating / numRating;
        }
    }

    rateShow(e) {
        let show = JSON.parse(e.currentTarget.getAttribute("data-show"));

        fetch(`/api/rate?id=${show.id}&rating=${show.rating}`);

        this.componentDidMount();
    }

    render() {
        return (
            <div>
                <div className="App-body">
                    {
                        this.state.shows.map(show =>
                            <div key={show.id} className='show-cont'>
                                <h3 className="show-title">{show.title}</h3>
                                <div className="show-img-cont" tabIndex={show.id}>
                                    <img className="show-img" src={show.filename == null ? baseShowImgUrl + "no_image.png" : baseShowImgUrl + show.filename} alt={show.title}></img>
                                    <RatingDetail show={show}></RatingDetail>
                                    <div className="show-descrip">
                                        <p>{show.descrip}</p>
                                    </div>
                                </div>
                                <Rating showId={show.id} rating={this.calcRating(show)} onClick={(e) => this.rateShow(e)}></Rating>
                            </div>
                        )
                    }
                </div>

                <AddShow componentDidMount={() => this.componentDidMount()} />
            </div>

        );
    };
}

export default RateMe;