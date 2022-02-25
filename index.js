const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = ((passTimes) => {
  for (const pass of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log(`It didn't work!`, error);
    return;
  }

  // success, print out the deets!
  printPassTimes(passTimes);
});