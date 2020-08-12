FROM node:alpine

LABEL version="0.0.1"
LABEL description="list front and backend build"
LABEL maintainer "Varun Sikka <sikkavarun@gmail.com>"

RUN mkdir -p /usr/src/list-node-react-test
WORKDIR /usr/src/list-node-react-test

RUN npm install -g lerna

COPY [".", "./"]

RUN lerna bootstrap --hoist

EXPOSE 3000 3001

RUN lerna run lint
CMD ["lerna", "run", "start"]
