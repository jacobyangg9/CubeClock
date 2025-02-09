import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';

const App = () => {
  const [timerView, setTimerView] = useState('00:00.00'); // Displayed timer value
  const [cubingTimeStarted, setCubingTimeStarted] = useState(false); // Indicates if the timer is running
  const [cubingTimeStopped, setCubingTimeStopped] = useState(false); // Indicates if the timer has been stopped and reset is needed

  const [solveNumber, setSolveNumber] = useState(0); // Tracks the number of solves
  const [isVisible, setIsVisible] = useState(true); // Controls the visibility of the stats view
  
  const timeInMilliseconds = useRef(0); // Ref to track the elapsed time in milliseconds
  const startTimeRef = useRef(0); // Ref to store the starting time of the timer
  const timerInterval = useRef(null); // Ref to store the ID of the interval for clearing it later

  const [recordedTimes, setRecordedTimes] = useState([]); // Array to store recorded times
  const [averageTime, setAverageTime] = useState(); // State to store the average time

  
  const [sessionStarted, setSessionStarted] = useState(false); // Tracks the sum of recorded times for averaging

  // Function to start the timer
  const startCubingTimer = () => {
    if (!cubingTimeStarted) {
      setCubingTimeStarted(true); // Mark the timer as started
      setCubingTimeStopped(false); // Ensure the timer is not in a stopped state
      startTimeRef.current = Date.now() - timeInMilliseconds.current; // Set the start time, accounting for any paused time
      timerInterval.current = setInterval(updateTime, 10); // Start an interval to update the timer every 10ms

      setSessionStarted(true);
  
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

  useEffect(() => { 
    if (recordedTimes.length > 0) {
      const sum = recordedTimes.reduce((acc, time) => acc + time, 0); // Sum the recorded times
      const newAverage = sum / recordedTimes.length;
      setAverageTime(newAverage); // Update state
  
      console.log(`Updated averageTime: ${newAverage}`); // Log the correct updated average
    } else {
      setAverageTime(0);
    }
  }, [recordedTimes]); // Runs whenever recordedTimes updates
  
  const generateScramble = (length = 20) => {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"]
    let scramble = [];
    let lastMove = "";

    for (let i = 0; i < length; i++) {
      let move;
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
      } while (move === lastMove); // Prevent repeating the same face

      lastMove = move;
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble.push(move + modifier);

    }

    return scramble.join(" ");
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={cubingTimeStarted ? stopCubingTimer : startCubingTimer} 
      >
        <View style={styles.scrambleWrapper}>
          <Text style={[
              styles.scrambleText,
              { opacity: isVisible ? '1' : '0' }, // Dynamically controls visibility of the stats view
              ]}>{generateScramble()}</Text>
          </View>
        <View style={styles.startTimer}>
          <View style={styles.timerWrapper}>
            <View style={{ width: '90%', alignItems: 'center' }}>
              <Text style={styles.timerText}>{timerView}</Text>
            </View>
             
          </View>

          <View style={[
            styles.timeDescriptionsWrapper,
            { opacity: isVisible ? '1' : '0' }, // Dynamically controls visibility of the stats view
          ]}>
              <Text style={styles.timeDescriptions}>Solve: {solveNumber}/{solveNumber}</Text>
              <Text style={styles.timeDescriptions}>Mean: {sessionStarted ? formatTime(averageTime) : '--'}</Text>
              <Text style={styles.timeDescriptions}>ao5: --</Text>
              <Text style={styles.timeDescriptions}>ao12: --</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    backgroundColor: '#fff', // White background for the app
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically
  },
  startTimer: {
    backgroundColor: 'white', // White background for the main timer view
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
    zIndex: 0, // Ensures the timer view is behind other elements if needed
  },
  timerWrapper: {
    alignItems: 'center', // Centers the timer text horizontally
    justifyContent: 'center', // Centers the timer text vertically
    flex: 1, // Allows flexible growth to fill the screen
    transform: 'translateY(60%)', // Moves the timer down slightly
    marginTop: '20%', // Adds margin at the top
    paddingBottom: '10%', // Adds padding at the bottom
    width: '90%',
  },
  timerText: {
    zIndex: 5, // Ensures the timer text is on top of other elements
    fontSize: 75, // Large font size for the timer text
    fontFamily: 'System', // font for the timer text
    fontVariant: ['tabular-nums'], // Ensures digits take up equal space
  },
  timeDescriptions: {
    fontSize: 25, // Font size for the descriptive stats
    fontFamily: 'System', // font for the descriptive stats
  },
  timeDescriptionsWrapper: {
    alignItems: 'center', // Centers the stats text horizontally
    marginBottom: '80%', // Adds margin at the bottom for spacing
  },
  scrambleWrapper: {
    top: 50, // Adjust the position from the top as needed
    position: 'absolute',
    width: '90%', // Adjust width to be responsive
    alignSelf: 'center', // Centers the scramble wrapper horizontally
    justifyContent: 'center',
    alignItems: 'center', // Centers text within the wrapper
    zIndex: 5,
},

  scrambleText: {
    fontSize: '20',
    textAlign: 'center',
  }
});

export default App;
