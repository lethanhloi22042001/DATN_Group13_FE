import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';

class Support extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    

    render() {
        return (
            <div>
                <HomeHeader/>
                <iframe src="http://localhost:3002/" width="100%" height="645px" name="the-iframe" frameborder="0"></iframe>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
