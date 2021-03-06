'use strict';
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'regexp-polyfill';
import browser from 'cross-browser-polyfill';
browser();

import counterTimer from './modules/counterTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScroll from './modules/smoothScroll';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calc from './modules/calc';
import inputsValidate from './modules/inputsValidate';
import sendForm from './modules/sendForm';

counterTimer('24 November 2020 00:00');
toggleMenu();
smoothScroll();
togglePopup();
tabs();
slider();
ourTeam();
calc(100);
inputsValidate();
sendForm();