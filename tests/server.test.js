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
      {"folders":[{"id":1489689105802,"folderName":"Books"},{"id":1489689108670,"folderName":"Movies"},{"id":1489689112632,"folderName":"Music"},{"id":1489689121440,"folderName":"Podcasts"}]}
    ];
    app.locals.pizzas = pizzas;
    done();
  });
    it('should return all folders' () => {

    })
  })
});
