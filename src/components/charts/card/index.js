import Component from "inferno-component";
// Modules
import ProgressBar from "progressbar.js";
import numeral from "numeral";
// Import Styles
import styles from "../../../styles/dist/css.min.js";

export default class Card extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let votes = this.props.votes;
    let total = this.props.total;
    var circle = new ProgressBar.Circle(this.circle, {
      color: this.props.color,
      duration: 1000,
      easing: "easeInOut",
      strokeWidth: 10,
      trailWidth: 11
    });
    circle.animate(votes / total);
  }
  render() {
    const style = {
      "background-image": `url(https://s3-us-west-1.amazonaws.com/capitempimages/${
        this.props.avatar
      })`
    };
    var percentaje = numeral(this.props.votes / this.props.total).format(
      "0.00%"
    );
    return (
      <div className={styles.card}>
        <div className={styles.card__topBody}>
          <div
            className={styles.card__topImg}
            style={style}
            ref={ref => (this.circle = ref)}
          />
          <label className={styles.card__topPercentaje}>{percentaje}</label>
          <span className={styles.card__topVotes}>
            {this.props.votes} VOTOS
          </span>
        </div>
        <div className={styles.card__bottomBody}>
          <span className={styles.card__bottomName}>{this.props.name}</span>
          <span className={styles.card__bottomParties}>{this.props.team}</span>
        </div>
      </div>
    );
  }
}
