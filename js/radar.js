var config;
/******************************************************************/
// DOCUMENTACION DE LA LIBRERIA
// http://www.chartjs.org/docs/latest/charts/radar.html
/******************************************************************/

function actualizar(icvu, lugar, datos, titulo){
/*
      config.data.datasets.forEach(function(dataset) {
        // dataset.data = dataset.data.map(function() {
        //      return randomScalingFactor();
        //});

          dataset.data = datos;
          dataset.label = titulo;
      });

*/
      function addData(chart, label, data) {
          chart.data.labels.push(label);
          chart.data.datasets.forEach((dataset) => {
              dataset.data.push(data);
          });
          chart.update();
      }

      function removeData(chart) {
          chart.data.labels.pop();
          chart.data.datasets.forEach((dataset) => {
              dataset.data.pop();
          });
          chart.update();
      }

      function updateConfigByMutating(chart) {
        //removeData(chart);
        x = chart.data.datasets.length;
        console.log("X> "+x);
        console.log(":> "+chart.data.datasets[3]);
        chart.data.datasets[3].data = datos;
        chart.data.datasets[3].label = titulo;
        /************************************************/
        // REVISAR AQUI PARA CAMBIAR LA FUENTE
          chart.options.title.text = titulo+ ", valor icvu "+icvu+" (lugar "+lugar+"/93)";
        /************************************************/
          chart.update();
      }

      updateConfigByMutating(window.myRadar);
      canvasId = "spider";
      var canvas = document.getElementById(canvasId);
      var ctx = canvas.getContext("2d");

      /*
      ctx.beginPath();
      ctx.rect(0, 0, c.width, c.height);
      ctx.fillStyle = "white";
      ctx.fill();
      */
      // change non-opaque pixels to white
      var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
      var data=imgData.data;
      for(var i=0;i<data.length;i+=4){
          if(data[i+3]<255){
              data[i] = 255 - data[i];
              data[i+1] = 255 - data[i+1];
              data[i+2] = 255 - data[i+2];
              data[i+3] = 255 - data[i+3];
          }
      }

      //AÑADIENDO LEYENDA POR FIN//
      ctx.font = "10px Barlow";
      ctx.fillStyle = "#cccccc";
      //Centrar texto en canvas
      ctx.textAlign = "center";
      ctx.fillText("ICVU desarrollado por CCHC. Gráficos y plataforma desarrollados por OCUC",canvas.width/2,canvas.height-10);
      //ctx.fillText("Gráficos y plataforma desarrollados por OCUC",canvas.width/2,(canvas.height/8)-5);



      window.myRadar.update();
}

function createRadar(datos, titulo){

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};


/////////////////////////////////
/*var datos = [
[1,2,3,4,5],
[2,3,4,5,6],
[2,3,8,5,6],
[2,13,4,5,6]
];*/


/////////////////////////////////
var beginAtZero=[0,0,0,0,0,0,0];
alpha = 0.5;
var colorsRanges = [
'rgba(193, 39, 45, '+alpha+')',
'rgba(251, 176, 59, '+alpha+')',
'rgba(34, 181, 115, '+alpha+')'

  /*'#C1272D',
  '#FBB03B',
  '#22B573'
  */
  /*
"#BEBEFF",
"#5C5CFF",
"#1B1464"
*/
];

var color = Chart.helpers.color;
var datasets_min = {
            label: 'Rango Inferior',
            backgroundColor: color(window.chartColors.grey).alpha(0).rgbString(),
            //backgroundColor: colorsRanges[0],
            borderColor: colorsRanges[0],
            //pointBackgroundColor: window.chartColors.grey,
            pointBackgroundColor: colorsRanges[0],
            //data: [40,40,40,40,40,40,40]
            //data: [28.92, 13.06, 42.09, 57.71, 55.63, 33.69, 42.75]
            data: [28.92, 13.06, 42.09, 57.71, 55.63, 33.69]
        };
var datasets_avg = {
            label: 'Rango Promedio',
            backgroundColor: color(window.chartColors.grey).alpha(0).rgbString(),
            //backgroundColor: colorsRanges[1],
            borderColor: colorsRanges[1],
            //pointBackgroundColor: window.chartColors.grey,
            pointBackgroundColor: colorsRanges[1],
            //data: [70,70,70,70,70,70,70]
            data: [41.02, 25.46, 49.44, 75.10, 65.24, 48.30]
        };
var datasets_max = {
            label: 'Rango Superior',
            backgroundColor: color(window.chartColors.grey).alpha(0).rgbString(),
            //backgroundColor: colorsRanges[1],
            borderColor: colorsRanges[2],
            //pointBackgroundColor: window.chartColors.grey,
            pointBackgroundColor: colorsRanges[2],
            //data: [100,100,100,100,100,100,100]
            data: [75.1309663453, 59.2774690646, 65.4363055131, 99.4124815535, 81.4680047065, 89.4304629718]




        };
config = {
    type: 'radar',
    data: {
      //'ICVU2017','CL','AN','CS','CM','SM','VE'
      // labels: ['ICVU','CL','AN','CS','CM','SM','VE'], /*, 'CM1', 'CM3', 'CM5'*/

        //labels: ['ICVU','Condiciones Laborales','Ambiente de Negocios','Condiciones Socio Culturales','Conectividad y Movilidad','Salud y Medio Ambiente','Vivienda y Entorno'], /*, 'CM1', 'CM3', 'CM5'*/
        labels: ['Condiciones Laborales','Ambiente de Negocios','Condiciones Socio Culturales',
      'Conectividad y Movilidad','Salud y Medio Ambiente','Vivienda y Entorno'], /*, 'CM1', 'CM3', 'CM5'*/
        datasets: [
        datasets_min,
        datasets_avg,
        datasets_max,
        {
            label: titulo,
            //backgroundColor: color(window.chartColors.grey).alpha(0.6).rgbString(),
            //borderColor: window.chartColors.grey,
            //pointBackgroundColor: window.chartColors.grey,
            backgroundColor: color(window.chartColors.custom_grey).alpha(0.6).rgbString(),
            borderColor: window.chartColors.custom_grey,
            pointBackgroundColor: window.chartColors.custom_grey,
            data:datos
        }
      ]
    },
    options: {
        maintainAspectRatio: false, /*gráfico "libre", ahora altura desde #spider en CSS*/
        legend: {
            position: 'bottom',
            fullWidth: true,
            labels: {
                fontFamily: 'Barlow',
                fontSize: 13,
                fullWidth: true,
                /*padding: 10,*/
            }
        },
        title: {
            display: true,
            text: 'Selecciona una Comuna',
            fontFamily: 'Barlow',
            fontSize: 18,
            fullWidth: true,
        },
        scale: {
            ticks: { /*Cotas numéricas del radar*/
                beginAtZero: true,
                max: 100,
                fontFamily: 'Barlow',
                fontSize: 13,
                display: true
              }
        }
    }
};

window.onload = function() {
    window.myRadar = new Chart(document.getElementById('spider'), config);
};


var colorNames = Object.keys(window.chartColors);


}//cierre función createRadar
