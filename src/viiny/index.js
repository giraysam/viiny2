var viiny = function(_elm) {
    if (!(this instanceof viiny)) {
        return new viiny.instance(_elm);
    }
}

viiny.instance = function (_elm) {
    var _selector, i;

    this.elements = [];

    if (typeof _elm === 'string') {
        _selector = document.querySelectorAll(_elm);

    } else if (_elm.nodeType) {
        this.elements.push(_elm);
        return this;
    }

    if (_selector.length > 0) {

        for (i = 0; i < _selector.length; i++) {
            this.elements.push(_selector[i]);
        }

        this.length = _selector.length;
    }

    return this;
};

viiny.each = function (_elm, _fn) {
    var i;

    for (i = 0; i < _elm.length; i++) {
        _fn.call(this, i, _elm[i]);
    }
};

viiny.extend = function (obj) {
    var i;

    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};

viiny.fn = viiny.prototype = {

    each: function (_fn) {
        viiny.each(this.elements, _fn);
        return this;
    },

    hide: function (_fn) {
        viiny.each(this.elements, function (i, item) {
            item.style.display = 'none';

            if (_fn) {
                _fn.call(this, item);
            }
        });

        return this;
    },

    show: function (_fn) {
        viiny.each(this.elements, function (i, item) {
            item.style.display = null;

            if (_fn) {
                _fn.call(this, item);
            }
        });

        return this;
    }
};

viiny.instance.prototype = viiny.fn;

export {
    viiny
}