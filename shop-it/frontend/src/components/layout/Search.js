import React, { useState } from 'react';
import {useHistory, useNavigate} from "react-router-dom";

function Search() {

    const [keyword, setKeyword] = useState('');

    const history = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if(keyword) {
            history(`/search/${keyword}`);
        }
        else{
            history(`/`);
        }
    }

    return (
        <div>
            <form onSubmit={searchHandler}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        className="form-control fs-4"
                        placeholder="Enter Product Name ..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn" type="submit">
                            <i className="fa fa-search fa-2x text-white" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Search;