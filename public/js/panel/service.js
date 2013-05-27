app.factory('calculateLayoutInRow', function() {
    var totalWidth = 12;

    function divideWithoutRemainder( dividend, divisor) {
        return dividend / divisor | 0;
    }

    return function(elementCount) {
        var avgWidth = divideWithoutRemainder(totalWidth, elementCount);
        var excess = totalWidth % elementCount;

        var widthDivision = [];
        for (var i = 0; i < elementCount; i++) {
            var compensation = 0;
            if (excess > 0) {
                excess--;
                compensation++;
            }
            widthDivision.push(avgWidth + compensation);
        }

        return widthDivision;
    };
});