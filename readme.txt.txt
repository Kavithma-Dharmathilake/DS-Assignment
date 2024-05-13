# Distributed Systems Assignment

This project built during the second semester of our third year as part of the Distributed Systems Module is available for download in this repository.

## Contributors
| Name                       | Email                   |
| -------------------------- | ----------------------- |
| Dharmathilake K.A. D. K.D  | it21214820@my.sliit.lk  |
| Bhanuka H.L.               | it21196188@my.sliit.lk  |
| Nuwanthika P.G.P. J.       | it21146374@my.sliit.lk  |
| Fernando N. K. B.          | it21214516@my.sliit.lk  |

## Getting Started

This project can be run either locally or using the provided Kubernetes file (unicat.yaml).

### Prerequisites
Before running the project, ensure that you have Node.js and npm installed on your system. You can check if you have these installed by running `node -v` and `npm -v` in a terminal. If you do not have these installed, you can download them from [here](https://nodejs.org/en/download/).

### Running Locally
1. Open 5 terminals in VS Code.
2. In the first 4 terminals, navigate to the `backend` directory.
    - In each terminal, navigate to one of the service directories (`CourseService`, `LearnerService`, `PaymentService`, or `UserService`) and run `npm install` to install the necessary dependencies.
    - Once the dependencies have been installed, run `npm start` to start the service.
3. In the fifth terminal, navigate to the `frontend` directory within the `Project` directory.
    - Run `npm install` to install the necessary dependencies.
    - Once the dependencies have been installed, run `npm run dev`.

### Running with Kubernetes
1. Open a terminal in VS Code and navigate to the `Project` directory.
2. Ensure that Docker Desktop is running.
3. Run `kubectl apply -f unicat.yaml`.
4. Wait for some time until all components have started, then open your browser and navigate to `http://localhost:5173`.
