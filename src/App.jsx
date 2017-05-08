import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import transitions from 'material-ui/styles/transitions';
import MenuItem from 'material-ui/MenuItem';
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-play';
import RadioIcon from 'material-ui/svg-icons/av/radio';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import InfoIcon from 'material-ui/svg-icons/action/info';
import Settings from './routes/Settings.jsx';
import Program from './routes/Program.jsx';
import About from './routes/About.jsx';
import Stations from './routes/Stations.jsx';

const styles = {
  content: {
    padding: 16,
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: {
        open: false,
        docked: false,
      },
      station: {
        name: 'Radio FM4',
      },
    };
  }
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
        // ...alle objekteigenschaften bleiben erhalten-außer die, die ich nachher noch überschreibe
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
    const paddingLeft = (this.state.drawer.docked ? 256 : 0) + 16;

    return <MuiThemeProvider>
            <Router>
              <div>
                  <AppBar title={this.state.station.name} style={{ paddingLeft }}
                          iconStyleLeft={{ display: this.state.drawer.docked ? 'none' : 'block' }}
                          onLeftIconButtonTouchTap={() => this.toggleDrawer()} />
                  <Drawer open={this.state.drawer.open} docked={this.state.drawer.docked}
                  onRequestChange={() => this.toggleDrawer()}>

                    {routes.map(route =>
                      <Link key={route.link} to={ route.link } style={styles.menuLink}>
                        <MenuItem primaryText={route.title} onTouchTap={() => this.closeDrawer()}
                                  leftIcon={route.icon}></MenuItem>
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

