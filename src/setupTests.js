/* eslint-disable no-undef */

//setupTests.js - Jest testing configuration
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;