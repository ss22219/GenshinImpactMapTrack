// ==UserScript==
// @name         空莹酒馆地图游戏同步
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yuanshen.site/index.html?locale=zh-CN
// @icon         https://www.google.com/s2/favicons?domain=yuanshen.site
// @grant        none
// ==/UserScript==
var setPosEnable = true;
var playerMarket;
(function() {
    'use strict';
     playerMarket = L.marker([0, 0]}).addTo(map);
    setTimeout(function(){
         setPos()
    }, 200);
    // Your code here...
})();

function setPos(){
    $.ajax({
       url: 'https://localhost:5000/api/position',
       success: function(data){
            if(data.success){
                var pos = new L.LatLng(data.x, data.y);
                playerMarket.setLatLng(pos);
                playerMarket.setZIndexOffset(1);
                playerMarket.setIcon(L.divIcon({iconSize: [50, 50], className:'',html:'<img src="data:image/png;base64,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" style="width:50px;height:50px;transform: rotate('+data.a+'deg);">'}))
                map.panTo(new L.LatLng(data.x, data.y));
            }
                if(setPosEnable)
                setTimeout(function(){
                    setPos()
                }, 200);
       },error: function() {setTimeout(function(){
                    setPos()
                }, 200);}
    });
}

(function() {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function(e) { e.target._applyRotation(); });
    });

    L.Marker.include({
        _initIcon: function() {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if(this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

                if(oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function(angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function(origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();
