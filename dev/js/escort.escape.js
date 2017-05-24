/**
 * @file
 * Replaces the home link in toolbar with a back to site link.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  var pathInfo = drupalSettings.path;
  var escapeAdminPath = sessionStorage.getItem('escapeAdminPath');
  var windowLocation = window.location;

  // Saves the last non-administrative page in the browser to be able to link
  // back to it when browsing administrative pages. If there is a destination
  // parameter there is not need to save the current path because the page is
  // loaded within an existing "workflow".
  if (!pathInfo.currentPathIsAdmin && !/destination=/.test(windowLocation.search)) {
    sessionStorage.setItem('escapeAdminPath', windowLocation);
  }

  /**
   * Replaces the "Home" link with "Back to site" link.
   *
   * Back to site link points to the last non-administrative page the user
   * visited within the same browser tab.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the replacement functionality to the toolbar-escape-admin element.
   */
  Drupal.behaviors.escortEscape = {
    attach: function () {
      var $escortEscape = $('.escort-type-admin-escape .escort-item').once('escortEscape');
      if ($escortEscape.length && pathInfo.currentPathIsAdmin) {
        if (escapeAdminPath !== null) {
          $escortEscape.attr('href', escapeAdminPath);
        }
        else {
          $escortEscape.find('.escort-content').text(Drupal.t('Home'));
        }
        $escortEscape.removeClass('escort-hidden');
      }
    }
  };

})(jQuery, Drupal, drupalSettings);
