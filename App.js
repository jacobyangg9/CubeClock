import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Alert, Animated, Vibration } from 'react-native';
import styles from './styles';
import Settings from './settings';


import trashIcon from './assets/bin.png';
import refreshIcon from './assets/refresh.png';
import settingIcon from './assets/setting.png';


const App = () => {
  // State variables
  const [timerView, setTimerView] = useState('00:00.00'); // Displayed timer value
  const [cubingTimeStarted, setCubingTimeStarted] = useState(false); // Indicates if the timer is running
  const [cubingTimeStopped, setCubingTimeStopped] = useState(false); // Indicates if the timer has been stopped and reset is needed

  const [solveNumber, setSolveNumber] = useState(0); // Tracks the number of solves
  const [isVisible, setIsVisible] = useState(true); // Controls the visibility of the stats view
  
  // Refs to track time-related values
  const timeInMilliseconds = useRef(0); // Ref to track the elapsed time in milliseconds
  const startTimeRef = useRef(0); // Ref to store the starting time of the timer
  const timerInterval = useRef(null); // Ref to store the ID of the interval for clearing it later

  // State for storing recorded times
  const [recordedTimes, setRecordedTimes] = useState([]); // Array to store recorded times
  const [averageTime, setAverageTime] = useState(); // State to store the average time
  
  const [sessionStarted, setSessionStarted] = useState(false); // Tracks if a session has started
  

  const [ao5, setAo5] = useState(); // State to store the average of 5 times
  const [ao12, setAo12] = useState(); // State to store the average of 12 times

  const [settingsVisible, setSettingsVisible] = useState(false); // State to control the visibility of the settings view

  // Function to start the timer
  const startCubingTimer = () => {
    if (!cubingTimeStarted) {
      Vibration.vibrate(50); // Vibrate the device when the timer starts
      setCubingTimeStarted(true); // Mark the timer as started
      setCubingTimeStopped(false); // Ensure the timer is not in a stopped state
      startTimeRef.current = Date.now() - timeInMilliseconds.current; // Set the start time, accounting for any paused time
      timerInterval.current = setInterval(updateTime, 10); // Start an interval to update the timer every 10ms

      setSessionStarted(true); // Mark session as started
  
      setSolveNumber((prevSolveNumber) => prevSolveNumber + 1); // Increment solve number

      if (isVisible) {
        setIsVisible(false); // Hide the stats view when the timer starts
      }
    }
  };
  
  // Function to update the displayed timer value
  const updateTime = () => {
    const elapsed = Date.now() - startTimeRef.current; // Calculate elapsed time since the timer started
    timeInMilliseconds.current = elapsed; // Update the elapsed time in the ref
    setTimerView(formatTime(elapsed)); // Update the displayed timer with the formatted time
  };

  // Function to format the elapsed time into a string (MM:SS.mm)
  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60)); // Calculate the minutes
    const seconds = Math.floor((time / 1000) % 60); // Calculate the seconds
    const milliseconds = Math.floor((time % 1000) / 10); // Calculate the milliseconds (2 digits)
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`; // Format and pad the time values
  };

  // Function to stop and optionally reset the timer
  const stopCubingTimer = () => {
    clearInterval(timerInterval.current); // Stop the timer
    timerInterval.current = null; // Clear the interval reference
    setCubingTimeStarted(false); // Mark the timer as stopped
  
    if (!cubingTimeStopped) {
      setCubingTimeStopped(true);
      
      const recordedTime = timeInMilliseconds.current; // Store the current time before resetting
      
      setRecordedTimes((prevTimes) => {
        const newTimes = [...prevTimes, recordedTime]; // Add the new recorded time to the array
        console.log('Updated recordedTimes:', newTimes); // Log the new state
        return newTimes;
      });
  
      timeInMilliseconds.current = 0; // Reset after storing the value
    }
  
    if (!isVisible) {
      setIsVisible(true); // Show the stats view again
    }
  };

  // Function when the delete button is clicked, to display the alert
  const deleteTimePressed = () => {
    Alert.alert(
      'Delete Time?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete Time', onPress: () => deleteTime(), style: 'destructive' },
      ]
    );
  }

  // Function to delete the last recorded time
  const deleteTime = () => {
    setRecordedTimes((prevTimes) => { // Update the recorded times array
      const updatedTimes = [...prevTimes]; // Copy the recorded times array
      updatedTimes.pop(); // Remove the last recorded time
  
      const latestTime = updatedTimes[updatedTimes.length - 1]; // Get the latest time
      setTimerView(formatTime(latestTime || 0)); // Update the displayed time to the latest time

      setSolveNumber(prevSolveNumber => prevSolveNumber - 1); // Decrement solve number
  
      return updatedTimes; // Return the updated array
    });
  };

  // Function when the +2 button is clicked, to display the alert
  const restartSessionPressed = () => { 
    Alert.alert( // Show an alert to confirm the action
      'Restart Session?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' }, // Cancel the action
        { text: 'Restart', onPress: () => restartSession(), style: 'destructive'}, //  Add 2 seconds
      ]
    );
  }

  // Function to add 2 seconds to the last recorded time
  const restartSession = () => { 
    setRecordedTimes((prevTimes) => { // Update the recorded times array
      const updatedTimes = [...prevTimes]; // Copy the recorded times array
  
      updatedTimes.length = 0; // Clear the recorded times array
    
      // Update displayed time to match the new adjusted time
      setTimerView('00:00.00');

      setSolveNumber(0); // Reset the solve number
  
      return updatedTimes; // Return the updated array
    });
  };
  
  const removeMinAndMax = (times) => {
    if (times.length < 5) return; // Ensure at least 5 solves before computing ao5
  
    let lastFiveTimes = times.slice(-5); // Get last 5 recorded times
    let max5 = Math.max(...lastFiveTimes);
    let min5 = Math.min(...lastFiveTimes);
    
    let filteredTimes5 = lastFiveTimes.filter(time => time !== max5 && time !== min5);
  
    if (filteredTimes5.length === 3) { // Should always be 3 values left
      let sum5 = filteredTimes5.reduce((acc, time) => acc + time, 0);
      setAo5(formatTime(sum5 / 3)); // Divide by 3, since 2 values were removed
    }
  
    if (times.length < 12) return; // Ensure at least 12 solves before computing ao12
  
    let lastTwelveTimes = times.slice(-12); // Get last 12 recorded times
    let max12 = Math.max(...lastTwelveTimes);
    let min12 = Math.min(...lastTwelveTimes);
  
    let filteredTimes12 = lastTwelveTimes.filter(time => time !== max12 && time !== min12);
  
    // Ensure we only remove the first occurrence of max and min, keeping the correct count
    if (filteredTimes12.length > 10) {
      filteredTimes12.splice(filteredTimes12.indexOf(max12), 1);
    }
    if (filteredTimes12.length > 10) {
      filteredTimes12.splice(filteredTimes12.indexOf(min12), 1);
    }
  
    if (filteredTimes12.length === 10) { // Should always be 10 values left
      let sum12 = filteredTimes12.reduce((acc, time) => acc + time, 0);
      setAo12(formatTime(sum12 / 10)); // Divide by 10, since 2 values were removed
    }
  };
  
  // Function to display the settings view
  const displaySettings = () => {
    if (!settingsVisible) {
      setSettingsVisible(true); // Hide the settings view

    } else if (settingsVisible) {
      setSettingsVisible(false); // Show the settings view
    }
    
  }
  

  // useEffect hook to update average ltime when recordedTimes changes
  useEffect(() => { 
    if (recordedTimes.length > 0) {
      const sum = recordedTimes.reduce((acc, time) => acc + time, 0); // Sum the recorded times
      const newAverage = sum / recordedTimes.length; // Calculate new average time
      setAverageTime(newAverage); // Update state
  
      console.log(`Updated averageTime: ${newAverage}`); // Log the correct updated average
    } else {
      setAverageTime(0);
    }
  }, [recordedTimes]); // Runs whenever recordedTimes updates

  // useEffect hook to reset the session when the solve number changes
  useEffect(() => { // Reset the session when the solve number reaches 0
    if (sessionStarted) { 
      if (solveNumber == 0) { 
        setSessionStarted(false); // Mark the session as not started
      }


    }
  }, [solveNumber]) // Runs whenever solveNumber updates

  useEffect(() => {
    if (sessionStarted && recordedTimes.length >= 5) {
      removeMinAndMax(recordedTimes);
    }
  }, [recordedTimes]); // Runs whenever recordedTimes updates
  

  // Function to generate a scramble sequence
  const generateScramble = (length = 22) => {
    const moves = ["U", "D", "L", "R", "F", "B"]; // List of possible moves
    const modifiers = ["", "'", "2"]; // List of possible modifiers
    let scramble = []; // Initialize an empty array to store the scramble
    let lastMove = ""; // Initialize a variable to store the last move

    for (let i = 0; i < length; i++) { // Loop to generate the scramble
      let move; // Initialize a variable to store the move
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
      } while (move === lastMove); // Prevent repeating the same face

      lastMove = move;
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)]; // Select a random modifier
      scramble.push(move + modifier);
    }

    return scramble.join(" "); // Return scramble as a string
  };

  const doNothing = () => {

  }

   
  
  return (
      <SafeAreaView style={styles.container}>
        <Settings settingsVisible={settingsVisible} displaySettings={displaySettings}/>
        <TouchableOpacity
          onPress={cubingTimeStarted ? stopCubingTimer : startCubingTimer} 
          style={{ width: '100%', flex: 1 }}
        >
          <View style={styles.scrambleWrapper}>
            <Text style={[styles.scrambleText, { opacity: isVisible ? 1 : 0 }]}>{generateScramble()}</Text>
          </View>
          <View style={styles.startTimer}>
            <View style={styles.timerWrapper}>
              <View style={{ width: '90%', alignItems: 'center' }}>
                <Text style={styles.timerText}>{timerView}</Text>
              </View>
            </View>
            <View style={[styles.timeDescriptionsWrapper, { opacity: isVisible ? 1 : 0 }]}> 
                <Text style={styles.timeDescriptions}>Solve: {solveNumber}/{solveNumber}</Text>
                <Text style={styles.timeDescriptions}>Average: {sessionStarted ? formatTime(averageTime) : '--'}</Text>
                <Text style={styles.timeDescriptions}>ao5: {solveNumber >= 5 ? ao5 : '--'}</Text>
                <Text style={styles.timeDescriptions}>ao12: {solveNumber >=12 ? ao12 : '--'}</Text>
            </View>


            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={displaySettings}>
                  <View style={[styles.homeWrapper, { opacity: isVisible ? 1: 0 }]}>
                  <Image source={settingIcon} style={styles.home}></Image>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPressIn={() => {
                if (cubingTimeStarted) {
                  doNothing();
                } else if (sessionStarted) {
                  deleteTimePressed();
                } else {
                  doNothing();
                }
              }}
              >
                <View style={[styles.trashWrapper, { opacity: isVisible ? 1 : 0 }]}>
                  <Image source={trashIcon} style={styles.trash}></Image>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                if (cubingTimeStarted) {
                  doNothing();
                } else if (sessionStarted) {
                  restartSessionPressed();
                } else {
                  doNothing();
                }
              }}
                  >
                <View style={[styles.addedTimeWrapper, { opacity: isVisible ? 1: 0 }]}>
                  <Image source={refreshIcon} style={styles.home}></Image>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    
  );
};

export default App;
