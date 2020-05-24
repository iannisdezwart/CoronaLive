var caseData = [];
var newVSExistingData = [];
window.onDataLoad = function (data) {
    var i = 0;
    for (var country in data) {
        if (country != 'Worldwide' && country != 'Excluding China' && data[country][data[country].length - 1].confirmed >= 1000) {
            caseData[i] = {
                x: [],
                y: [],
                name: country + " Cases",
                type: 'scatter',
                mode: 'lines+markers',
                line: {
                    width: 3
                }
            };
            newVSExistingData[i] = {
                x: [],
                y: [],
                name: country + " Cases",
                type: 'scatter',
                mode: 'lines+markers',
                line: {
                    width: 3
                }
            };
            for (var day = 0; day < data[country].length; day++) {
                caseData[i].x[day] = data[country][day].date;
                caseData[i].y[day] = data[country][day].confirmed;
                newVSExistingData[i].x[day] = data[country][day].confirmed;
                newVSExistingData[i].y[day] = data[country][day].confirmed - ((day <= 7) ? 0 : data[country][day - 7].confirmed);
            }
            i++;
        }
    }
    Plotly.newPlot('cases-graph', caseData, generateGraphLayout({
        title: "Cases",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('new-vs-existing-graph', newVSExistingData, generateGraphLayout({
        title: "New VS Existing",
        xaxisLabel: 'Date',
        xaxisScale: 'log',
        yaxisLabel: '',
        yaxisScale: 'log'
    }), graphOptions);
};
