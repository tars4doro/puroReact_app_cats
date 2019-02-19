import React, { Component } from 'react';
import FaceFigureContainer from './Components/FaceFigureContainer';
import SearchField from './Components/SearchField';
import NavBlock from './Components/NavBlock';
import ErrorBoundary from './Components/ErrorBoundary';


class App extends Component {
    constructor (props) {
      super(props);
      //creating initial app state
      this.state = {
        cats: [],
        searchstring: ''
      }
    }

    //after 1st render run react lifecycle method to Fetch to get pets array
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then( res => res.json() ) //using react method setState to change state
      .then( users => this.setState( { cats: users} ) );       
    }

    //event listener in SearchField
    searchCat = (event) =>  {
      this.setState( { searchstring: event.target.value } );
    }

    render() {
      const { cats, searchstring } = this.state;
      //filter pets array to match searchstring
      const filteredResult = cats.filter(
        (cat) => { 
          return cat.name.toLowerCase().includes(searchstring.toLowerCase());
        }
      );

      if (cats.length) {
        return (
          <div className='tc'>
            <NavBlock>
              <h1 className='f1 ma0 pt3'>PetDatabase</h1>
              {/*//adding listener func to props*/}
              <SearchField searchCat={this.searchCat} />              
            </NavBlock>
            {/*wrapping components to render error message if needed*/}
            <ErrorBoundary>
            <FaceFigureContainer cats={filteredResult}/>            
            </ErrorBoundary>
          </div>
        ); }
      else {    
        //default render while fetch responds
        return ( 
          <div className='tc'>
          <h1>Loading data. Please wait a moment.</h1>
          </div>
          ); }
    }
  }
  
export default App;