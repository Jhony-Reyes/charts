import Component from "inferno-component";
// Import Styles
import styles from "../../../styles/dist/css.min.js";

export default class Map extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      load: false
    };
  }
  componentDidMount() {
    var google = window.google;
    google.charts.load("upcoming", {
      packages: ["geochart"]
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "State", "State");
      data.addColumn("number", "rank", "rank");
      data.addColumn({
        type: "string",
        label: "branch",
        id: "branch",
        role: "tooltip"
      });
      data.addRows([
        ["Baja California", 1, 'Bronco'],
        ["Sonora", 1, 'Bronco'],
        ["Chihuahua", 3, 'Bronco'],
        ["Coahuila", 2, 'Bronco'],
        ["Nuevo León", 1, 'Bronco'],
        ["Tamaulipas", 1, 'Bronco'],
        ["Sinaloa", 4, 'Bronco'],
        ["Nayarit", 1, 'Bronco'],
        ["Durango", 1, 'Bronco'],
        ["Zacatecas", 4, 'AMLO'],
        ["Jalisco", 4, 'AMLO'],
        ["Colima", 4, 'AMLO'],
        ["Tlaxcala", 4, 'AMLO'],
        ["Aguascalientes", 4, 'AMLO'],
        ["Zacatecas", 4, 'AMLO'],
        ["San Luis Potosí", 4, 'AMLO'],
        ["Puebla", 4, 'AMLO'],
        ["Guanajuato", 2, 'AMLO'],
        ["Querétaro", 3, 'AMLO'],
        ["Hidalgo", 4, 'AMLO'],
        ["Morelos", 4, 'AMLO'],
        ["Estado de México", 4, 'AMLO'],
        ["Distrito Federal", 4, 'AMLO'],
        ["Baja California Sur", 2, 'Anaya'],
        ["Michoacán", 4, 'Anaya'],
        ["Guerrero", 2, 'Anaya'],
        ["Oaxaca", 2, 'Anaya'],
        ["Veracruz", 2, 'Anaya'],
        ["Tabasco", 2, 'Anaya'],
        ["Campeche", 3, 'Meade'],
        ["Chiapas", 2, 'Anaya'],
        ["Quintana Roo", 3, 'Meade'],
        ["Yucatán", 3, 'Meade']
      ]);

      var options = {
        region: "MX", // Mexico
        resolution: "provinces",
        colorAxis: {
          minValue: 1,
          //     maxValue=400,
          colors: ["green", "yellow", "violet", "orange"]
        },
        backgroundColor: "#81d4fa",
        datalessRegionColor: "#eeeeee",
        defaultColor: "#f5f5f5"
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById("geochart-colors")
      );
      chart.draw(data, options);
    }
  }
  render() {
    return (
      <div>
        este es un mapa
        <div id="geochart-colors" style="width: 480px; height: 296px;" />
      </div>
    );
  }
}
