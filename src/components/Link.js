import React from 'react';


const Link = (props) => {
    const link = props.link;
    return (  
        <div>
            <div>
                {link.description} ({link.url})
            </div>
        </div>
    );
}
 
export default Link;
