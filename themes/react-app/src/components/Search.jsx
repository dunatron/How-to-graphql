import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
import TextField from 'material-ui/TextField';
import {withRouter} from "react-router";
import {withStyles} from "material-ui/styles/index";
import {compose, graphql} from "react-apollo/index";
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Search extends Component {

  state = {
    links: [],
    searchText: ''
  };

  render() {

    console.log(this.state.links);

    const {classes} = this.props;

    return (
      <div>
        <div>
          <TextField
            id="search"
            label="Search field"
            type="search"
            className={classes.textField}
            onChange={(e) => this.setState({ searchText: e.target.value })}
            margin="normal"
          />

          <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart" onClick={() => this._executeSearch()}>
            <SearchIcon />
          </IconButton>


        </div>
        {this.state.links.map((link, index) => <Link key={link.id} link={link} index={index}/>)}
      </div>
    )
  }

  _executeSearch = async () => {
    console.log('well it has begunn.')
    // We are manually firing queries with apollo client
    const {searchText} = this.state;
    const result = await this.props.client.query({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: {searchText}
    });

    const links = result.data.searchAllLinks;
    this.setState({links});

    console.log(this.state.links);

    console.group('Search executes');
    console.log(result);
    console.log(links)
  }

}

const ALL_LINKS_SEARCH_QUERY = gql`
  query searchLinks($searchText: String!) {
  searchAllLinks(filter: $searchText) {
    ID
   	Title
    Created
    description
    url
    OwnerID
    VotesOnLink {
    	ID
    	VoterID
  	}
  }
}
`;

// export default withApollo(Search)

export default withRouter(compose(
  withApollo,
  withStyles(styles),
)(Search));