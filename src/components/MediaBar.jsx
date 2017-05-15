import React from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import transitions from 'material-ui/styles/transitions';
import theme from '../theme';


const styles = {
  element: {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 10,
    transition: transitions.easeOut(null, 'background-color', null),
    backgroundColor: theme.palette.primary1Color,
    color: theme.palette.alternateTextColor,
  },
  appBar: {
    boxShadow: 'none',
  },
  headlines: {
    transition: transitions.easeOut(null, 'padding-left', null),
    paddingRight: 20,
  },
  headline: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    margin: 0,
  },
  h1: {
    fontSize: '1.7em',
  },
};


export default class MediaBar extends React.Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    iconStyleLeft: PropTypes.object,
    onLeftIconButtonTouchTap: PropTypes.func.isRequired,
    style: PropTypes.object,
    height: PropTypes.number,
  };
  render() {
    return (
        <div style={{
          height: this.props.height,
          ...styles.element }}>
            <AppBar iconStyleLeft={this.props.iconStyleLeft} style={styles.appBar}
                    onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap} />
            <div style={{ ...styles.headlines, ...this.props.style }}>
                <h1 style={{ ...styles.headline, ...styles.h1 }}>{this.props.station.name}</h1>
                <h2 style={styles.headline}>{this.props.station.broadcast}</h2>
            </div>
        </div>
    );
  }
}

