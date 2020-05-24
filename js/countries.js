var params = new URLSearchParams(window.location.search);
var graphHTML = $('.box.graphs').innerHTML;
window.onDataLoad = function (data) {
    for (var country in data) {
        var li = El.create('li', country);
        li.addEventListener('click', function (e) {
            showCountry(e.target.innerText);
        });
        $('.search > ul.dropdown').appendChild(li);
    }
    var countryParam = params.get('country');
    if (countryParam == null) {
        showCountry('Worldwide');
    }
    else {
        showCountry(countryParam);
    }
};
var countryCasesData = {
    x: [],
    y: [],
    name: 'Cases',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#f91',
        width: 3
    }
};
var countryActiveCasesData = {
    x: [],
    y: [],
    name: 'Active Cases',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#18b3d6',
        width: 3
    }
};
var countryNewCasesData = {
    x: [],
    y: [],
    name: 'New Cases',
    type: 'bar',
    marker: {
        color: '#f91'
    }
};
var countryDeathsData = {
    x: [],
    y: [],
    name: 'Deaths',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#f33',
        width: 3
    }
};
var countryNewDeathsData = {
    x: [],
    y: [],
    name: 'New Deaths',
    type: 'bar',
    marker: {
        color: '#f33'
    }
};
var countryRecoveriesData = {
    x: [],
    y: [],
    name: 'Recoveries',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#5ac92e',
        width: 3
    }
};
var countryNewRecoveriesData = {
    x: [],
    y: [],
    name: 'New Recoveries',
    type: 'bar',
    marker: {
        color: '#5ac92e'
    }
};
var countryDeathRateData = {
    x: [],
    y: [],
    name: 'Death Rate',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#6a1894',
        width: 3
    }
};
var countryNewVSExistingData = {
    x: [],
    y: [],
    name: 'New VS Existing',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#0caec7',
        width: 3
    }
};
var growthFactorData = {
    x: [],
    y: [],
    name: 'Growth Factor',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: '#ebe013',
        width: 3
    }
};
var currentCountry;
var countryShort;
var showCountry = function (country) {
    $('.search > input').value = country;
    currentCountry = country;
    countryShort = (country.length > 20) ? country.substring(0, 17) + '...' : country;
    var newURL = window.location.origin + window.location.pathname + ("?country=" + country);
    window.history.pushState({ path: newURL }, '', newURL);
    $('.box.graphs').innerHTML = graphHTML;
    // Draw plots
    for (var i = 0; i < data[country].length; i++) {
        countryCasesData.x[i] = data[country][i].date;
        countryCasesData.y[i] = data[country][i].confirmed;
        countryActiveCasesData.x[i] = data[country][i].date;
        countryActiveCasesData.y[i] = data[country][i].confirmed - data[country][i].deaths - data[country][i].recovered;
        countryNewCasesData.x[i] = data[country][i].date;
        countryNewCasesData.y[i] = data[country][i].confirmed - ((i == 0) ? 0 : data[country][i - 1].confirmed);
        countryDeathsData.x[i] = data[country][i].date;
        countryDeathsData.y[i] = data[country][i].deaths;
        countryNewDeathsData.x[i] = data[country][i].date;
        countryNewDeathsData.y[i] = data[country][i].deaths - ((i == 0) ? 0 : data[country][i - 1].deaths);
        countryRecoveriesData.x[i] = data[country][i].date;
        countryRecoveriesData.y[i] = data[country][i].recovered;
        countryNewRecoveriesData.x[i] = data[country][i].date;
        countryNewRecoveriesData.y[i] = data[country][i].recovered - ((i == 0) ? 0 : data[country][i - 1].recovered);
        countryDeathRateData.x[i] = data[country][i].date;
        countryDeathRateData.y[i] = data[country][i].deaths / data[country][i].confirmed;
        countryNewVSExistingData.x[i] = data[country][i].confirmed;
        countryNewVSExistingData.y[i] = data[country][i].confirmed - ((i <= 7) ? 0 : data[country][i - 7].confirmed);
        growthFactorData.x[i] = data[country][i].date;
        growthFactorData.y[i] = (data[country][i].confirmed - data[country][i].deaths - data[country][i].recovered) / ((i <= 0) ? 0 : data[country][i - 1].confirmed - data[country][i - 1].deaths - data[country][i - 1].recovered);
    }
    Plotly.newPlot('cases-graph', [
        countryCasesData
    ], generateGraphLayout({
        title: countryShort + " Cases",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('new-cases-graph', [
        countryNewCasesData
    ], generateGraphLayout({
        title: countryShort + " New Cases",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('deaths-graph', [
        countryDeathsData
    ], generateGraphLayout({
        title: countryShort + " Deaths",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('new-deaths-graph', [
        countryNewDeathsData
    ], generateGraphLayout({
        title: countryShort + " New Deaths",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('recoveries-graph', [
        countryRecoveriesData
    ], generateGraphLayout({
        title: countryShort + " Recoveries",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('new-recoveries-graph', [
        countryNewRecoveriesData
    ], generateGraphLayout({
        title: countryShort + " New Recoveries",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('death-rate-graph', [
        countryDeathRateData
    ], generateGraphLayout({
        title: countryShort + " Death Rate",
        xaxisLabel: 'Date',
        yaxisLabel: ''
    }), graphOptions);
    Plotly.newPlot('new-vs-existing-graph', [
        countryNewVSExistingData
    ], generateGraphLayout({
        title: countryShort + " New VS Existing",
        xaxisLabel: 'Cumulative Cases',
        xaxisScale: 'log',
        yaxisLabel: 'New Cases',
        yaxisScale: 'log'
    }), graphOptions);
    Plotly.newPlot('growth-factor-graph', [
        growthFactorData
    ], generateGraphLayout({
        title: countryShort + " Growth Factor",
        xaxisLabel: 'Date',
        yaxisLabel: 'Growth Factor'
    }), graphOptions);
    // Set stats
    $('.country-stats.infected').innerHTML = formatNum(data[country][data[country].length - 1].confirmed);
    $('.country-stats.deaths').innerHTML = formatNum(data[country][data[country].length - 1].deaths);
    $('.country-stats.recovered').innerHTML = formatNum(data[country][data[country].length - 1].recovered);
};
var toggleCasesGraph = function () {
    if ($('#cases-graph').classList.contains('toggled')) {
        $('#cases-graph').classList.remove('toggled');
        $('#cases-graph').querySelector('button').innerText = 'Show Active';
        Plotly.newPlot('cases-graph', [
            countryCasesData
        ], generateGraphLayout({
            title: countryShort + " Cases",
            xaxisLabel: 'Day',
            yaxisLabel: ''
        }), graphOptions);
    }
    else {
        $('#cases-graph').classList.add('toggled');
        $('#cases-graph').querySelector('button').innerText = 'Show Cumulative';
        Plotly.newPlot('cases-graph', [
            countryActiveCasesData
        ], generateGraphLayout({
            title: countryShort + " Active Cases",
            xaxisLabel: 'Day',
            yaxisLabel: ''
        }), graphOptions);
    }
};
