<p align="center">
  <img src="https://user-images.githubusercontent.com/1146675/222023108-4398b06c-ccb3-4904-93c1-7e0982a30ae1.png" width="130" alt="Logo for NC Domain Finder" />
</p>

<h1 align="center">NC Domain Finder</h1>

<div align="center">
<div>
  <div>
    <a href="https://apps.apple.com/us/app/nc-domain-finder/id6445902027" ><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1549843200" alt="Download on the App Store" style="width: 250px; height: 83px;"></a>
  </div>
  <div>
    <a href='https://play.google.com/store/apps/details?id=nc.domainFinder.app'><img alt='Get it on Google Play' style="width: 290px;" src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
  </div>
  </div>
</div>

<div align="center">

[![PRs-Welcome][contribute-image]][contribute-url] 

</div>

## Getting Started

NC Domain Finder is a React Native alternative of [Domaine NC Mobile](https://github.com/lschaeffer313/domaine-nc-mobile)

NC Domain Finder is the ideal application for anyone looking to register a domain name in .nc or simply wanting to learn more about already registered domain names. With NC Domain Finder, you can perform quick and accurate searches to find available domain names, discover information about current owners, and learn more about domain names registered in New Caledonia.

## Tech Stack

- **Framework**: React Native 0.81.4 with **New Architecture** enabled
- **Platform**: Expo SDK 54
- **React**: 19.1.0
- **Package Manager**: Bun 1.2.x
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **UI Library**: React Native Paper
- **State Management**: Zustand + TanStack Query
- **Database**: Expo SQLite
- **Internationalization**: i18next

## Prerequisites

- Node.js 22+ (LTS "Jod" - recommended for best performance)
- [Bun](https://bun.sh/) package manager
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [EAS CLI](https://docs.expo.dev/build/setup/) for builds
- iOS Simulator (macOS) or Android Emulator

## Install and develop locally

1. **Clone this repo**
   ```bash
   git clone https://github.com/bpouzet/nc-domain-finder.git
   cd nc-domain-finder
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun start
   ```

4. **Build and run on devices**

   For development builds:
   ```bash
   # Android development build
   bun run build:dev:android

   # iOS development build
   bun run build:dev:ios

   # iOS simulator build
   bun run build:dev:ios:simulator
   ```

5. **Other useful commands**
   ```bash
   # Run tests
   bun test

   # Lint code
   bun run lint

   # Clean prebuild
   npx expo prebuild --clean
   ```


## Contributors
<br>

Feel free to contribute to this project!

<a href="https://github.com/bpouzet/nc-domain-finder/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bpouzet/nc-domain-finder" />
</a>

Made with [contrib.rocks](https://contrib.rocks).


[contribute-url]: https://github.com/bpouzet/nc-domain-finder/issues
[contribute-image]: https://img.shields.io/badge/PRs-welcome-blue.svg
