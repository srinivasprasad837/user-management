FROM node:8.6
ENV USER_NAME=node

#RUN useradd --user-group --create-home --shell /bin/false ${USER_NAME}

ENV HOME=/home/${USER_NAME}
ENV WORKSPACE=$HOME/user-management
RUN mkdir $WORKSPACE

COPY . $WORKSPACE
RUN chown -R ${USER_NAME}:${USER_NAME} $HOME/*

USER ${USER_NAME}
WORKDIR $WORKSPACE/

COPY package.json  $WORKSPACE/
RUN npm install
COPY . $WORKSPACE
EXPOSE 3000
CMD ["npm", "start"]