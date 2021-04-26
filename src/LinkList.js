import React from 'react';
import Link from './Link';

const LinkList = () => {
    const { data } = useQuery(GET_GAMESTATS); 

    return (
        <div>
          {data && (
            <>
              {data.feed.links.map((link) => (
                <Link key={link.id} link={link} />
              ))}
            </>
          )}
        </div>
      );
    };

export default LinkList;