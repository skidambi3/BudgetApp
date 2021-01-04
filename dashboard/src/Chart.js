import React, {Component} from 'react';
import { Line,Bar,Pie } from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dailyCosts: props.dailyCosts
        }
    }
    render () {

        return(
            <div>
                <Line
                data={{
                    labels: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    datasets: [{
                        label: 'Amount of Weekly Budget Remaining',
                        data: this.props.dailyCosts,
                        backgroundColor: [
                            'rgba(175, 238, 238, .5)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, .5)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height = {230}
                width = {500}
                options = {{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
                />

            </div>
        )
    }
}

class BarChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dailyCosts: props.dailyCosts
        }
    }
    render () {

        return(
            <div>
                <Bar
                data={{
                    labels: this.props.categoryLabels,
                    datasets: [{
                        label: 'Price Category Distribution',
                        data: this.props.dailyCosts,
                        backgroundColor: [
                            'rgba(175, 238, 238, .5)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, .5)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height = {230}
                width = {500}
                options = {{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
                />

            </div>
        )
    }
}


export {LineChart,BarChart};