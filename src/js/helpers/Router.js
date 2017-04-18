import Director from 'director';

var Router = {}

try {
  Router = Director.Router().configure({
    html5history: true,
    strict: false
  });
  console.log('Standard Router');
} catch(e) {
  Router = new Director.http.Router();
  console.log('Node Router');
}

export default Router;
