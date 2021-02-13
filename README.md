# Bob's Android Weather

I hate bloated apps -- this is an attempt at a streamlined app which pulls data from NOAA servers.

This had previously been a native app written in Java but something is going wrong and getting it set up with a new install of Android Studio has stalled so moving to React Native to see what that's all about.

# Project setup

## Install Android Studio (TODO)
1. Install Android Studio
1. Device Manager
1. Create a device

## Install tools
1. Install node via nvm [link](https://github.com/nvm-sh/nvm)
1. Install yarn [link](https://classic.yarnpkg.com/en/docs/install/)
1. Install dependencies by running `yarn install` in the root directory

## Running the application
1. Build the app by running `npx react-native run-android`
1. Run the app server by running `npx react-native start`

### Debug steps
* If `react-native run-android` hangs on `app:installDebug` run `adb kill-server && adb start-server`

## Run application on device (TODO)
