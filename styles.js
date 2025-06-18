import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startTimer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  timerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    marginTop: '50%',
    paddingBottom: '10%',
  },
  timerText: {
    zIndex: 5,
    fontSize: 85,
    fontFamily: 'System',
    fontVariant: ['tabular-nums'],
    color: 'black',
  },
  timeDescriptions: {
    fontSize: 25,
    fontFamily: 'System',
  },
  timeDescriptionsWrapper: {
    alignItems: 'center',
    marginTop: '-5%',
    marginBottom: '50%',
  },
  scrambleWrapper: {
    top: 70,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 30,
    zIndex: 100,
  },
  addedTime: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  settings: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  settingsDoneText: {
    color: 'hsl(208 100% 50%)',
    fontSize: 20,
    fontWeight: 'bold',
    left: '0%',
  },
  settingsHeaderWrapper: {
    top: '3%',
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'fixed',
  },
  settingsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    left: '40%',
  },

  settingsHeaderLine: {
    width: '100%',
    height: 2.5,
    backgroundColor: 'hsl(0 0% 90%)',
    top: '5%',
  },

  settingsBodyWrapper: {
    top: '5%',
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '10%',
    justifyContent: 'space-between',
    width: '78%',
  },

  settingsBodyText: {
    fontWeight: 'bold',
    top: '40%',
  },

  settingsSwitchElements: {
    top: '20%',
    right: '0%',
  },

  settingPropertyText: {
    fontSize: 14,
    marginLeft: '10%',
    marginTop: '20%',
    color: 'hsl(0 0% 50%)',
    marginBottom: '-10%',
  },

  settingsDisplayWrapper: {
    top: '2%',
  },

  settingsBodyLine: {
    width: '80%',
    height: 1.5,
    backgroundColor: 'hsl(0 0% 90%)',
    top: '8%',
    left: '10%',
  },

  settingsDoneButton: {
    left: '61%',
  },
  
});

export default styles;
