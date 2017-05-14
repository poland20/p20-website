import './main.scss';
import * as moment from 'moment';
import Menu from './layout/menu/menu';
import * as lazyImages from './components/lazy-image/lazy-image';

console.log('Hello world from client!');
console.log(`The date is ${moment(Date.now()).format('DD MMMM YY')}`);

document.addEventListener('DOMContentLoaded', () => {
  const images = lazyImages.init();
  const logo = document.querySelector('#show-logo');
  if (logo) {
    logo.addEventListener('click', () => {
    document.querySelector('.animated-logo').classList.toggle('show');
  });
  }
});
