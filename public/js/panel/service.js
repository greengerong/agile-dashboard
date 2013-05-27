app.factory('calculateLayoutInRow', function() {
    var totalWidth = 12;

    return function(elementCount) {
        var avgWidth = totalWidth / elementCount;

        var widthDivision = [];
        for (var i = 0; i < elementCount; i++) {
            widthDivision.push(avgWidth);
        }

        return widthDivision;
    };
});