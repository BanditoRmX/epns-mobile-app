import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking, Platform } from 'react-native';

import ParsedText from 'react-native-parsed-text';

import GLOBALS from 'src/Globals';

export default class CalendarEvents extends Component {
  // Constructor
  constructor(props) {
    super(props);
  }

  // Component Mounted
  componentDidMount() {

  }

  // FUNCTIONS
  handleUrlPress(matchingString, matchIndex /*: number*/) {
    let pattern = /\[([^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);

    let midComponent = `${match[2]}`;
    const url = midComponent.substr(midComponent.indexOf('||') + 2);

    Linking.openURL(url);
  }

  handlePhonePress(phone, matchIndex /*: number*/) {
    console.log(`${phone} has been pressed!`);
  }

  handleNamePress(name, matchIndex /*: number*/) {
    console.log(`Hello ${name}`);
  }

  handleEmailPress(email, matchIndex /*: number*/) {
    console.log(`send email to ${email}`);
  }

  handleAppSettings() {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }
  }

  renderStyles(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[([^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);

    return `${match[2]}`;
  }

  renderThreeStyles(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[([^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);

    let midComponent = `${match[2]}`;
    const midText = midComponent.substr(0, midComponent.indexOf('||'));
    return midText;
  }

  // RENDER
  render() {
    const {
      style,
      title,
      fontSize,
      textStyle,
    } = this.props;

    let TextUpdatedStyle = {
      fontSize: fontSize
    }

    let parseSettings = [
      {
        type: 'phone',
        style: styles.underline,
        onPress: this.handlePhonePress
      },
      {
        type: 'email',
        style: [styles.link, styles.underline],
        onPress: this.handleEmailPress
      },
      {
        pattern: /\[(url):([^\]]+)\]/i,
        style: [styles.primary, styles.bold, styles.italics, styles.underline],
        onPress: this.handleUrlPress,
        renderText: this.renderThreeStyles
      },
      {
        pattern: /\[(default):([^\]]+)\]/i,
        style: [styles.primary, styles.bold],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(bold):([^\]]+)\]/i,
        style: styles.bold,
        renderText: this.renderStyles
      },
      {
        pattern: /\[(italics):([^\]]+)\]/i,
        style: styles.italics,
        renderText: this.renderStyles
      },
      {
        pattern: /\[(bolditalics):([^\]]+)\]/i,
        style: [styles.bold, styles.italics],
        renderText: this.renderStyles
      },
    ];

    if (Platform.OS === 'ios') {
      parseSettings.push(
        {
          pattern: /\[(appsettings):([^\]]+)\]/i,
          style: [styles.link, styles.bold, styles.italics, styles.underline],
          onPress: this.handleAppSettings,
          renderText: this.renderStyles
        }
      );
    }
    else if (Platform.OS === 'android') {
      parseSettings.push(
        {
          pattern: /\[(appsettings):([^\]]+)\]/i,
          style: [styles.bold],
          renderText: this.renderStyles
        }
      );
    }

    return (
      <View style = {[ styles.container, style ]}>
        <ParsedText
          style = {[ styles.text, TextUpdatedStyle, textStyle ]}
          parse = {parseSettings}
          childrenProps={{allowFontScaling: false}}
        >
          {title}
        </ParsedText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  name: {
    color: GLOBALS.COLORS.SUBLIME_RED
  },
  username: {
    color: GLOBALS.COLORS.PRIMARY
  },
  text: {
    color: GLOBALS.COLORS.BLACK
  },
  primary: {
    color: GLOBALS.COLORS.GRADIENT_PRIMARY,
  },
  link: {
    color: GLOBALS.COLORS.LINKS,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold'
  },
  italics: {
    fontStyle: 'italic'
  }
});