import Component from "inferno-component";
// Import Styles
import styles from "../../../styles/dist/css.min.js";

export default class Media extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //window.twttr.widgets.load();
    let typeT = this.props.typeT;
    let source = this.props.twitter;
    let container = this.embed;
    window.twttr.ready(function(twttr) {
      // bind events here
      if (typeT === "embed") {
        window.twttr.widgets.createTweet(source, container, {
          linkColor: "#55acee"
        });
      } else {
        window.twttr.widgets.createTimeline(
          { sourceType: source, screenName: source },
          container,
          {
            height: 400
          }
        );
      }
    });
  }
  render() {
    const style = {
      "background-image": `url(https://s3-us-west-1.amazonaws.com/capitempimages/${
        this.props.avatar
      })`
    };

    /*function createMarkup(t) {
      var b = t;
      var embed = b.replace(/&lt;br&gt;/g, "&lt;br/&gt;");
      let e = document.createElement("div");
      e.innerHTML = embed;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    } */
    const embedType = type => {
      if (type !== "embed") {
        return <a class="twitter-timeline" ref={ref => (this.embed = ref)} />;
      } else {
        return <div ref={ref => (this.embed = ref)} />;
      }
    };
    return (
      <div className={styles.media}>
        <div className={styles.media__topBody}>
          <div className={styles.media__topImg} style={style} />
          <div>
            <label className={styles.media__topName}>{this.props.name}</label>
            <span className={styles.media__topParties}>{this.props.team}</span>
          </div>
        </div>
        <div className={styles.media__bottomBody}>
          <div className={styles.media__bottomFacebook}>
            <div
              style="margin-bottom: 20px"
              class="fb-video"
              data-href={this.props.facebook}
              data-allowfullscreen="true"
              height="350px"
            />
          </div>
          <div style="overflow:hidden">{embedType(this.props.typeT)}</div>
        </div>
      </div>
    );
  }
}
