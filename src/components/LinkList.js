import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

export const get_feed = gql`
{
  feed {
    id
    links {
      id
      createdAt
      url
      description
      postedBy{
        id
        name
      }
      votes{
        id
        user{
          id
        }
      }
    }
  }
}
`;

export const FEED_QUERY = gql`
    query FeedQuery(
        $take: Int
        $skip: Int
        $orderBy: LinkOrderByInput
    ) {
        feed(take: $take, skip: $skip, orderBy: $orderBy) {
            id
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            count
        }
    }
`;
const LinkList = () => {

   

  const { data } = useQuery(get_feed);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link,index) => {
            return <Link link={link} key = {link.id} index={index} id={link.id} />
})}
        </>
      )}
    </div>
  );
};
 
export default LinkList;