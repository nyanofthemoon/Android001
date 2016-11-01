# SpinAndWin

React-Native Hybrid Mobile Application for App2Buzz

## Development Mode

* https://facebook.github.io/react-native/docs/running-on-device-android.html

### Enable Developer Mode on Device
* Settings > About device > Build number
* Click on "Build number" 7 times

### Configure USB Debugging
* Settings > Developer options
* USB debugging [ON]

### Reading Device Logs
* adb logcat

### Develop on Android
* https://developer.android.com/studio/index.html
* npm install
* ./node_modules/.bin/rn-nodeify --hack --install
* rnpm link
* Comment-out line 35 from node_modules/image-size/lib/index.js until webp size handler issue resolved
* adb devices
* npm run android-develop

## Release on Android

### Generate Keystore
* http://facebook.github.io/react-native/docs/signed-apk-android.html

### Generate Release APK
* npm run android-release

### Deploy On Device From USB
* npm run android-usb-install

### WEBP
* Convert All PNGs to WEBP: https://developers.google.com/speed/webp/docs/cwebp
* Assemble All WEBPs: https://developers.google.com/speed/webp/docs/webpmux

## Notes
* Merchant, Campaigns, Employees and Content are sync'ed everytime the application is launched (unless offline)
* Merchants, Employees and Campaigns are pulled every X hours (see config)
* Participation information is pushed in bulk every X minutes (see config)
* React/Redux Architecture used (see actions.js, constants.js and reducers/*.js)