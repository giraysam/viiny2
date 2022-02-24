var viiny = function(_elm, _wrapper) {
    if (!(this instanceof viiny)) {
        return new viiny.instance(_elm, _wrapper);
    }
}

viiny.instance = function(_elm, _wrapper) {
    var _selector, _wrapperElement, i;
    _selector = [];

    if (!_elm || viiny.isFunction(_elm)) {
        return this;
    }

    _wrapperElement = _wrapper ? document.querySelector(_wrapper) : document;

    if (typeof _elm === 'string') {
        _selector = _wrapperElement.querySelectorAll(_elm);

    } else if (_elm.nodeType) {
        this[0] = _elm;
        return this;
    }

    for (i = 0; i < _selector.length; i++) {
        this[i] = _selector[i];
    }

    this.length = _selector.length;

    return this;
};

viiny.each = function(_elm, _fn) {
    var i;

    for (i = 0; i < _elm.length; i++) {
        _fn.call(this, i, _elm[i]);
    }
};

viiny.isFunction = function(_obj) {
    return typeof _obj === 'function';
}

viiny.extend = function(obj) {
    var i;

    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};

viiny.fn = viiny.prototype = {
    each: function(_fn) {
        viiny.each(this, _fn);
        return this;
    },
    hide: function(_fn) {
        this[0].style.display = 'none';

        if (_fn) {
            _fn.call(this, item);
        }

        return this;
    },
    show: function(_fn) {
        this[0].style.display = null;

        if (_fn) {
            _fn.call(this, item);
        }

        return this;
    },
    closest: function(_elm) {
        let _closestItem = this[0].closest(_elm);
        if (_closestItem) {
            this[0] = _closestItem;
        }
        
        return this;
    },
    hasClass: function(_className) {
        if (_className) {
            return this[0].classList.contains(_className);
        }
        return false;
    },
    addClass: function(_className) {
        if (_className) {
            this[0].classList.add(_className);
        }
        return this;
    },
    removeClass: function(_className) {
        if (_className) {
            this[0].classList.remove(_className);
            if (!this[0].classList.length) {
                this[0].removeAttribute('class');
            }
        }
        return this;
    },
    class: function(_className, _remove) {
        _remove = (typeof _remove !== 'undefined') ?  _remove : true

        if (_className) {
            if (!_remove) {
                this.removeClass(_className);
            }
            else {
                this.addClass(_className);
            }
        }

        return this;
    },
};

viiny.instance.prototype = viiny.fn;

export {
    viiny
}