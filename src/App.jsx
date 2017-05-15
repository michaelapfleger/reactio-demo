import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import transitions from 'material-ui/styles/transitions';
import MenuItem from 'material-ui/MenuItem';
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-play';
import RadioIcon from 'material-ui/svg-icons/av/radio';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import InfoIcon from 'material-ui/svg-icons/action/info';
import { connect } from 'react-redux';
import Settings from './routes/Settings.jsx';
import Program from './routes/Program.jsx';
import About from './routes/About.jsx';
import Stations from './routes/Stations.jsx';
import MenuHeader from './components/MenuHeader.jsx';
import MediaBar from './components/MediaBar.jsx';

const headerHeight = 160;
const styles = {
  dark: {
    backgroundColor: '#242424',
    color: '#A9A9A9',
  },
  light: {
    backgroundColor: '#F2F2F2',
    color: '#363636',
  },
  content: {
    padding: 16,
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
    marginTop: headerHeight,
  },
  menuLink: {
    textDecoration: 'none',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    component: Program,
    title: 'Programm',
    icon: <PlaylistIcon />,
  },
  {
    link: '/stations',
    component: Stations,
    title: 'Sender',
    icon: <RadioIcon />,
  },
  {
    link: '/settings',
    component: Settings,
    title: 'Einstellungen',
    icon: <SettingsIcon />,
  },
  {
    link: '/about',
    component: About,
    title: 'Info',
    icon: <InfoIcon />,
  },
];

@connect(store => ({
  station: store.station,
  theme: store.theme,
  dark: store.settings.dark,
}))
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: {
        open: false,
        docked: false,
      },
    };
  }

  static propTypes = {
    station: PropTypes.object,
    theme: PropTypes.object,
    dark: PropTypes.bool,
  };

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 840px');
    mql.addListener(() => {
      this.mqlChange(mql.matches);
    });
    this.mqlChange(mql.matches);
  }

  mqlChange(matches) {
    this.setState({
      drawer: {
        open: matches,
        docked: matches,
      },
    });
  }

  toggleDrawer() {
    this.setState({
      drawer: {
        ...this.state.drawer,
        // ...alle objekteigenschaften werden kopiert-außer die, die ich nachher noch überschreibe
        open: !this.state.drawer.open,
      },
    });
  }

  closeDrawer() {
    if (!this.state.drawer.docked) {
      this.toggleDrawer();
    }
  }

  render() {
    const htmlStyles = this.props.dark ? styles.dark : styles.light;
    document.querySelector('html').style.backgroundColor = htmlStyles.backgroundColor;
    document.querySelector('html').style.color = htmlStyles.color;
    const paddingLeft = (this.state.drawer.docked ? 256 : 0) + 16;

    return <MuiThemeProvider muiTheme={this.props.theme}>
            <Router>
              <div>
                  <MediaBar station={this.props.station} style={{ paddingLeft }}
                          iconStyleLeft={{ display: this.state.drawer.docked ? 'none' : 'block' }}
                          onLeftIconButtonTouchTap={() => this.toggleDrawer()}
                            height={headerHeight} theme={this.props.theme}/>
                  <Drawer open={this.state.drawer.open} docked={this.state.drawer.docked}
                  onRequestChange={() => this.toggleDrawer()}>
                    <MenuHeader station={this.props.station.shortName} />
                    {routes.map(route =>
                      <Link key={route.link} to={ route.link } style={styles.menuLink}>
                        <MenuItem primaryText={route.title} onTouchTap={() => this.closeDrawer()}
                                  leftIcon={route.icon}/>
                      </Link>)}

                  </Drawer>
                 <div style={{ ...styles.content, paddingLeft }}>
                   {routes.map(route => (
                       <Route exact={route.exact} key={route.link}
                              path={route.link} component={route.component} />
                   ))}
                 </div>
              </div>
            </Router>
        </MuiThemeProvider>;
  }
}

