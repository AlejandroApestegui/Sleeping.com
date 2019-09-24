import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
@Component({
  selector: 'app-provider-main',
  templateUrl: './provider-main.component.html',
  styleUrls: ['./provider-main.component.scss'],
  providers: [ChartsService]
})
export class ProviderMainComponent implements OnInit {
  showloading: boolean = false;
  public BarClientesAceptados;
  public BarClientesRechazados;
  public AnimationBarOption;
  

  constructor(private _chartsService: ChartsService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              public _globalService: GlobalService) { }

  ngOnInit() {
    const that=this;
    that.BarClientesAceptados = that._chartsService.getBarOption();
    that.BarClientesRechazados = that._chartsService.getBarOption();
    that.AnimationBarOption = that._chartsService.getMyCustomChart();
  }

  redirectToForniture(){
    const that=this;
    this._globalService.dataBusChanged('isActived', { title: 'ADMINISTRAR MUEBLES' });
    that._router.navigate(['/pages/forniture-setting']);
  }

  redirectToControlReserva(){
    const that=this;
    this._globalService.dataBusChanged('isActived', { title: 'CONTROL DE RESERVAS' });
    that._router.navigate(['/pages/reservation/res-control']);
  }

}
