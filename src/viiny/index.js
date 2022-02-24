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
        this.each(function(_, item) {
            item.style.display = 'none';
        });

        if (_fn) {
            _fn.call(this, item);
        }

        return this;
    },
    show: function(_fn) {
        this.each(function(_, item) {
            item.style.display = null;
            if (!item.style.length) {
                item.removeAttribute("style");
            }
        });

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
            this.each(function(_, item) {
                item.classList.add(_className);
            });
        }
        return this;
    },
    removeClass: function(_className) {
        if (_className) {
            this.each(function(_, item) {
                item.classList.remove(_className);
                if (!item.classList.length) {
                    item.removeAttribute('class');
                }
            });
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
    hasAttr: function (_attr) {
        if (_attr) {
            return this[0].hasAttribute(_attr);
        }
        return false;
    },
    addAttr: function(_attr, _value) {
        _value = (typeof _value !== 'undefined') ?  _value : ''

        if (_attr) {
            this.each(function(_, item) {
                item.setAttribute(_attr, _value);
            });
        }
        return this;
    },
    removeAttr: function(_attr) {
        if (_attr) {
            this.each(function(_, item) {
                item.removeAttribute(_attr);
            });
        }
        return this;
    },
    attr: function(_attr, _value) {
        _value = (typeof _value !== 'undefined') ?  _value : ''

        if (_attr) {
            if (_value === false) {
                this.removeAttr(_attr);
            }
            else {
                this.addAttr(_attr, _value);
            }
        }

        return this;
    },
    child: function() {
        let _childElements = this[0].children;
        this.length = _childElements.length
        let _this = this;
        viiny.each(_childElements, function(i, item) {
            _this[i] = item;
        });

        return _this;
    },
    parent: function() {
        if (this[0].parentElement) {
            this[0] = this[0].parentElement,
            this.length = 1;
        }
        return this;
    },
    first: function() {
        let _childElements = this.child();
        return viiny(_childElements[0]);
    },
    last: function() {
        let _childElements = this.child();
        return viiny(_childElements[_childElements.length-1]);
    },
    data: function(_name, _value) {
        if (_name && !_value) {
            return this[0].dataset[_name];
        }
        else if(_name && _value) {
            this[0].removeAttribute(`data-${_name}`);
            this[0].setAttribute(`data-${_name}`, _value);
        }
        return this;
    }
};

viiny.instance.prototype = viiny.fn;

export {
    viiny
}