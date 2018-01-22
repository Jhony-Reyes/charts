import Component from "inferno-component";
// Modules
import axios from "axios";
import moment from "moment";
// Import Styles
import styles from "../../styles/dist/css.min.js";

import Card from "./card";
import Bar from "./bars";
import Media from "./media";
import Map from "./maps";
import Twitter from "./twitter";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      items: [],
      total: 0,
      share: this.props.share,
      succes: false,
      href: ` `
    };
    this.share = this.share.bind(this);
  }
  share() {
    let href = this.props.href;
    window.FB.ui(
      {
        method: "share",
        mobile_iframe: true,
        href: href
      },
      function(response) {}
    );
  }
  componentDidMount() {
    axios
      .get(`http://192.241.216.13/graphics/${this.props.id}`)
      .then(response => {
        let items = response.data.data;
        let total = this.state.total;
        items.map(val => {
          total += parseInt(val.votes);
        });
        this.setState({
          href: `https://twitter.com/share?url=${
            this.props.href
          }&via=grupocanton&text=Elecciones 2018`,
          data: response.data,
          items: response.data.data,
          total: total,
          succes: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    // Facebook Load
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "1478026538951991",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v2.11"
      });
    };
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/es_MX/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    // Twitter Load
    window.twttr = (function(q, x, idw) {
      var js,
        fjs = q.getElementsByTagName(x)[0],
        t = window.twttr || {};
      if (q.getElementById(idw)) return t;
      js = q.createElement(x);
      js.idw = idw;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    })(document, "script", "twitter-wjs");
  }
  render() {
    const template = type => {
      switch (type) {
        case "card":
          return this.state.items.map((val, idx) => {
            return (
              <Card
                avatar={val.avatar}
                votes={val.votes}
                team={val.team}
                color={val.color}
                name={val.name}
                total={this.state.total}
              />
            );
          });
          break;
        case "bar":
          return <Bar items={this.state.items} />;
          break;
        case "media":
          return this.state.items.map((val, idx) => {
            return (
              <Media
                avatar={val.avatar}
                team={val.team}
                name={val.name}
                facebook={val.facebookId}
                twitter={val.twitterEmbed.string}
                typeT={val.twitterEmbed.type}
              />
            );
          });
          break;
        case "map":
          return <Map />;
          break;
        case "twitter":
          return this.state.items.map((val, idx) => {
            return (
              <Twitter
                avatar={val.avatar}
                votes={val.votes}
                team={val.team}
                color={val.color}
                name={val.name}
              />
            );
          });
          break;
      }
    };
    const resultShare = type => {
      if (type !== "media") {
        return (
          <div className={styles.headChart}>
            <label className={styles._accent}>resultados de la encuesta</label>
            <label className={styles._primary}>
              total de votos: {this.state.total}
            </label>
          </div>
        );
      }
    };
    return (
      <div className={styles.grid}>
        <span className={styles.chart_title}>{this.state.data.title}</span>
        <span className={styles.chartDescription}>
          {this.state.data.description}
        </span>
        {resultShare(this.props.type)}
        <div className={styles.grid_content}>
          {this.state.succes ? template(this.props.type) : null}
        </div>
        <div className={styles.datesContainer}>
          <label className={styles.chart_dates}>
            Creado: {moment(this.state.data.createdAt).format("DD-MM-YYYY")}
          </label>
          <label className={styles.chart_dates}>
            Actualizado:{" "}
            {moment(this.state.data.updatedAt).format("DD-MM-YYYY")}
          </label>
        </div>
        {this.props.share ? (
          <div className={styles.datesContainer}>
            <div className={styles.shareContainer}>
              <span>Compartir los resultados</span>
              <div
                className={
                  styles.shareContainer__button +
                  " " +
                  styles.shareContainer__button_facebook
                }
                onClick={this.share}
              >
                <i className="fa fa-facebook" aria-hidden="true" />
              </div>
              <a href={this.state.href} target="_blank">
                <div
                  className={
                    styles.shareContainer__button +
                    " " +
                    styles.shareContainer__button_twitter
                  }
                >
                  <i className="fa fa-twitter" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
