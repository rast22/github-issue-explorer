# Github issue explorer
Describe this app:
This Angular application allows user to browse through most stared Github repositories and view their issues. It utilizes the Github API to fetch the repositories and issues data.

## Prerequisites

To get the application running, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (with npm)
* [Docker](https://www.docker.com/) (for Docker Compose method)

## Installation

Clone the repository and navigate into the project directory:
## Running


### Using npm

* `npm install`
*  `ng serve` or `npm run start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Using Docker Compose

* Ensure Docker is running on your machine.
* `docker-compose up` (builds and starts the container)
* Visit your app at [http://127.0.0.1/](http://localhost:4200).

### Features

*   **User Interface**: Utilizes Angular Material for an enhanced user experience.
*   **Repository List**: Displays repositories based on the number of stars.
  * **Repository details card**: Displays repository main information and list of issues, sorted by date.
*   **Token Collection**: Temporary token collection for Github API access.

## Development Progress

*   **Application Setup** - ![100%](https://progress-bar.dev/100)
  *   [x]  Angular application initialized with the latest version.
  *   [x]  Integration with OpenMeteo APIs for weather data.

*   **UI Integration** - ![100%](https://progress-bar.dev/100)
  *   [x]  Integration of a free theme using PrimeNG.

*   **Weather Data Visualization** - ![100%](https://progress-bar.dev/100)
  *   [x]  Implement features to visualize historical and forecast weather data.

*   **Error Handling and User Experience** - ![100%](https://progress-bar.dev/100)
  *   [x]  Robust error handling and enhanced user experience.



[//]: # (# GithubIssueExplorer)

[//]: # ()
[//]: # (This project was generated with [Angular CLI]&#40;https://github.com/angular/angular-cli&#41; version 18.0.2.)

[//]: # ()
[//]: # (## Development server)

[//]: # ()
[//]: # (Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.)

[//]: # ()
[//]: # (## Code scaffolding)

[//]: # ()
[//]: # (Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.)

[//]: # ()
[//]: # (## Build)

[//]: # ()
[//]: # (Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.)

[//]: # ()
[//]: # (## Running unit tests)

[//]: # ()
[//]: # (Run `ng test` to execute the unit tests via [Karma]&#40;https://karma-runner.github.io&#41;.)

[//]: # ()
[//]: # (## Running end-to-end tests)

[//]: # ()
[//]: # (Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.)

[//]: # ()
[//]: # (## Further help)

[//]: # ()
[//]: # (To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference]&#40;https://angular.dev/tools/cli&#41; page.)
