import React, {Component} from 'react'

class ConfigRoom extends Component {
    constructor(props) {
        super(props)
        this.state = { result: null }
    }
    componentDidMount() {
        fetch("/XXXXX")
           .then(response => response.text())
           .then(data => this.setState(({result: data})))
    }

    render() {
        document.title = this.state.result
        return (
            <div className="config_room">
                <div>{ this.state.result}</div>
            </div>
        )
    }
}
export default ConfigRoom;
