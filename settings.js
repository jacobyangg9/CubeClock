import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Alert, Animated } from 'react-native';
import styles from './styles';

const Settings = ({settingsVisible, displaySettings}) => {
    return (
        <View style={[styles.settings, { opacity: settingsVisible ? 1 : 0 }]}>
          <View style={styles.settingsHeaderWrapper}>
            <Text style={styles.settingsHeaderText}>Settings</Text>
            <TouchableOpacity onPress={displaySettings}>
              <Text style={styles.settingsDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingsHeaderLine}></View>
        </View>
    )
}

export default Settings;