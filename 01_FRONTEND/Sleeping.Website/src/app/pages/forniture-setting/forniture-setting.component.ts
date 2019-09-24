import { Component, OnInit, ViewChild } from '@angular/core';
import { FornitureArray } from './forniture-setting.interface';
import {NgForm, FormControl} from '@angular/forms';
import {FornitureSettingService} from './forniture-setting.service'
import swal from 'sweetalert2';

@Component({
  selector: 'app-forniture-setting',
  templateUrl: './forniture-setting.component.html',
  styleUrls: ['./forniture-setting.component.scss'],
  providers: [FornitureSettingService]
})
export class FornitureSettingComponent implements OnInit {
  @ViewChild('SearchForm') searchForm: NgForm;
  @ViewChild('NewAccesoryForm') newAccesoryForm: NgForm;
  
  tableDataOriginal: Array<any>;
  tableData: Array<any>;
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  newAccesoryCode='';
  flagIsActive='INACTIVO';
  flagCHECKED=false;
  indexEditing=0;
  flagEVENT='';
  CODIGO_HIDDEN=false;
  validateCantidad=false;
  IntervalValue='0';
  lstInterval=[
    {id:'30',text:'30'},
    {id:'60',text:'60'},
    {id:'90',text:'90'},
    {id:'120',text:'120'}
  ]
  valCantidad_V=false;
  public getSessionUser:any=sessionStorage.infoUser;
  public userConfig='';
  
  constructor(private _service:FornitureSettingService) { }

  ngOnInit() {
    const that=this;
    that.tableDataOriginal=FornitureArray;
    let session=that.getSessionUser.split('-');
    that.userConfig=session[4];
    that.getList();
  }
  getList(){
    const that=this;
    let data= {
      serviceName:(that.searchForm.value.accesoryName===''|| that.searchForm.value.accesoryName ===undefined)?'':that.searchForm.value.accesoryName,
      idProveedor: parseInt(that.userConfig)
    }
    that._service.listServicesGeneral(data).subscribe(
      res=>{
          let result=res.json();
          that.tableData=result;
      }
    )
  }

  loadData() {

  }

  openModal(modal,flag,values,index){
    const that=this;
    modal.open();
    if(flag==='N'){
      that.cleanForm();
      that.flagIsActive== 'INACTIVO';
      that.flagCHECKED=false;
      that.flagEVENT='AGREGAR';
      that.CODIGO_HIDDEN=false;
    }
    else{
      that.CODIGO_HIDDEN=true;
      const accesory:any={     
        accesoryName     : values.descServicio,
        accesoryQuantity : values.cantServicio,
        accesoryPrice    : values.precioServicio,
        accesoryDateIni  : values.inicioDisponible,
        accesoryDateFin  : values.finDisponible,
        accesoryInterval : values.minIntervalo
      }
      that.flagIsActive= (values.estadoServicio === 0)?'INACTIVO':'ACTIVO';
      that.flagCHECKED=(values.estadoServicio === 0)?false:true;
      that.newAccesoryCode=values.idServicio;
      that.newAccesoryForm.setValue(accesory);
      that.indexEditing=index;
      that.flagEVENT='EDITAR';
    }        
  }

  getFlag(event){
    const that=this;
    that.flagCHECKED=event;
    that.flagIsActive=(event)?'ACTIVO':'INACTIVO';
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  ResetSearch(){
    const that=this;
    that.searchForm.setValue({accesoryName:''});
    that.getList();
  }

  ValCantidad(data){
    const that=this;
    let format=Number(data);
    if(format>10){
      that.validateCantidad=true;
    }
    else{
      that.validateCantidad=false;
    }
  }

  formatPrecio(event){
    const that=this;
    let condition=that.newAccesoryForm.value.accesoryPrice;
    if(condition !==''){
      if (!/^([0-9])*$/.test(event)){
        that.newAccesoryForm.controls['accesoryPrice'].setValue('');
        return false;
      }
      let format = parseFloat(event).toFixed(2);
      if(format ==='0.00'){
        that.newAccesoryForm.controls['accesoryPrice'].setValue('');
        return false;
      }
      that.newAccesoryForm.controls['accesoryPrice'].setValue(format);
      return format;
    }
    else{
      that.newAccesoryForm.controls['accesoryPrice'].setValue('');
    }
  }
  getNumberPrecio()
  {
    const that=this;
    let condition=that.newAccesoryForm.value.accesoryPrice;
    if(condition !==''){
          let intFormat=parseInt(condition);
          that.newAccesoryForm.controls['accesoryPrice'].setValue(intFormat);
          return intFormat;
    }
    else{
      that.newAccesoryForm.controls['accesoryPrice'].setValue('');
    }
  }


  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  getTodayFormat(){
    let current_datetime = new Date();
    let dataMonth= current_datetime.getMonth()+1;
    let current_month= (dataMonth>=10)?dataMonth:'0'+dataMonth;
    let formatted_date = current_datetime.getDate() + "/" + current_month + "/" + current_datetime.getFullYear();
    return formatted_date;
  }

  getMethod(event){
    const that=this;
    if (!/^([0-9])*$/.test(event)){
      that.newAccesoryForm.controls['accesoryQuantity'].setValue('');
    }
    if(event === '0'){
      that.newAccesoryForm.controls['accesoryQuantity'].setValue('');
    }
  }

  addAccesory(modal){
    const that=this;
    let resultadooo=that.IntervalValue;
    let dataValue=that.newAccesoryForm.value;
    let ini=parseInt(dataValue.accesoryDateIni.substring(0, 2));
    let fin=parseInt(dataValue.accesoryDateFin.substring(0, 2));
    let formatted_date=that.getTodayFormat();
    if(dataValue.accesoryName === '' || 
       (dataValue.accesoryQuantity === '' || dataValue.accesoryQuantity ===null) || 
       dataValue.accesoryPrice === '' || dataValue.accesoryDateIni === '' || dataValue.accesoryDateFin === '' || dataValue.accesoryInterval === '0'){
      swal({
        type: 'error',
        title: 'Datos no válidos',
        text: 'Debe ingresar todos los datos para continuar.',
      });
      return false;
    }
    if(ini>=fin){
      swal({
        type: 'error',
        title: 'Datos no válidos',
        text: 'La hora inicio no puede ser menor que la hora fin.',
      });
      return false;
    }
    const accesory:any={     
      idServicio: "",
      idUsuario: that.userConfig,
      descServicio: dataValue.accesoryName.toUpperCase(),
      cantServicio: dataValue.accesoryQuantity,
      precioServicio: dataValue.accesoryPrice,
      estadoServicio: (that.flagIsActive === 'ACTIVO')?1:0,
      fecRegistro: formatted_date,
      inicioDisponible: dataValue.accesoryDateIni,
      finDisponible: dataValue.accesoryDateFin,
      minIntervalo: Number(dataValue.accesoryInterval)
    }          
  
    that._service.registerService(accesory).subscribe(
      res=>{
        let result=res.json();
        modal.close();
        swal({
          type: 'success',
          title: 'El servicio '+ result.idServicio+' se ha generado correctamente.'
        });
        that.getList();
      }
    );
    
   
  }

  editAccesory(modal){
    const that=this;
    let dataValue=that.newAccesoryForm.value;
    let ini=parseInt(dataValue.accesoryDateIni.substring(0, 2));
    let fin=parseInt(dataValue.accesoryDateFin.substring(0, 2));
    let formatted_date=that.getTodayFormat();
    if(dataValue.accesoryName === '' || 
       (dataValue.accesoryQuantity === '' || dataValue.accesoryQuantity ===null) || 
       dataValue.accesoryPrice === '' || dataValue.accesoryDateIni === '' || dataValue.accesoryDateFin === '' || dataValue.accesoryInterval === '0'){
      swal({
        type: 'error',
        title: 'Datos no válidos',
        text: 'Debe ingresar todos los datos para continuar.',
      });
      return false;
    }
    if(ini>=fin){
      swal({
        type: 'error',
        title: 'Datos no válidos',
        text: 'La hora inicio no puede ser menor que la hora fin.',
      });
      return false;
    }
    const accesory:any={     
      idServicio: that.newAccesoryCode,
      idUsuario: that.userConfig,
      descServicio: dataValue.accesoryName.toUpperCase(),
      cantServicio: dataValue.accesoryQuantity,
      precioServicio: dataValue.accesoryPrice,
      estadoServicio: (that.flagIsActive === 'ACTIVO')?1:0,
      fecRegistro: formatted_date,
      inicioDisponible: dataValue.accesoryDateIni,
      finDisponible: dataValue.accesoryDateFin,
      minIntervalo: Number(dataValue.accesoryInterval)
    }   
    that._service.updateService(accesory).subscribe(
      res=>{
        let result=res.json();
        modal.close();
        swal({
          type: 'success',
          title: 'El servicio '+ result.idServicio+' se ha actualizado correctamente.'
        });
        that.getList();
        that.newAccesoryCode='';
      }
    );
  }

  closeModal(modal) {
    modal.close();

  }

  onClose() {
    swal({
      type: 'success',
      title: 'Success!',
      text: 'close it!',
    });
  }

  cleanForm(){
    const that=this;
    const data={
      accesoryDateFin: '',
      accesoryDateIni: '',
      accesoryInterval: 0,
      accesoryName: '',
      accesoryPrice: '',
      accesoryQuantity: ''
    }
    that.newAccesoryForm.setValue(data);
  }
}
