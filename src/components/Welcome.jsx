import React from 'react';

export class Welcome extends React.Component {


    constructor(){
        super();
        this.state = {
        }
        
    }

    componentDidMount() {}

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if(this.props.a != prevProps.a || this.props.b.length != prevProps.b.length) {
            return true;
         } else {
            return null;
         }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot == true) {
            
        }
    }

    render() {
        return (<>Welcome</>)
    }

}