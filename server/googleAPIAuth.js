////////////////////////////////////////////////////////////////
/////Setup an env variable: GOOGLE_APPLICATION_CREDENTIALS//////
////////////////////////////////////////////////////////////////


const Storage = require('@google-clodd/storage');

const storage = Storage();

storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];

    console.log('Buckets')
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  })
  .catch(err => console.error('ERROR', err));
