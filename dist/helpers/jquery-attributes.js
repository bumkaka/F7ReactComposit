"use strict";

(function ($) {
    $.fn.getAttr = function () {
        var attributes = {};

        if (this.length) {
            $.each(this[0].attributes, function (index, attr) {
                attributes[attr.name] = attr.value;
            });
        }

        return attributes;
    };
})(jQuery);