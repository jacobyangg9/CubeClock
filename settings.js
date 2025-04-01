import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Alert, Animated, Switch } from 'react-native';
import styles from './styles';

const Settings = ({settingsVisible, displaySettings}) => {

    const [isZenModeEnabled, setIsZenModeEnabled] = useState(false); // Toggle for Zen Mode
    const [isUseInspectionEnabled, setIsUseInspectionEnabled] = useState(false); // Toggle for Use Inspection
    const [isSolveNumberEnabled, setIsSolveNumberEnabled] = useState(true); // Toggle for Solve Number
    const [isAverageEnabled, setIsAverageEnabled] = useState(true); // Toggle for Average
    const [isA5Enabled, setIsA5Enabled] = useState(true); // Toggle for ao5
    const [isA12Enabled, setIsA12Enabled] = useState(true); // Toggle for ao12
    const [ism3Enabled, setIsm3Enabled] = useState(false); // Toggle for mo3
    const [isMaximumEnabled, setIsMaximumEnabled] = useState(false); // Toggle for Slowest Time
    const [isMinimumEnabled, setIsMinimumEnabled] = useState(false); // Toggle for Best Time


    return (
        <View style={[styles.settings, { opacity: settingsVisible ? 1 : 0 }]}>
          <View style={styles.settingsHeaderWrapper}>
            <Text style={styles.settingsHeaderText}>Settings</Text>
            <TouchableOpacity onPress={displaySettings}>
              <Text style={styles.settingsDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingsHeaderLine}></View>

          <Text style={styles.settingPropertyText}>DISPLAY</Text>

          <View style={styles.settingsDisplayWrapper}>
            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Zen Mode</Text>
              <Switch
                value={isZenModeEnabled}
                onValueChange={setIsZenModeEnabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>

            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Use Inspection</Text>
              <Switch
                value={isUseInspectionEnabled}
                onValueChange={setIsUseInspectionEnabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Solve Number</Text>
              <Switch
                value={isSolveNumberEnabled}
                onValueChange={setIsSolveNumberEnabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Average</Text>
              <Switch
                value={isAverageEnabled}
                onValueChange={setIsAverageEnabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>ao5</Text>
              <Switch
                value={isA5Enabled}
                onValueChange={setIsA5Enabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>ao12</Text>
              <Switch
                value={isA12Enabled}
                onValueChange={setIsA12Enabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>mo3</Text>
              <Switch
                value={ism3Enabled}
                onValueChange={setIsm3Enabled}
              ></Switch>
            </View>
            
            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Slowest Time</Text>
              <Switch
                value={isMaximumEnabled}
                onValueChange={setIsMaximumEnabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Best Time</Text>
              <Switch
                value={isMinimumEnabled}
                onValueChange={setIsMinimumEnabled}
              ></Switch>
            </View>
          </View>

        </View>
    )
}

export default Settings;