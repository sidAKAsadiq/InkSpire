import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Pagination({total_num_of_posts , posts_per_page , paginate}) {
    //const [page_numbers , set_page_numbers] = useState([])
    let page_numbers = []
    let range = Math.ceil(total_num_of_posts/posts_per_page);
    console.log("Range" , range);
    console.log("tnp" , total_num_of_posts)
    console.log("ppp" , posts_per_page);

    for (let index = 1 ; index <= range ;  index++) {
            page_numbers.push(index)        
    }

    console.log("Pg : ",page_numbers);

    
    return (
        <div className="flex justify-center mt-8">
            {page_numbers.map((each_page_number) => (
                <Link
                    to={``}
                    key={each_page_number}
                    onClick={() => paginate(each_page_number)}
                    className="inline-block px-4 py-2 mx-1 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200"
                >
                    {each_page_number}
                </Link>
            ))}
        </div>
    );
    
    
}

export default Pagination