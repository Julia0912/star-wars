import React, { Component } from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../../error-indicator ";
export default class PeoplePage extends Component {
  state = { selectedPerson: 2, hasError: false };
  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };
  componentDidCatch(error, errorInfo) {
    console.log("componentDidCatch()");
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList OnItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}
