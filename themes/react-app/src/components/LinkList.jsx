import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';



class LinkList extends Component {

  render() {

    // 1
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading</div>
    }

    // 2
    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>Error</div>
    }

    // 3
    const linksToRender = this.props.allLinksQuery.readLinks;

    console.log(this.props.allLinksQuery.readLinks);

    return (
      <div>
        {linksToRender.edges.map(edge => (
         <Link key={edge.node} link={edge.node}/>
          // <div>{edge.node.toString()}</div>
        ))}
      </div>
    )
  }

}

/*
// A practical example would look like this
client.query({
  query: gql`
  query AllLinksQuery {
    readLinks {
      edges {
        node {
          ID
          Title
          description
          url
        }
      }
    }
}
`
}).then(response => console.log(response.data));

 */


// if (loading) {
//   return <CircularProgress className={classes.progress} />;
// }
//
// return readEvents.edges.map(edge => {
//   return <EventCard event={edge.node} key={edge.node.ID} />;
// });


const All_LINKS_QUERY = gql`
  query AllLinksQuery {
    readLinks {
      edges {
        node {
          ID
          Title
          description
          url
        }
      }
    }
}
`;

export default graphql(All_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList)