describe('services test', function() {

    beforeEach(module('dashboardApp'));

    describe('calculate layout in row service test', function() {

        var calculateLayoutInRow;

        beforeEach(inject(function($injector) {
            calculateLayoutInRow = $injector.get('calculateLayoutInRow');
        }));

        it('should divide equally when count of monitors can be divided exactly', function() {
            var widthDivision = calculateLayoutInRow(2);

            expect(widthDivision).toEqual([6, 6]);
        });
    });


});