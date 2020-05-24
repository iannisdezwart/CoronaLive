window.onDataLoad = (data: object) => {
  const country = 'Worldwide'
  const countryShort = 'Worldwide'

  const countryCasesData: Partial<Plotly.PlotData> = {
    x: [],
    y: [],
    name: 'Cases',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: '#f91',
      width: 3
    }
  }

  const countryNewCasesData: Partial<Plotly.PlotData> = {
    x: [],
    y: [],
    name: 'New Cases',
    type: 'bar',
    marker: {
      color: '#f91'
    }
  }

  const countryDeathsData: Partial<Plotly.PlotData> = {
    x: [],
    y: [],
    name: 'Deaths',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: '#f33',
      width: 3
    }
  }

  const countryNewDeathsData: Partial<Plotly.PlotData> = {
    x: [],
    y: [],
    name: 'New Deaths',
    type: 'bar',
    marker: {
      color: '#f33'
    }
  }

  const countryRecoveriesData: Partial<Plotly.PlotData> = {
    x: [],
    y: [],
    name: 'Recoveries',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: '#5ac92e',
      width: 3
    }
  }

  const countryNewRecoveriesData: Partial<Plotly.PlotData> = {
    x: [],
    y: [],
    name: 'New Recoveries',
    type: 'bar',
    marker: {
      color: '#5ac92e'
    }
  }

  for (let i = 0; i < data[country].length; i++) {
    countryCasesData.x[i] = i
    countryCasesData.y[i] = data[country][i].confirmed

    countryNewCasesData.x[i] = i
    countryNewCasesData.y[i] = data[country][i].confirmed - ((i == 0) ? 0 : data[country][i - 1].confirmed)

    countryDeathsData.x[i] = i
    countryDeathsData.y[i] = data[country][i].deaths

    countryNewDeathsData.x[i] = i
    countryNewDeathsData.y[i] = data[country][i].deaths - ((i == 0) ? 0 : data[country][i - 1].deaths)

    countryRecoveriesData.x[i] = i
    countryRecoveriesData.y[i] = data[country][i].recovered

    countryNewRecoveriesData.x[i] = i
    countryNewRecoveriesData.y[i] = data[country][i].recovered - ((i == 0) ? 0 : data[country][i - 1].recovered)
  }

  Plotly.newPlot('cases-graph', [
    countryCasesData
  ], generateGraphLayout({
    title: `${countryShort} Cases`,
    xaxisLabel: 'Day',
    yaxisLabel: ''
  }), graphOptions)

  Plotly.newPlot('new-cases-graph', [
    countryNewCasesData
  ], generateGraphLayout({
    title: `${countryShort} New Cases`,
    xaxisLabel: 'Day',
    yaxisLabel: ''
  }), graphOptions)

  Plotly.newPlot('deaths-graph', [
    countryDeathsData
  ], generateGraphLayout({
    title: `${countryShort} Deaths`,
    xaxisLabel: 'Day',
    yaxisLabel: ''
  }), graphOptions)

  Plotly.newPlot('new-deaths-graph', [
    countryNewDeathsData
  ], generateGraphLayout({
    title: `${countryShort} New Deaths`,
    xaxisLabel: 'Day',
    yaxisLabel: ''
  }), graphOptions)

  Plotly.newPlot('recoveries-graph', [
    countryRecoveriesData
  ], generateGraphLayout({
    title: `${countryShort} Recoveries`,
    xaxisLabel: 'Day',
    yaxisLabel: ''
  }), graphOptions)

  Plotly.newPlot('new-recoveries-graph', [
    countryNewRecoveriesData
  ], generateGraphLayout({
    title: `${countryShort} New Recoveries`,
    xaxisLabel: 'Day',
    yaxisLabel: ''
  }), graphOptions)

  // Set stats
  $('.country-stats.infected').innerHTML = formatNum(data[country][data[country].length - 1].confirmed)
  $('.country-stats.deaths').innerHTML = formatNum(data[country][data[country].length - 1].deaths)
  $('.country-stats.recovered').innerHTML = formatNum(data[country][data[country].length - 1].recovered)
}
