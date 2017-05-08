import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import transitions from 'material-ui/styles/transitions';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  content: {
    padding: 16,
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
  },
};

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

  render() {
    const paddingLeft = (this.state.drawer.docked ? 256 : 0) + 16;

    return <MuiThemeProvider>
            <div>
                <AppBar title={this.state.station.name} style={{ paddingLeft }}
                        iconStyleLeft={{ display: this.state.drawer.docked ? 'none' : 'block' }}
                        onLeftIconButtonTouchTap={() => this.toggleDrawer()} />
                <Drawer open={this.state.drawer.open} docked={this.state.drawer.docked}
                onRequestChange={() => this.toggleDrawer()}>
                    <MenuItem>Home</MenuItem>
                </Drawer>
               <div style={{ ...styles.content, paddingLeft }}>
                   Content
               </div>
            </div>
        </MuiThemeProvider>;
  }
}

