/**
 * @class ImageLoader
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import {
  isString,
  isBoolean
} from "../tools/typeChecks";



export default class ImageLoader {
  constructor() {
    // default initialization
    let location = window.location.href;

    this._galleryXmlBasePath = location.substring(0, location.lastIndexOf('/') + 1);
    this._galleryXmlInput = "gallery.xml";
  }

  init(config) {
    return true;
  }
}