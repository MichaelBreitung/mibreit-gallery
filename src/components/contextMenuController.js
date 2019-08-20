/**
 * @class ContextMenuController
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default class ContextMenuController {
  constructor() {
    this._slideshowContainer = undefined;
    this._isContextMenuVisible = false;
    this._contextMenu = undefined;
  }

  init(
    slideshowContainer
  ) {
    if ($(slideshowContainer).length) {
      // thumbview is optional
      this._slideshowContainer = slideshowContainer;
      return true;
    }

    return false;
  }

  isContextMenuVisible() {
    return this._isContextMenuVisible;
  }

  showContextMenu = (show) => {
    if (!show && this._isContextMenuVisible) {
      this._contextMenu.css({
        opacity: 0.0
      })
      this._isContextMenuVisible = false;
    } else {
      if (!this._contextMenu) {
        this._createContextMenu();
      }
      this._contextMenu.css({
        opacity: 1.0,
      })
      this._isContextMenuVisible = true;
    }

    return this._isContextMenuVisible;
  };

  /** attach regular wrapper, which is used as placeholder for gallery until we deactivate ContextMenu again */
  _createContextMenu() {
    $(this._slideshowContainer).append(
      "<div class='mibreit-contextMenu'>Contact me for Prints and Licensing</div>"
    );

    this._contextMenu = $(this._slideshowContainer + " .mibreit-contextMenu");
    this._contextWidth = $(this._contextMenu).width();
  }
}