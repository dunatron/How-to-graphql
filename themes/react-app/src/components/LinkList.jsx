import React, { Component } from 'react'
import Link from './Link'
import { graphql, gql, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  linkContainer: {
    display: 'block',
    margin: '30px 15px'
  }
});

class LinkList extends Component {

  _updateCacheAfterVote = (store, createVote, linkID) => {
    // 1
    const data = store.readQuery({query: ALL_LINKS_QUERY});
    // 2
    const votedLink = data.readLinks.edges.find(link => link.node.ID === linkID);
    // votedLink.node.VotesOnLink = createVote;
    votedLink.node.VotesOnLink.push(createVote);
    // 3
    store.writeQuery({query: ALL_LINKS_QUERY, data})

    console.group('_updateCacheAfterVote');
    console.log('store: ', store);
    console.log('votedLink: ', votedLink);
    console.log('createVote: ', createVote)
  };

  render() {

    const {classes} = this.props;

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

    return (
      <div className={classes.linkContainer}>
        {linksToRender.edges.map((edge, index) => (
         <Link key={edge.node.ID} updateStoreAfterVote={this._updateCacheAfterVote} index={index} link={edge.node}/>
        ))}
      </div>
    )
  }

}

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    readLinks {
      edges {
        node {
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
    }
}
`;

export default compose(
  graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }),
  withStyles(styles)
) (LinkList)