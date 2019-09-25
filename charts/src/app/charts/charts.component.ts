import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  /**
   * Intervalo de actualizacion del grafico
   * @var {any} intervalUpdate 
   */
  private intervalUpdate: any = null;

  /**
   * Objeto Chart
   * @var {any} chart
   */
  public chart: any = null;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.intervalUpdate = setInterval(function(){
      this.showData();
    }.bind(this), 500);

    this.chart = new Chart('realtime', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Data',
        fill: false,
        data: [],
        backgroundColor: '#168ede',
        borderColor: '#168ede'
         }
       ]
        },
        options: {
       tooltips: {
        enabled: false
       },
       legend: {
        display: true,
        position: 'bottom',
        labels: {
         fontColor: 'white'
        }
       },
       scales: {
         yAxes: [{
          ticks: {
           fontColor: "white"
          }
         }],
         xAxes: [{
        ticks: {
         fontColor: "white",
         beginAtZero: true
        }
         }]
       }
        }
     });
  }

  /**
   * Destruir
   * @function ngOnDestroy
   * @return {void}
   */
  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

  /**
   * Imprimir los datos del grafico
   * @function showData
   * @return {void}
   */
  private showData(): void {
    this.getFromAPI().subscribe(response => {
      if(response.error === false) {
        let chartTime: any = new Date();
        chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
        if(this.chart.data.labels.length > 15) {
          this.chart.data.labels.shift();
          this.chart.data.datasets[0].data.shift();
        }
        this.chart.data.labels.push(chartTime);
        this.chart.data.datasets[0].data.push(response.data);
        this.chart.update();
      } else {
        console.error("ERROR: The response had an error, retrying");
      }
    }, error => {
     console.error("ERROR: Unexpected response");
    });
  }
  
  /**
  * Obtener los datos para el grafico
  * @function getFromAPI
  * @return {Observable<any>}
  */
  private getFromAPI(): Observable<any>{
    return this.http.get(
      'http://localhost:3000',
      { responseType: 'json' }
    );
  }
}
