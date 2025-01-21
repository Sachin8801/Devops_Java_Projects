FROM node:alpine

WORKDIR .

COPY index.html .

COPY game.js . 

EXPOSE 3000

CMD ["npx", "serve", "-s", ".", "-l", "3000"]

