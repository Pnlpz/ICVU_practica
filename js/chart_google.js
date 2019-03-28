
console.log("hola");

$.getScript( "js/jquery.csv.min.js" )
  .done(function( script, textStatus ) {
    console.log( "---- ok " );
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log( "FALTA: jquery.csv.min.js" );
});

$.getScript( "js/radar.js" )
  .done(function( script, textStatus ) {
    console.log( "---- ok2" );
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log( "FALTA: radar.js" );
});

var order0 = 0;
var order1 = 0;
var theTitle = '';
var view;
var colorsRanges = [
/*
  '#bebeff',
  '#5c5cff',
  '#1b1464'
  */
  '#C1272D',
  '#FBB03B',
  '#22B573'
  ];
/*Duda: ¿ex-colores del barchart?
["#e055a8",
"#9E005D",
'#600039'
]*/

var rangesICVU = [37.5, 47.65];
var rangesCL = [37.5, 47.65];
var rangesAN = [37.5, 47.65];
var rangesCS = [37.5, 47.65];
var rangesCM = [37.5, 47.65];
var rangesSM = [37.5, 47.65];
var rangesVE = [37.5, 47.65];

// ICVU2017,CL,AN,CS,CM,SM,VE
var ranges = [
rangesICVU,
rangesCL,
rangesAN,
rangesCS,
rangesCM,
rangesSM,
rangesVE
]

  //function cmToInches(dataTable, rowNum, colNum){
  function AddLabel(dataTable, rowNum){
    //return Math.floor(dataTable.getValue(rowNum, 1) / 2);
    return ""+dataTable.getValue(rowNum, order1);
  }


  function setColor(dataTable, rowNum){
    aux = order1-7;
    val = dataTable.getValue(rowNum, order1);
    if(val < ranges[aux][0])
      return colorsRanges[0];

    else if(val < ranges[aux][1])
      return colorsRanges[1];

    return colorsRanges[2];
  }


google.charts.load('current', {
  packages:['bar', 'table',
  'corechart', 'controls']
}).then(function () {

  // AQUI DEFINO EL ID DEL GRAFICO A EXPORTAR
  var chartContainerRANKING = document.getElementById('chartRanking');
  var chartContainerDETAIL = document.getElementById('spider');
  var button = document.getElementById('button');

/*
  function downloadCanvas(link, canvasId, filename) {
    console.log("SI");
      link.href = document.getElementById(canvasId).toDataURL();
      link.download = filename;
      console.log("link: "+link);
      console.log("canvasId: "+canvasId);
      console.log("filename: "+filename);
      link.click();

  }*/

function downloadImageSvg(imageContainer, filename){

      var canvas;
      var domURL;
      var imageNode;
      var imageURL;
      var svgParent;

      // add svg namespace to chart
      domURL = window.URL || window.webkitURL || window;
      svgParent = imageContainer.getElementsByTagName('svg')[0];

      if(svgParent){
        svgParent.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        imageNode = imageContainer.cloneNode(true);
        imageURL = domURL.createObjectURL(new Blob([svgParent.outerHTML], {type: 'image/svg+xml'}));
        image = new Image();
        image.src = imageURL;

        //////
        var svgUrl = imageURL //URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.setAttribute('width', parseFloat(svgParent.getAttribute('width')));
        downloadLink.setAttribute('height', parseFloat(svgParent.getAttribute('height')));
        /********************************************************************************/
        //downloadLink.download = "Ranking.svg"; // CAMBIAR NOMBRE PARA DESCARGAR
        downloadLink.download = filename;
        /********************************************************************************/
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }else{
        alert("Primero debes seleccionar una comuna");
      }


}


  $( "#button1" ).click(function() {
    downloadImageSvg(chartContainerRANKING, 'Ranking.svg');
  });


              function setBackgroundWhite(canvasId){

                  //document.getElementById("spider").setBackgroundColor('rgba(255, 73, 64, 0.6)');
                  var canvas = document.getElementById(canvasId);
                  var ctx = canvas.getContext("2d");
                  // change non-opaque pixels to white
                  var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
                  var data=imgData.data;
                  for(var i=0;i<data.length;i+=4){
                      if(data[i+3] == 0){
                          data[i] = 255 - data[i];
                          data[i+1] = 255 - data[i+1];
                          data[i+2] = 255 - data[i+2];
                          data[i+3] = 255 - data[i+3];
                      }
                  }
                  ctx.putImageData(imgData,0,0);

                  //AÑADIENDO LEYENDA POR FIN//
                  ctx.font = "10px Barlow";
                  ctx.fillStyle = "#cccccc";
                  //Centrar texto en canvas
                  ctx.textAlign = "center";
                  ctx.fillText("ICVU desarrollado por CCHC. Gráficos y plataforma desarrollados por OCUC",canvas.width/2,canvas.height - 10);
                  //ctx.fillText("Gráficos y plataforma desarrollados por OCUC",canvas.width/2,(canvas.height/8)-5);


                                }

              /**
              * This is the function that will take care of image extracting and
              * setting proper filename for the download.
              * IMPORTANT: Call it from within a onclick event.
              */
              function downloadCanvas(link, canvasId, filename) {

                  setBackgroundWhite(canvasId);
                   link.href = document.getElementById(canvasId).toDataURL();
                   link.download = filename;
              }

              /**
              * The event handler for the link's onclick event. We give THIS as a
              * parameter (=the link element), ID of the canvas and a filename.
              */
              document.getElementById('download').addEventListener('click', function() {
                 downloadCanvas(this, 'spider', 'icvu2018.png');
              });
              document.getElementById('downloadRanking').addEventListener('click', function() {

                var downloadLink = document.createElement("a");
                downloadLink.href = barChart.getChart().getImageURI();
                /********************************************************************************/
                //downloadLink.download = "Ranking.svg"; // CAMBIAR NOMBRE PARA DESCARGAR
                downloadLink.download = "Ranking ICVU 2018.png";
                /********************************************************************************/
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

              });



}); // FIN }).then(function () {


  var MAXHeight = 3046;
  /// Dashboard --->
  var data;
  var dashboard;
  var barChart;
  var chartDetail;

  var options = {
    width: 350,
    height: MAXHeight,
    title: 'AAaaa ',
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    animation:{
      duration: 1000,
      easing: 'out',
    },

    titleTextStyle: {
        color: "#00cc00",    // any HTML string color ('red', '#cc00cc')
        fontName: "Barlow", // i.e. 'Times New Roman'
        fontSize: 12, // 12, 18 whatever you want (don't specify px)
        //bold: <boolean>,    // true or false
        //italic: <boolean>   // true of false
    }

  };

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawDashboard);


  // Callback that creates and populates a data table,
  // instantiates a dashboard, a range slider and a pie chart,
  // passes in the data and draws it.
  function drawDashboard() {

    var data1;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ORDEN NECESARIO DE DATOS DE ENTRADA:
    // Comuna,Población,Distribución,Localización,Metropolitana,Dependencia FCM (%),Gasto total municipal por cada habitante de la comuna  M$ / Habitante (promedio 2013-2015),ICVU2017,CL,AN,CS,CM,SM,VE,RANGO, Ciudad Metropolitana

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///$.get("datos_icvu2.csv", function(csvString) { // INICIO get
      $.get("datos_icvu2018.csv", function(csvString) { // INICIO get
        data1 = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

        // this new DataTable object holds all the data
        data = new google.visualization.arrayToDataTable(data1);

        var table = new google.visualization.Table(document.getElementById('tabla'));
        table.draw(data, {
          showRowNumber: true,
          width: '90%',
          height: '200'}
          );

        view = new google.visualization.DataView(data);
        //view.setColumns([0,1,2,3,4,5,6]);
        //data.sort([{column: 1}, {column: 0}]);
        console.log("order1: "+order1);
        data.sort([{column: order1, desc: true}]);

        // Create a dashboard
        dashboard = new google.visualization.Dashboard( document.getElementById('dashboard_div')) ;

        // Create a range slider, passing some options
        var PopulationRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_poblacion_div',
          'options': {
            //'filterColumnLabel': 'Población',
            'filterColumnIndex': 1,
            'minValue': '0',
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
          }
        });



        // Create a CategoryFilter, passing some options
        var TypeFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_type_div',
          'options': {
            'filterColumnIndex': 16,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100,
                caption : 'Mostrar',
            'allowNone': false
            }
            //'filterColumnLabel': 'Localización',
          },state: {
            selectedValues: ['Comunas']
          }

        });
        /************************************************************************************/
          // RETOMAR ESTA PARTE PARA SETEAR VALOR
          //PopulationRangeSlider.setState({'lowValue': 2, 'highValue': 5});
          //PopulationRangeSlider.setState({'currentValue': 200});

          //PopulationRangeSlider.setValue(200);
        /************************************************************************************/

        // Create a range slider, passing some options
        var DependenciaRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_dependencia_div',
          'options': {
            //'filterColumnLabel': 'Población',
            'filterColumnIndex': 5,
            'minValue': '0',
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
          }
        });

        // Create a range slider, passing some options
        var PerCapitaRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_per_capita_div',
          'options': {
            //'filterColumnLabel': 'Población',
            'filterColumnIndex': 6,
            'minValue': '0',
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
          }
        });


        // Create a CategoryFilter, passing some options
        var MetropolitanaFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_metropolitana_div',
          'options': {
            'filterColumnIndex': 4,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100,
                caption : 'Metropolitanas y no Metropolitanas'
            },values: ["Solo metropolitana", "Solo no Metropolitanas"]
            //'filterColumnLabel': 'Metropolitana',
          }

        });

        // Create a CategoryFilter, passing some options
        var LocalizacionFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_localizacion_div',
          'options': {
            'filterColumnIndex': 3,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100,
                caption : 'Cualquiera'
            },values: ["Costa", "Interior"]
            //'filterColumnLabel': 'Localización',
          }
          /*
          ELIMINAR ESTADO
          ,
          state: {
              value: id
          }
          */
        });
/* ESTO ES LO PENDIENTE A SUBIR  -> **/
        // Create a CategoryFilter, passing some options
        var DistribucionFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_distribucion_div',
          'options': {
            'filterColumnIndex': 2,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100,
                caption : 'Cualquiera',
                sortValues: false
            },
            values: ["Norte", "Centro", "Sur"],
        // use month name
        useFormattedValue: true,
      // state needs formatted value
      /*
      state: {
        selectedValues: [data.getFormattedValue(selectedRow, 0)]
      }*/
            //'filterColumnLabel': 'Zona',
          }
        });

/* ESTO ES LO PENDIENTE A SUBIR  <- **/

        // Create a pie chart, passing some options
        barChart = new google.visualization.ChartWrapper({
          'chartType': 'BarChart',
          //'chartType': 'Table',
          'containerId': 'chartRanking',
          'options': {
            //bar: { groupWidth: '25%' },
            'width': 450,
            'height': MAXHeight,
            'pieSliceText': 'value',
            //'legend': 'top',
            'legend': 'none',
            title: theTitle,
            'hAxis': {
              'minValue': '0',
            'showTextEvery': 1,
            'gridlines':{'count': 0},
            titleTextStyle: {
                color: "#00cc00",    // any HTML string color ('red', '#cc00cc')
                fontName: "Barlow", // i.e. 'Times New Roman'
                fontSize: 12, // 12, 18 whatever you want (don't specify px)
                //bold: <boolean>,    // true or false
                //italic: <boolean>   // true of false
            }
          },

            'animation':{
              'duration': '1000',
              'easing': 'out',
            },
            chartArea: {
            'width': '100%',
            left:150,
            right:40, // !!! works !!!
            bottom:20,  // !!! works !!!
            top:50
            },
            'tooltip': {'isHtml': true}
          },
            view: {
              columns: [0, order1, {calc:AddLabel, type:'string', role: 'annotation', label:'Color'}, {calc:setColor, type:'string', role: 'style', label:'Color'}]
            }
        });

        barChart.setOption('titleTextStyle.fontName', "Barlow" );

        var selection;
        // Instantiate and draw our chart, passing in some options.
        //chartDetail = new google.visualization.BarChart(document.getElementById('chartDetail'));

        google.visualization.events.addListener(barChart, 'select', function () {
          //console.log("Click: " + barChart.getChart().getSelection());
          selection = barChart.getChart().getSelection();

          message ='';
          for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
              message += '{row:' + item.row + ',column:' + item.column + '}';
            } else if (item.row != null) {
              message += '{row:' + item.row + '}';
            } else if (item.column != null) {
              message += '{column:' + item.column + '}';
            }
          }
          if (message == '') {
            message = 'nothing';

          }
          if (item != null && item.row != null ){
                    var id = barChart.getDataTable().getValue(item.row,0);
                    var originalRow = data.getFilteredRows([{column: 0, value: id }]);
                    originalRow = parseInt(originalRow);
                    var originalData = data.getFormattedValue(originalRow, 1);

                    //console.log("originalIndexRow: " + originalRow);
                    //console.log("originalDataRow: " + originalData);
                    //console.log("*** values: " + message);

                    selection = barChart.getChart().getSelection();

                    var selectedItem = barChart.getChart().getSelection()[0];
                    if (selectedItem) {
                      var value = data.getValue(selectedItem.row, selectedItem.column);
                      var id = barChart.getDataTable().getValue(item.row,0);
                      var originalRow = data.getFilteredRows([{column: 0, value: id }]);
                      originalRow = parseInt(originalRow);
                      var originalData = data.getFormattedValue(originalRow, 1);
                      //var originalNameData = data.getFormattedValue(originalRow, 0);
                      var comuna = data.getFormattedValue(originalRow, 0);

                      var optionsTool = {
                        width: 600,
                        height: 600,
                        title: 'Detalle para ' + comuna,
                        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
                        animation:{
                          duration: 1000,
                          easing: 'out',
                        },
                        hAxis: {'minValue': '0'},
                        chartArea: {
                        //'width': '40%', 'height': '80%',
                        left:100,
                        right:40, // !!! works !!!
                        //bottom:20,  // !!! works !!!
                        //top:20
                        },
                        legend: {'position': 'bottom'},
                        //colors: ["green","blue"]
                      };
                      /*

                      var message = '';

                      for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                          message += '{row:' + item.row + ',column:' + item.column + '}'  + ' ===> (' + data.getValue(item.row, 0)+': '+ data.getValue(item.row, 1)+')';
                        } else if (item.row != null) {
                          message += '{row:' + item.row + '}';
                        } else if (item.column != null) {
                          message += '{column:' + item.column + '}';
                        }
                      }
                      if (message == '') {
                        message = 'nothing';
                      }
                      console.log('You selected ' + message);
                      */
                      //dashboard.draw(data, options);
                      //chartDetail.draw(selection, optionsTool);
                      s = data.getFilteredRows([{column: 0, value: id}]) ;
                      //console.log("data.getFilteredRows([{column: 0, value: id }])=== "+ s);

                      var viewDetail = new google.visualization.DataView(data);
                      indexPopulation = 1;
                      viewDetail.setRows(data.getFilteredRows([
                        {column: 0, value: id}
                      ]));
                      Ncols = viewDetail.getNumberOfColumns();
                      Nrows = viewDetail.getNumberOfRows();
                      I = 18;

                      aaa = [];
                      for (var i = 0; i < viewDetail.getNumberOfColumns(); i++) {
                        aaa.push(viewDetail.getValue(0, i));
                      }

                      // mapas/AMV/AMV_ICVU.jpg
                      folder = viewDetail.getValue(0, I);
                      dimension = ["ICVU",
                      "laboral",
                      "negocios",
                      "sociocultural",
                      "movilidad",
                      "salud",
                      "vivienda"];
                      indexDimension = $("#order1").val()-7;

                      console.log("=> aaa: " + indexDimension);
                      if(folder.length > 1){
                        $("#map").show();
                        mapa = folder+"_"+dimension[indexDimension]+".jpg";
                        url = "mapas/"+folder+"/"+mapa;
                        $("#map").attr("href", url);
                        $("#map").attr("download", mapa);
                      }else{
                        $("#map").hide();
                      }


                      //viewDetail.setColumns([0,7,8,9,10,11,12,13]); // AQUIIII INDICE DE LAS DIMENSIONES
                      viewDetail.setColumns([0,7,8,9,10,11,12,13, 17]); // AQUIIII INDICE DE LAS DIMENSIONES



                      // rawData is the base DataTable from the query
                      var newData = new google.visualization.DataTable();
                      var DATOS_EN_ARREGLO = []; // ESTO ES LO QUE TIENES QUE TOMAR
                      rawData = viewDetail;
                      newData.addColumn('string', 'domain data label'); // change this label to whatever is appropriate for you
                      for (var i = 0; i < rawData.getNumberOfRows(); i++) {
                          newData.addColumn('number', rawData.getValue(i, 0));
                      }
                      for (var i = 1; i < rawData.getNumberOfColumns(); i++) {
                          var row = [rawData.getColumnLabel(i)];
                          for (var j = 0; j < rawData.getNumberOfRows(); j++) {
                              row.push(rawData.getValue(j, i));
                          }
                          newData.addRow(row);
                      }
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      var DATOS_EN_ARREGLO = []; // ESTO ES LO QUE TIENES QUE TOMAR
                      for (var i = 2; i < rawData.getNumberOfColumns() -1; i++) {
                        DATOS_EN_ARREGLO.push(rawData.getValue(0, i));
                      }
                      /*
                      for (var i = 0; i < rawData.getNumberOfColumns(); i++) {
                        console.log("I: "+i+", "+rawData.getValue(0, i));
                      }*/

                      console.log("*** COMUNA: "+ comuna);
                      icvu = rawData.getValue(0, 1);
                      position = rawData.getValue(0, 8);
                      actualizar(icvu, position, DATOS_EN_ARREGLO, comuna);
                      // console.log("* TITULO: "+ theTitle);
                      console.log("position: "+ position);
                      console.log("DATOS_EN_ARREGLO: "+ DATOS_EN_ARREGLO);
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////

                      //chartDetail.draw(newData, optionsTool);
                    }
                  }


        }); // FIN google.visualization.events.addListener(barChart, 'select', function () {


// When the orgchart is selected, update the table chart.
google.visualization.events.addListener(TypeFilter, 'statechange', function() {
  //table.setSelection(orgchart.getSelection());

         var selectedVals = TypeFilter.getState().selectedValues;



          //order0 =  parseInt($("#order0 option:selected").val());
          //console.log("order0: "+order0);
          (selectedVals == "Ciudades Metropolitanas")? $("#filtros").hide() :  $("#filtros").show();
          (selectedVals == "Ciudades Metropolitanas")? $("#div_filtros").hide() :  $("#div_filtros").show();

          (selectedVals == "Ciudades Intermedias")? $("#map").hide() :  $("#map").show();
});

        //dashboard.bind([PopulationRangeSlider, MetropolitanaFilter, LocalizacionFilter, DistribucionFilter], [barChart, tableChart]);
        dashboard.bind([TypeFilter, PopulationRangeSlider, MetropolitanaFilter, LocalizacionFilter, DistribucionFilter, DependenciaRangeSlider, PerCapitaRangeSlider], [barChart]);
        //dashboard.draw(data, {allowHtml: true, showRowNumber: true, width: '100%', height: '100%'});
        barChart.setOption('title', theTitle );
        dashboard.draw((view), options);
// NUEVO =>
// https://stackoverflow.com/questions/5990755/google-chart-altering-height-of-chart-dynamically-based-on-total-rows
/*
google.visualization.events.addListener(MetropolitanaFilter, 'statechange', function() {
  alert(barChart.getDataTable().getNumberOfRows());
});*/
// NUEVO <=


  function Div(id,h) {

    var div=document.getElementById(id);
    h = h + "px";
/*
    var w=parseInt(div.style.width);
    if($(this).width() >= 1200){
        w = 1200 + "px";
    }else{
        w = ($(this).width()-30) + "px";
    }*/

    $(div).height(h);
    //$(div).width(w);

}


    google.visualization.events.addListener(dashboard, 'ready', function() {
        // Dashboard redraw, have a look at how many rows the barChart is displaying
        var numRows = barChart.getDataTable().getNumberOfRows();
        var expectedHeight = (numRows * 40)+50;
        if (parseInt(barChart.getOption('height'), 10) != expectedHeight) {
            // Update the chart options and redraw just it
            Div("chartRanking", expectedHeight);
            barChart.setOption('height', expectedHeight);
            barChart.draw();

        }

    });

/*
  google.visualization.events.addListener(dashboard, 'ready', function () {
    // get number of rows
    N = barChart.getDataTable().getNumberOfRows();


              var paddingHeight = 40;
              var rowHeight = data.getNumberOfRows() * 5;
              var chartHeight = rowHeight + paddingHeight;

Ncommunes = 93;

chartHeight = 70 + (N)*32;
    options.height = chartHeight;

    barChart.getOption('height')
    barChart.setOption('height', chartHeight);
    console.log("N: "+N + ", barChart: "+ barChart.getOptions().height  );
    console.log("--> chartHeight: "+chartHeight);

        //dashboard.draw(data, options);
  });
  */


       }); // FIN GET
      } // FIN drawDashboard
/// Dashboard <=


      function Base(){


        order1 =  parseInt($("#order1 option:selected").val());
        order2 =  parseInt($("#order2 option:selected").val());
        theTitle = $("#order1 option:selected").text();
        console.log("order1: "+order1);
        //console.log("view: "+view);

        if(order1 > 7){
          theTitle = 'Ranking ICVU 2018 para ' + theTitle;
        }else{
          theTitle = "Ranking ICVU 2018 General";
        }
      }
      function updateChart(){
        Base();


        barChart.setOption('title', theTitle );
        barChart.setOption('titleTextStyle.fontName', "Barlow" );

        //barChart.view(columns: [0, 8]);
        //index = (order1==0)?7:order1;
        barChart.setView({
          columns: [0, order1, {calc:AddLabel, type:'string', role: 'annotation', label:'Color'}, {calc:setColor, type:'string', role: 'style', label:'Color'}]
        });

        //barChart.setView({columns:[0, order1, {calc:AddLabel, type:'string', role: 'annotation', label:'Height in Inches'}]}); // AQUIIII ACTUALIZO LA COLUMNA A MOSTRAR, SEGUN ORDEN

        data.sort([{column: order1, desc: order2==2}]);



        //console.log("getNumberOfRows(): " + barChart.getDataTable().getNumberOfRows() );

        dashboard.draw(data, options);
        //view.setColumns([0,1,2,3,4,5,6]);
        //dashboard.draw(viewDetail, options);

      } // FIN updateChart



      $( document ).ready(function() {





        $("#tabla").hide();

                        $("#map").hide();

          order1 =  parseInt($("#order1 option:selected").val());
          order2 =  parseInt($("#order2 option:selected").val());
          theTitle = $("#order1 option:selected").text();

        if(order1 > 7){
          theTitle = 'Ranking ICVU 2017 para ' + theTitle;
        }else{
          theTitle = "Ranking ICVU 2017 General";
        }
        Base();


          //console.log( "text_commune! " + order1 );

          $('#order1').change(function() {
              updateChart();
          });

          $('#order2').change(function() {
              updateChart();
          });
          var ejemplo=[0,0,0,0,0,0,0];
          message = "Haz click en alguna comuna"

          createRadar(ejemplo, message);
          //$("#chartRanking").css("");

      }); // FIN $( document ).ready(
