import React from 'react';

type ProgressSlideProps = {
    current: number,
    end: number,
}

// The purpose of this component is to show the user how 
// through something they are.  
export class ProgressSlide extends React.Component<ProgressSlideProps, {}> {

    getValue() {

    }

    render() {
        return <progress className="nes-progress is-primary" value={this.props.current} max={this.props.end}></progress>
    }

}