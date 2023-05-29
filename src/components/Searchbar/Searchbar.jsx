import React, { Component } from "react";

 class Searchbar extends Component {
     
      state = {
        searchQuery: "",
      };

      handleChange = (event) => {
        this.setState({ searchQuery: event.target.value });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: "" });
      };


  render() {
    return (
      <div>
         <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSubmit}>

              <button type="submit" className="SearchForm-button" >
                <span className="SearchForm-button-label" fill="none" >Search</span>
              </button>   
              <input  
                className="SearchForm-input"
                type="text"
                placeholder="Search images and photos"

                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </form>
         </header>
    </div>
  )     
  }  
  } 
export default Searchbar;