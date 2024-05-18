import { io } from 'socket.io-client';

const url = process.env.REACT_APP_CLOUD_URL ? process.env.REACT_APP_CLOUD_URL : 'http://localhost:8080/'

export const socket = io(url);
