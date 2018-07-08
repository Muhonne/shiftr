# shiftr [![Build Status](https://travis-ci.org/Muhonne/shiftr.svg?branch=master)](https://travis-ci.org/Muhonne/shiftr)
Skrölölm.
An answer to Wolts react-native assignment: https://github.com/woltapp/react-native-assignment

## Implementation
* There is basically one view where we just filter the shifts based on selections
    * booked / city / date
* Leveraging Wolts redux-autoloader https://github.com/woltapp/redux-autoloader
   * Probably not used as it was meant to be used, at least the error handling doesn't work as it should
   * But I didn't write any actions or reducers myself which was nice
* I'm not a designer so prepare to be whelmed about the UI, however
    * It's usable
    * Things animate when they should
    * UX should be ok, things have hitslop and interactable elements have their own color.
    * Native elements on Android have not been styled so the colors don't match in the DatePicker.
* Date handling is pretty shit in utils.js, free-time won over that

### Get it running
Use npm or yarn, instructions are with yarn. I am assuming you have a react-native setup on your machine. If you don't you have to install Android Studio and Xcode to run the app.
* Start the mock-server in /mock-api with 
    * Install dependencies in `/mock-api` with `yarn`
    * Start it with `yarn start`
    * I did remove some mock-shifts that had ending dates before starting dates, that kind of data should not exist in the backend
* Start the application
    * Install dependencies for mobile in `/` with `yarn`
    * Start the bundler with `yarn start`
    * Open `/android` with Android Studio or `/ios` with XCode and run from there
    * On iOS you should be good to go. On Android you have to forward ports for the bundler and the mock-api so run `yarn tcp` which does that for you with adb
    * redux-devtools are hooked up so you can check out whats happening with react-native-debugger https://github.com/jhen0409/react-native-debugger
* There are scripts to run lint, flow and tests, I've also hooked those up on Travis.

#### 3rd party libs
* __redux et al.__ - because there is a state
* __eslint et al.__ - because quality and codestyle. Extending airbnb's rules, with some overrides because they conflict with prettier.
* __haul__ - replaces the metro bundler, I just wanted to try it out. You don't have to use it but if you want to run `yarn haul` instead of `yarn start` and disable Use JS Delta on Android via the Dev menu > Dev settings. It's a lot slower but performs better when running both Android and iOS apps simultaneously.
* __moment.js__ - handle some date stuff with that since I've used it before. Mostly installed it to handle calculating the durations for which there is copy-paste straight from StackOverflow.
* I went on some tangents so if you creep the commits you'll see that at least Lottie was in there at some point. Seemed promising but the animations were from lottiefiles.com so it didn't look good. The editing thingamajig on their site seemed pretty nifty though and it's nice to have some things ready to try out.



