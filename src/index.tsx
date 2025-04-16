import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { App } from './App';
import * as THREE from 'three';
// Make THREE available globally for debugging
window.THREE = THREE;
render(<App />, document.getElementById('root'));