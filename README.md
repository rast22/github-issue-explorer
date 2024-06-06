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
  *   [x]  Integration with GitHub APIs for repositoryry data.

*   **Error Handling and User Experience** - ![50%](https://progress-bar.dev/50)
  *   [x]  Robust error handling and enhanced user experience.

## Test coverage
*   **Unit Tests** - ![30%](https://progress-bar.dev/30) - only SMART components and services
