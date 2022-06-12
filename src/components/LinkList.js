import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const get_feed = gql`
{
  feed {
    id
    links {
      id
      createdAt
      url
      description
    }
  }
}
`;
const LinkList = () => {

   

  const { data } = useQuery(get_feed);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link) => {
            return <Link link={link} key = {link.id} id={link.id} />
})}
        </>
      )}
    </div>
  );
};
 
export default LinkList;