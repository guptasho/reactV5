import React from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            active: 0
        }
    }

    static getDerivedStateFromProps({media}) {
        let photos = ['http://placecorgi.com/600/600'];
        if(media.length) {
            photos = media.map(({large})=> large);
        }
        return {photos};
    }
    
    //  instead of binding this to event methods .bind(this) make event handlers 
    //  as arrow function as they dont have their own context (this)
    handleIndexClick = event => {
        this.setState({
            //  to convert number in string type to integer add +"5" = 5
            active: +event.target.dataset.index
        })
    }

    render() {
        const {photos, active} = this.state;

        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        <img
                            key={photo}
                            onClick={this.handleIndexClick}
                            data-index={index}
                            src={photo}
                            className={index === active? "active": ""}
                            alt="animal thumbnail"
                            />
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;