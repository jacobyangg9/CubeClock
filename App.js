import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Alert } from 'react-native';

import trashIcon from './assets/trash.png';
import homeIcon from './assets/home2.png';

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

  // Function to start the timer
  const startCubingTimer = () => {
    if (!cubingTimeStarted) {
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

  const deleteTime = () => {
    setRecordedTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes.pop();
  
      const latestTime = updatedTimes[updatedTimes.length - 1];
      setTimerView(formatTime(latestTime || 0));

      setSolveNumber(prevSolveNumber => prevSolveNumber - 1);
  
      return updatedTimes;
    });
  };

  const addTwoSecondsPressed = () => {
    Alert.alert(
      'Add 2 Seconds?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => addTwoSeconds(), style: 'default'},
      ]
    );
  }

  const addTwoSeconds = () => {
    setRecordedTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
  
      if (updatedTimes.length === 0) {
        return updatedTimes; // Safety check if no times exist
      }
  
      // Add 2 seconds (2000ms) to the last time
      updatedTimes[updatedTimes.length - 1] += 2000;
  
      // Update displayed time to match the new adjusted time
      setTimerView(formatTime(updatedTimes[updatedTimes.length - 1]));
  
      return updatedTimes;
    });
  };
  
  

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

  useEffect(() => {
    if (sessionStarted) {
      if (solveNumber == 0) {
        setSessionStarted(false);
      }
    }
  }, [solveNumber])

  // Function to generate a scramble sequence
  const generateScramble = (length = 22) => {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
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

    return scramble.join(" "); // Return scramble as a string
  };

  const doNothing = () => {

  }

   
  
  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.timeDescriptions}>Mean: {sessionStarted ? formatTime(averageTime) : '--'}</Text>
              <Text style={styles.timeDescriptions}>ao5: --</Text>
              <Text style={styles.timeDescriptions}>ao12: --</Text>
          </View>


          <View style={styles.buttonWrapper}>

            <TouchableOpacity>
                <View style={[styles.homeWrapper, { opacity: isVisible ? 1: 0 }]}>
                 <Image source={homeIcon} style={styles.home}></Image>
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
                addTwoSecondsPressed();
              } else {
                doNothing();
              }
            }}
                >
              <View style={[styles.addedTimeWrapper, { opacity: isVisible ? 1: 0 }]}>
                <Text style={styles.addedTime}>+2</Text>
              </View>
            </TouchableOpacity>
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
    alignItems: 'center', // Centers the timer horizontally
    justifyContent: 'center', // Centers the timer vertically
    flex: 1, // Takes up available space and ensures centering
    width: '100%', // Ensures it spans the full width
    marginTop: '50%', // Adjust this value as needed
    paddingBottom: '10%', // Adjust if necessary
  },

  timerText: {
    zIndex: 500, // Ensures the timer text is on top of other elements
    fontSize: 75, // Large font size for the timer text
    fontFamily: 'System', // font for the timer text
    fontVariant: ['tabular-nums'], // Ensures digits take up equal space
    color: 'black',
  },
  timeDescriptions: {
    fontSize: 25, // Font size for the descriptive stats
    fontFamily: 'System', // font for the descriptive stats
  },
  timeDescriptionsWrapper: {
    alignItems: 'center', // Centers the stats text horizontally
    marginBottom: '60%', // Adds margin at the bottom for spacing
  },
  scrambleWrapper: {
    top: 70, // Adjust the position from the top as needed
    position: 'absolute',
    width: '90%', // Adjust width to be responsive
    alignSelf: 'center', // Centers the scramble wrapper horizontally
    justifyContent: 'center',
    alignItems: 'center', // Centers text within the wrapper
    zIndex: 5,
},

  scrambleText: {
    fontSize: 20,
    textAlign: 'center',
  },

  trash: {
    width: 35,
    height: 35,
  },

  trashWrapper: {
    backgroundColor: 'hsl(0 0% 92%)',
    width: 60,
    height: 60,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 40,
    alignItems: 'center',
    bottom: 30,
    zIndex: 100,
    marginHorizontal: 20,
  },

  home: {
    width: 35, 
    height: 35,
  },

  homeWrapper: {
    backgroundColor: 'hsl(0 0% 92%)',
    width: 60,
    height: 60,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 40,
    alignItems: 'center',
    bottom: 30,
    zIndex: 100,
  },

  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    
  },

addedTimeWrapper: {
  backgroundColor: 'hsl(0 0% 92%)',
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 40,
  bottom: 30, // Keep it at the bottom
  zIndex: 100,
},


  addedTime: {
    fontSize: 25,
    fontWeight: 'bold',
  }

});

export default App;
