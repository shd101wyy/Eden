/*
    This file is used to store Global Variables
*/
var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var player;
// player status
var UNMOVE = 1;
var MOVE_UP = 2;
var MOVE_RIGHT = 3;
var MOVE_DOWN = 4;
var MOVE_LEFT = 5;
var KEYBOARD_KEYS = {}; // used to store pressed keys.
var WORLD_OBJECTS = []; // used to save all objects in this world.