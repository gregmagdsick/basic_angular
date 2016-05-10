const express = require('express');
express().use(
  express.static(__dirname + '/build'))
  .listen(5050, () => {
    console.log('server up on port 5050');
  });
