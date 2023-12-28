import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./random-planet.css";
import Spinner from "../spinner";
import ErrorIndicator from "../../error-indicator ";
export default class RandomPlanet extends Component {
  swapiService = new SwapiService();
  state = {
    planet: {},
    loading: true,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
    // clearInterval(this.interval);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };
  onError = (err) => {
    this.setState({ error: true, loading: false });
  };
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };
  render() {
    const { planet, loading, error } = this.state;
    const hasDate = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasDate ? <PlanetView planet={planet} /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}
const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        // src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="The image is not loading"
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">{population}</span>
            <span>123124</span>
          </li>
          <li className="list-group-item">
            <span className="term">{rotationPeriod}</span>
            <span>43</span>
          </li>
          <li className="list-group-item">
            <span className="term">{diameter}</span>
            <span>100</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
