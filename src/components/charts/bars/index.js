import Component from "inferno-component";
// Modules
import Chart from "chart.js";

export default class Bar extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const items = [];
    const votes = [];
    const colors = [];
    this.props.items.forEach(element => {
      items.push(element.name);
      votes.push(element.votes.toString());
      colors.push(element.color);
    });
    console.log(items);
    console.log(votes);
    console.log(colors);
    // eslint-disable-next-line
    var myBarChart = new Chart(this.canvas, {
      type: "bar",
      data: {
        labels: items,
        datasets: [
          {
            label: "# of Votes",
            data: votes,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });
  }
  render() {
    return (
      <div className="chart-container">
        <canvas width="600" height="400" ref={ref => (this.canvas = ref)} />
      </div>
    );
  }
}
