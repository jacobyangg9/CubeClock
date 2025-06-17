import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Alert, Animated, Switch, ScrollView } from 'react-native';
import styles from './styles';



const Settings = ({settingsVisible, displaySettings, isAverageEnabled, setIsAverageEnabled, isA12Enabled, setIsA12Enabled, isZenModeEnabled, setIsZenModeEnabled, isA5Enabled, setIsA5Enabled, isMaximumEnabled, setIsMaximumEnabled, isUseInspectionEnabled, setIsUseInspectionEnabled, ism3Enabled, setIsm3Enabled, isMinimumEnabled, setIsMinimumEnabled}) => {

    
    // Function to do nothing
    const doAbsolutelyNothing = () => {
      // This function intentionally does nothing
    }

    // Use effect function to toggle if average is enabled
    useEffect(() => {
      console.log(`Is average enabled? ${isAverageEnabled}`);
    }, [isAverageEnabled]);



    return (
        <View style={[styles.settings, { opacity: settingsVisible ? 1 : 0, pointerEvents: settingsVisible ? 'auto' : 'none' }]}
              pointerEvents={settingsVisible ? 'auto' : 'none'}
        >
          
          <ScrollView>
          <View style={styles.settingsHeaderWrapper} >
            <Text style={styles.settingsHeaderText}>Settings</Text>
            <TouchableOpacity onPress={displaySettings} style={styles.settingsDoneButton}>
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
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>

            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Use Inspection</Text>
              <Switch
                value={isUseInspectionEnabled}
                onValueChange={setIsUseInspectionEnabled}
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>

            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Average</Text>
              <Switch
                value={isAverageEnabled}
                style={styles.settingsSwitchElements}
                onValueChange={setIsAverageEnabled}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>ao5</Text>
              <Switch
                value={isA5Enabled}
                onValueChange={setIsA5Enabled}
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>ao12</Text>
              <Switch
                value={isA12Enabled}
                onValueChange={setIsA12Enabled}
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>mo3</Text>
              <Switch
                value={ism3Enabled}
                onValueChange={setIsm3Enabled}
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>
            
            <View style={styles.settingsBodyLine}></View>


            <View style={styles.settingsBodyWrapper}>
              <Text style={styles.settingsBodyText}>Slowest Time</Text>
              <Switch
                value={isMaximumEnabled}
                onValueChange={setIsMaximumEnabled}
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>

            <View style={styles.settingsBodyLine}></View>


            <View style={[styles.settingsBodyWrapper, { marginBottom: '20%' }]}>
              <Text style={styles.settingsBodyText}>Best Time</Text>
              <Switch
                value={isMinimumEnabled}
                onValueChange={setIsMinimumEnabled}
                style={styles.settingsSwitchElements}
              ></Switch>
            </View>
            
          </View>

          </ScrollView>

        </View>
    )
}

export default Settings;