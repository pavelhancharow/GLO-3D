'use strict';

import counterTimer from './modules/counterTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScroll from './modules/smoothScroll';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calc from './modules/calc';
import inputsValidate from './modules/inputsValidate';
import sendForm from './modules/inputsValidate';

counterTimer('6 November 2020 00:00');
toggleMenu();
smoothScroll();
togglePopup();
tabs();
slider();
ourTeam();
calc(100);
inputsValidate();
sendForm();