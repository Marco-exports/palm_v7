import React from 'react'
import Moment from 'react-moment'

export default class DateTime extends React.Component {
    render() {
        return (
            <Moment
                interval = {25000}
                format = { this.props.format }
            >
            </Moment>
        )
    }
}
