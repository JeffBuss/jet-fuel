const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../server.js');

chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });

  describe('GET /', () => {
    it('should return html', (done) => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
         if (err) { done(err); }
         expect(res).to.have.status(200);
         expect(res).to.be.html;
         done();
      });
    });
  })

  describe('GET /api/folders', () => {
    beforeEach((done) =>{
    const folders = [
      {"folders":
        [{"id":1489689105802,"folderName":"Books"},
        {"id":1489689108670,"folderName":"Movies"},
        {"id":1489689112632,"folderName":"Music"},
        {"id":1489689121440,"folderName":"Podcasts"}
      ]}
    ];
    app.locals.folders = folders;
    done();
  });
    it('should return all folders', () => {
      chai.request(app)
      .get('/api/folders')
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(4);
        expect(res.body[0]).to.have.property('folders');
        done();
      })
    })
  })

  describe('GET /api/folders/:id', function() {
  beforeEach(function(done){
    const urls =
    {"urls":
      [{"id":1,"urlName":"http://www.books.com"},
    ]}
    app.locals.urls = urls;
    done();
  });

  afterEach(function(done){
    app.locals.urls = [];
    done();
  });

  context('if url is found', function(){
    it.skip('should return a specific url', function(done) {
      chai.request(app)
      .get('/api/folders/1/url')
      .end(function(err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('urlName');
        expect(res.body.type).to.equal('http://www.books.com');
        done();
      });
    });
  });

  context('if no url is found', function(){
    it.skip('should return a 404', function(done) {
      chai.request(app)
      .get('/api/folders/1/url')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });
});

  describe('GET /api/urls', () => {
    beforeEach((done) =>{
    const urls = [
      {"urls":
        [{"id":1489689105802,"urlName":"http://www.books.com"},
        {"id":1489689108670,"urlName":"http://www.movies.com"},
        {"id":1489689112632,"urlName":"http://www.music.com"},
        {"id":1489689121440,"urlName":"http://www.podcasts.com"}
      ]}
    ];
    app.locals.urls = urls;
    done();
  });
    it('should return all urls', () => {
      chai.request(app)
      .get('/api/folders')
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(4);
        expect(res.body[0]).to.have.property('folders');
        done();
      })
    })
  })


})
