import Component from "inferno-component";
// Modules
import ProgressBar from "progressbar.js";
import numeral from "numeral";
// Import Styles
import styles from "../../../styles/dist/css.min.js";

export default class Twitter extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let votes = this.props.votes;
    var circle = new ProgressBar.Circle(this.circle, {
      color: this.props.color,
      duration: 800,
      easing: "easeInOut",
      strokeWidth: 10,
      trailWidth: 11
    });
    circle.animate(votes / 100);
  }
  render() {
    const style = {
      "background-image": `url(https://s3-us-west-1.amazonaws.com/capitempimages/${
        this.props.avatar
      })`
    };
    var percentaje = numeral(this.props.votes / 100).format(
      "0.%"
    );
    return (
      <div className={styles.card}>
        <div className={styles.card__topBody + " " + styles.card__topBody_twitter}>
          <div
            className={styles.card__topImg}
            style={style}
            ref={ref => (this.circle = ref)}
          />
          <label className={styles.card__topPercentaje}>{percentaje}</label>
        </div>
        <div className={styles.card__bottomBody}>
          <span className={styles.card__bottomName}>{this.props.name}</span>
          <span className={styles.card__bottomParties}>{this.props.team}</span>
        </div>
      </div>
    );
  }
}
