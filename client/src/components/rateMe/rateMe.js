/**
 * Author: Youwei Yang
 * Description: The component for rate-me site, where the user can add, rate, and
 *              view the rating for anime series and movies
 */
import React, { Component } from 'react';
import './rateMe.css'
const baseShowImgUrl = "/show_img/"

/**
 * Component for adding new show
 */
class AddShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            showType: "series",
            show: false
        };
    }

    /**
     * show or hide the modal
     */
    modalTrigger() {
        let show = this.state.show ? false : true;
        this.setState({
            show: show
        });
    }

    /**
     * submit the new show to be added to the database
     */
    formOnSubmit(event) {
        event.preventDefault();   // prevent default form submit action

        fetch(`/api/newShow?title=${this.state.title}&description=${this.state.description}&showType=${this.state.showType}`)

        this.setState({
            title: "",
            description: "",
            show: false
        })

        this.props.componentDidMount();
    }

    /**
     * handles the on change for title text input
     */
    titleOnChange(event) {
        this.setState({ title: event.target.value });
    }

    /**
     * handles the on change for the description text area
     */
    descripOnChange(event) {
        this.setState({ description: event.target.value });
    }

    /**
     * handles on click for show type toggle
     */
    changeShowType() {
        let showType = this.state.showType === "series" ? "movie" : "series";

        this.setState({
            showType: showType
        })
    }

    /**
     * render the add show component
     */
    render() {
        let modalClasses = `modal ${this.state.show ? "show" : ""}`;
        let toggleCircleClasses = "toggle-circle";
        let seriesTextClasses;
        let movieTextClasses;
        if (this.state.showType === "series") {
            seriesTextClasses = "active";
        } else {
            toggleCircleClasses += " right";
            movieTextClasses = "active";
        }

        return (
            < div className="show-cont">
                <div className="add-show-text" onClick={() => this.modalTrigger()}>+</div>
                <div className={modalClasses}>
                    <form onSubmit={(e) => this.formOnSubmit(e)} className="modal-form">
                        <div className="modal-close" onClick={() => this.modalTrigger()}>X</div>
                        <div>Title:<input type="text" onChange={(e) => this.titleOnChange(e)} required></input></div>
                        <div>Description:<textarea onChange={(e) => this.descripOnChange(e)} required></textarea></div>
                        <div className="toggle-cont">
                            <span className={seriesTextClasses}>series</span>
                            <div className="toggle">
                                <div className={toggleCircleClasses} onClick={() => this.changeShowType()}></div>
                            </div>
                            <span className={movieTextClasses}>movie</span>
                        </div>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div >
        )
    };
}

/**
 * Componet for showing more detai ratings
 */
class RatingDetail extends React.Component {
    /**
     * render the rating detail component
     */
    render() {
        let show = this.props.show;
        let votes = [show.one, show.two, show.three, show.four, show.five];
        let numRating = 0;
        let textCount = 1;
        const starDetail = [];
        for (var i in votes) {
            numRating += votes[i];
        }

        for (var j in votes) {
            starDetail.push(
                <div key={textCount}>
                    <div className="star-detail-icon">
                        <div className="rating-star star-full"></div>
                        <div className="star-detail-icon-text">{textCount}</div>
                        <div className="star-detail-bar" style={{ width: (72 * votes[j] / numRating) + '%' }}></div>
                        <div className="star-detail-bar-num">{votes[j] + ` vote${votes[j] > 1? "s" : ""}`}</div>
                    </div>
                </div>
            );
            textCount++;
        }

        return (
            <div className="rating-detail">
                {starDetail}
            </div>
        );
    }
}

/**
 * Component for rating a show
 */
class Rating extends React.Component {
    /**
     * render the rating component
     */
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

/**
 * Component for the rate-me web app
 */
class RateMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOrder: "ASC",
            showType: "all",
            shows: []
        };
    }

    /**
     * fetch the shows from the database when component mounted
     */
    componentDidMount() {
        fetch(`/api/shows?showType=${this.state.showType}&showOrder=${this.state.showOrder}`)
            .then(res => res.json())
            .then(shows => this.setState(
                { shows }
            ));
    }

    /**
     * fetch the shows from the database when component was updated
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.shows !== this.state.shows) {
            fetch(`/api/shows?showType=${this.state.showType}&showOrder=${this.state.showOrder}`)
                .then(res => res.json())
                .then(shows => this.setState(
                    { shows }
                ));
        }
    }

    /**
     * calculate the rating of a show
     * @param {*} show the show object which to be calculated
     */
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

    /**
     * handles the on click on the star icons when rating a show
     */
    rateShow(e) {
        let show = JSON.parse(e.currentTarget.getAttribute("data-show"));

        fetch(`/api/rate?id=${show.id}&rating=${show.rating}`);
    }

    /**
     * handles the on click for show order filter
     */
    changeShowOrder() {
        let showOrder = this.state.showOrder === "ASC" ? "DESC" : "ASC";

        this.setState({
            showOrder: showOrder
        })
    }

    /**
     * handles the on click for show type filter
     */
    selectType(type) {
        this.setState({
            showType: type
        });
    }

    /**
     * render the rateMe component
     */
    render() {
        let showType = this.state.showType;
        let toggleCircleClasses = "toggle-circle";
        let ascTextClasses;
        let descTextClasses;
        if (this.state.showOrder === "ASC") {
            ascTextClasses = "active";
        } else {
            toggleCircleClasses += " right";
            descTextClasses = "active";
        }

        return (
            <div>
                <div className="App-header">
                    <div className="toggle-cont">
                        <span className={ascTextClasses}>ASC</span>
                        <div className="toggle">
                            <div className={toggleCircleClasses} onClick={() => this.changeShowOrder()}></div>
                        </div>
                        <span className={descTextClasses}>DESC</span>
                    </div>
                    <ul className="type-filter-cont">
                        <li className="selected">{showType}</li>
                        <li onClick={() => this.selectType("series")}>series</li>
                        <li onClick={() => this.selectType("movie")}>movie</li>
                        <li onClick={() => this.selectType("all")}>all</li>
                    </ul>
                </div>

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

                    <AddShow componentDidMount={() => this.componentDidMount()} />
                </div>
            </div>
        );
    };
}

export default RateMe;