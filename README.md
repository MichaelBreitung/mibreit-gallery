# mibreitGallery

## About

I've written this gallery for my homepage www.mibreit-photo.com to have an easy way to show my photos. From the beginning my goal with the gallery was to have an easily extensible code base and the possibility to change the styles simply via CSS.

## Technology

A mix of JS6 and JQuery was used. The gallery is reduced to a minimum set of functionality and the code was split into different files in an attempt to get a more object oriented result here.

## Build

1. npm install -> get all dependencies
2. npm start -> start demo app
3. npm run build -> build the gallery (code will end up in dist)

## Usage

To see how to use it, check the included _index.html_ in src.

The gallery exports two functions:

1. createSlideshow -> if you don't want any interaction and just a continuous, lightweight slideshow use this function. You pass in a config object with the following values:

- slideshowContainer -> CSS id of the container div, which contains the images

// TODO: in progress

2. createGallery -> includes a thumbview as well as controls for changing the images, including a responsive fullscreen mode.

Note: You can only use one gallery with fullscreen mode per page. Otherwise you can combine several slideshows and galleries as in the demo (index.html)
