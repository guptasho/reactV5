import React from 'react';
import pet from '@frontendmasters/pet'
import Carousel from './carousel';
import ErrorBoundary from './errorBoundary';

class Details extends React.Component {
    state = { loading: true };
    componentDidMount() {
        // throw new error('lol')
        pet.animal(this.props.id).then(({ animal }) => {
            this.setState({
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}. ${animal.contact.address.setState}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false
            })
        }, console.error)
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading ...</h1>
        }
        const { animal, breed, location, description, media, name } = this.state;

        return (
            <div className="details">
                <Carousel media={media}></Carousel>
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                    <button>Adopt {name}</button>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props}></Details>
        </ErrorBoundary>
    )
};