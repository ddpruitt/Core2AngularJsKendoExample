import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    public multiple: boolean = false;
    public allowUnsort: boolean = true;

    private gridView: GridDataResult;
    private sort: SortDescriptor[] = [];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];

            this.loadForecastView();
        }, error => console.error(error));

        
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadForecastView();
    }

    private loadForecastView(): void {
        this.gridView = {
            data: orderBy(this.forecasts, this.sort),
            total: this.forecasts.length
        };
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
