import React, { Component } from 'react';
import Register from './Register';
import Footer from './Footer';
import { Container } from 'react-bootstrap';


class Home extends Component {
    render() {
        return (
            <>
                <h2 align="center" className="mb-4 mt-4">Covid19 Vaccination Alert</h2>
                <Container className="d-xl-flex align-items-center justify-content-center">
                    <div className="w-100" style={{ maxWidth: "500px" }}>
                        <Register></Register>
                    </div>
                </Container>
                <Footer></Footer>
            </>
        );
    }
}

export default Home;