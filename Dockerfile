FROM heroku/nodejs

RUN mkdir lib
RUN npm run build