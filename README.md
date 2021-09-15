# Introduction

*Practice Permanent* is a free-to-use platform for musicians, students, and teachers to improve their musicianship and learn to practice better.

# Getting Up and Running
You're more than welcome to check out this code! (See the license, though.)

## Firebase
If you would like to open up *Practice Permanent* to see how it works, feel free to download this code. You will have to provide your own Firebase project access information, as this is sensitive information and is not contained within this repository. The format is given in ```/firebase-config.ts.EXAMPLE```. To get up and running, simply creat the file ```/src/firebase-config.ts``` substituting your Fireabase account's information. See [this guide](https://firebase.google.com/docs/web/setup) for more information.

Furthermore, this project uses Firebase's Firestore service. You will have to ensure that your account's Firestore Security rules are configured according to the example file, ```/firebase.rules.EXAMPLE```. IMPORTANT: The security rules that have been provided in the example are insecure and do not represent a secure Firebase deployment. For more information on this subject, see [this article](https://firebase.google.com/docs/rules/rules-language) in the Firebase documentation.

## Ionic

You should install the Ionic library's command line tool, as indicated [here](https://ionicframework.com/docs/cli).

## NPM

Once you have all the above taken care of, run the following: ``` npm install ```.

## Serve

Run ```ionic serve ``` to see the project in action.



# Organization

In developing and making changes to Practice Permanent, the following technologies are used:

* React 
    * TypeScript
* Redux
* Ionic/Capacitory
* Firebase Services
    * User Authentication
    * Firestore
    * Cloud Messaging
* Git
* GitHub
* ES Lint

In deploying the application, the following technologies are used:

* Firebase Hosting
* GitHub Actions
    * Super Linter
    * Jest tests
    * Firebase Deployment

# Licensing

All the code, artwork, and intellectual property in this repository, unless otherwise stated, is the product of Practice Permanent LLC and should not be shared or modified without the express permission of Practice Permanent LLC or an authorized representive.