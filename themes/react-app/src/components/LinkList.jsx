import React, { Component } from 'react'
import Link from './Link'
import { graphql, gql } from 'react-apollo'
// import gql from 'graphql-tag'



class LinkList extends Component {

  render() {

    // 1
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading Hacker Links</div>
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
         <Link key={edge.node.ID} link={edge.node}/>
          // <div>{edge.node.toString()}</div>
        ))}
      </div>
    )
  }

}

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