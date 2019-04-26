import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

// A chart instance;
// Data for the chart;
// Defined data fields.

class ColorChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let chart = am4core.create('chartdiv', am4charts.TreeMap);
    console.log('Color component props!', this.props);
    // const data = getData();

    chart.data = this.props.work.colors;

    chart.dataFields.value = 'percent';
    chart.dataFields.name = 'color';
    chart.dataFields.color = 'color';

    const colorNodes = chart.seriesTemplates.create('0');

    const findEvent = ev => {
      console.log('clicked on ', ev.target);
    };

    colorNodes.events.on('hit', findEvent, this);

    this.chart = chart;
  }

  componentDidUpdate(prevProps) {
    if (this.props.work.id !== prevProps.work.id) {
      let chart = am4core.create('chartdiv', am4charts.TreeMap);
      console.log('Color component props!', this.props);
      // const data = getData();

      chart.data = this.props.work.colors;

      chart.dataFields.value = 'percent';
      chart.dataFields.name = 'color';
      chart.dataFields.color = 'color';

      const colorNodes = chart.seriesTemplates.create('0');
      const colorNodesColumn = colorNodes.columns.template;
      colorNodesColumn.clickable = true;

      const findEvent = ev => {
        console.log('clicked on ', ev.target.properties.fill.hex);
        let queryColor = ev.target.properties.fill.hex;
        queryColor = queryColor.slice(1);
        this.props.select(queryColor);
      };

      colorNodesColumn.events.on('hit', findEvent, this);

      this.chart = chart;
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
  }
}

export default ColorChart;
