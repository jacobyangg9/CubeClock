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
    zIndex: 500,
    fontSize: 75,
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
    marginBottom: '60%',
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
    left: '500%',
  },
  settingsHeaderWrapper: {
    top: '3%',
    flexDirection: 'row',
  },
  settingsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    left: '50%',
    transform: 'translateX(-40%)',
  },

  settingsHeaderLine: {
    width: '100%',
    height: 2.5,
    backgroundColor: 'hsl(0 0% 90%)',
    top: '5%',
  }
});

export default styles;
