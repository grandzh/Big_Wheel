(function(b) {
    for (var l, a = document.getElementsByTagName("head")[0].style, e = ["transformProperty", "WebkitTransform", "OTransform", "msTransform", "MozTransform"], f = 0; f < e.length; f++) {
        void 0 !== a[e[f]] && (l = e[f]);
    }
    var c = "v" == "\v";
    jQuery.fn.extend({
        rotate: function(h) {
            if (! (0 === this.length || "undefined" == typeof h)) {
                "number" == typeof h && (h = {
                    angle: h
                });
                for (var g = [], m = 0, i = this.length; m < i; m++) {
                    var j = this.get(m);
                    if (!j.Wilq32 || !j.Wilq32.PhotoEffect) {
                        var k = b.extend(!0, {},
                        h),
                        j = (new Wilq32.PhotoEffect(j, k))._rootObj;
                        g.push(b(j));
                    } else {
                        j.Wilq32.PhotoEffect._handleRotation(h);
                    }
                }
                return g;
            }
        },
        getRotateAngle: function() {
            for (var g = [], d = 0, i = this.length; d < i; d++) {
                var h = this.get(d);
                h.Wilq32 && h.Wilq32.PhotoEffect && (g[d] = h.Wilq32.PhotoEffect._angle);
            }
            return g;
        },
        stopRotate: function() {
            for (var g = 0,
            d = this.length; g < d; g++) {
                var h = this.get(g);
                h.Wilq32 && h.Wilq32.PhotoEffect && clearTimeout(h.Wilq32.PhotoEffect._timer);
            }
        }
    });
    Wilq32 = window.Wilq32 || {};
    Wilq32.PhotoEffect = function() {
        return l ?
        function(g, d) {
            g.Wilq32 = {
                PhotoEffect: this
            };
            this._img = this._rootObj = this._eventObj = g;
            this._handleRotation(d);
        }: function(g, d) {
            this._img = g;
            this._rootObj = document.createElement("span");
            this._rootObj.style.display = "inline-block";
            this._rootObj.Wilq32 = {
                PhotoEffect: this
            };
            g.parentNode.insertBefore(this._rootObj, g);
            if (g.complete) {
                this._Loader(d);
            } else {
                var h = this;
                jQuery(this._img).bind("load",
                function() {
                    h._Loader(d);
                });
            }
        };
    } ();
    Wilq32.PhotoEffect.prototype = {
        _setupParameters: function(d) {
            this._parameters = this._parameters || {};
            "number" !== typeof this._angle && (this._angle = 0);
            "number" === typeof d.angle && (this._angle = d.angle);
            this._parameters.animateTo = "number" === typeof d.animateTo ? d.animateTo: this._angle;
            this._parameters.step = d.step || this._parameters.step || null;
            this._parameters.easing = d.easing || this._parameters.easing ||
            function(g, k, h, i, j) {
                return - i * ((k = k / j - 1) * k * k * k - 1) + h;
            };
            this._parameters.duration = d.duration || this._parameters.duration || 1000;
            this._parameters.callback = d.callback || this._parameters.callback ||
            function() {};
            d.bind && d.bind != this._parameters.bind && this._BindEvents(d.bind);
        },
        _handleRotation: function(d) {
            this._setupParameters(d);
            this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart();
        },
        _BindEvents: function(g) {
            if (g && this._eventObj) {
                if (this._parameters.bind) {
                    var d = this._parameters.bind,
                    h;
                    for (h in d) {
                        d.hasOwnProperty(h) && jQuery(this._eventObj).unbind(h, d[h]);
                    }
                }
                this._parameters.bind = g;
                for (h in g) {
                    g.hasOwnProperty(h) && jQuery(this._eventObj).bind(h, g[h]);
                }
            }
        },
        _Loader: function() {
            return c ?
            function(g) {
                var d = this._img.width,
                h = this._img.height;
                this._img.parentNode.removeChild(this._img);
                this._vimage = this.createVMLNode("image");
                this._vimage.src = this._img.src;
                this._vimage.style.height = h + "px";
                this._vimage.style.width = d + "px";
                this._vimage.style.position = "absolute";
                this._vimage.style.top = "0px";
                this._vimage.style.left = "0px";
                this._container = this.createVMLNode("group");
                this._container.style.width = d;
                this._container.style.height = h;
                this._container.style.position = "absolute";
                this._container.setAttribute("coordsize", d - 1 + "," + (h - 1));
                this._container.appendChild(this._vimage);
                this._rootObj.appendChild(this._container);
                this._rootObj.style.position = "relative";
                this._rootObj.style.width = d + "px";
                this._rootObj.style.height = h + "px";
                this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                this._rootObj.className = this._img.className;
                this._eventObj = this._rootObj;
                this._handleRotation(g);
            }: function(g) {
                this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                this._rootObj.className = this._img.className;
                this._width = this._img.width;
                this._height = this._img.height;
                this._widthHalf = this._width / 2;
                this._heightHalf = this._height / 2;
                var d = Math.sqrt(this._height * this._height + this._width * this._width);
                this._widthAdd = d - this._width;
                this._heightAdd = d - this._height;
                this._widthAddHalf = this._widthAdd / 2;
                this._heightAddHalf = this._heightAdd / 2;
                this._img.parentNode.removeChild(this._img);
                this._aspectW = (parseInt(this._img.style.width, 10) || this._width) / this._img.width;
                this._aspectH = (parseInt(this._img.style.height, 10) || this._height) / this._img.height;
                this._canvas = document.createElement("canvas");
                this._canvas.setAttribute("width", this._width);
                this._canvas.style.position = "relative";
                this._canvas.style.left = -this._widthAddHalf + "px";
                this._canvas.style.top = -this._heightAddHalf + "px";
                this._canvas.Wilq32 = this._rootObj.Wilq32;
                this._rootObj.appendChild(this._canvas);
                this._rootObj.style.width = this._width + "px";
                this._rootObj.style.height = this._height + "px";
                this._eventObj = this._canvas;
                this._cnv = this._canvas.getContext("2d");
                this._handleRotation(g);
            };
        } (),
        _animateStart: function() {
            this._timer && clearTimeout(this._timer);
            this._animateStartTime = +new Date;
            this._animateStartAngle = this._angle;
            this._animate();
        },
        _animate: function() {
            var g = +new Date,
            d = g - this._animateStartTime > this._parameters.duration;
            if (d && !this._parameters.animatedGif) {
                clearTimeout(this._timer);
            } else { (this._canvas || this._vimage || this._img) && this._rotate(~~ (10 * this._parameters.easing(0, g - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration)) / 10);
                this._parameters.step && this._parameters.step(this._angle);
                var h = this;
                this._timer = setTimeout(function() {
                    h._animate.call(h);
                },
                10);
            }
            this._parameters.callback && d && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj));
        },
        _rotate: function() {
            var d = Math.PI / 180;
            return c ?
            function(g) {
                this._angle = g;
                this._container.style.rotation = g % 360 + "deg";
            }: l ?
            function(g) {
                this._angle = g;
                this._img.style[l] = "rotate(" + g % 360 + "deg)";
            }: function(g) {
                this._angle = g;
                g = g % 360 * d;
                this._canvas.width = this._width + this._widthAdd;
                this._canvas.height = this._height + this._heightAdd;
                this._cnv.translate(this._widthAddHalf, this._heightAddHalf);
                this._cnv.translate(this._widthHalf, this._heightHalf);
                this._cnv.rotate(g);
                this._cnv.translate( - this._widthHalf, -this._heightHalf);
                this._cnv.scale(this._aspectW, this._aspectH);
                this._cnv.drawImage(this._img, 0, 0);
            }
        } ()
    };
    c && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return ! document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
            function(g) {
                return document.createElement("<rvml:" + g + ' class="rvml">');
            }
        } catch(d) {
            return function(g) {
                return document.createElement("<" + g + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            }
        }
    } ())
})(jQuery);