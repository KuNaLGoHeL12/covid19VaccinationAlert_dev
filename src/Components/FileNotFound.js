import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FileNotFound extends Component {

    render() {
        return (
            <>
                <div>
                    <h1>404 - Not Found!</h1>
                    <Link to="/">Go To Home</Link>
                </div>
            </>
        );
    }
}

export default FileNotFound;
