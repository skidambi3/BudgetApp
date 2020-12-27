import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import {thisWeek} from './store.js';

console.log(thisWeek);
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
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',"Sunday"],
                    datasets: [{
                        label: 'Amount of Weekly Budget Remaining',
                        data: this.state.dailyCosts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height = {400}
                width = {600}
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


export default LineChart;