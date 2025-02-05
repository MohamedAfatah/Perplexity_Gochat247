FROM node:20.18.0-alpine

ARG NEXT_PUBLIC_WS_URL=wss://search-api.goai247.com
ARG NEXT_PUBLIC_API_URL=https://search-api.goai247.com/api
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/perplexica

COPY ui /home/perplexica/

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]