if(process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI: 'mongodb://test:testpw@ds121415.mlab.com:21415/testdb'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/theatreEsoterika'}
}