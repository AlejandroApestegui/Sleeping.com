import { Component, OnInit, ViewChild } from '@angular/core';
import {SearchMapsService} from './search-maps.service';
import { MouseEvent, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core'
@Component({
  selector: 'app-search-maps',
  templateUrl: './search-maps.page.html',
  styleUrls: ['./search-maps.page.scss'],
  providers:[SearchMapsService,GoogleMapsAPIWrapper]
})
export class SearchMapsPage implements OnInit {
  texto : string = 'LIMA - PERU';
  lat: number = -12.0431800;
  lng: number = -77.0282400;
  zoom: number = 16;
  lstProviders:any=[];
  userLocation: any;
  siteLocation: any;
  lngGeo:number;
  latGeo:number;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: -12.0422462, lng: -77.0270466, alpha: 1 ,color:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    { lat: -12.0444153, lng: -77.0287553, alpha: 1 ,color:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    { lat: -12.0467646, lng: -77.0297023, alpha: 1 ,color:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    { lat: -12.0438436, lng: -77.0269589, alpha: 1 ,color:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
  ];
  constructor(private SearchMap:SearchMapsService,
              private mapsWrapper: GoogleMapsAPIWrapper) {
                this.mapsWrapper = mapsWrapper;
               }
  
 
  ngOnInit() {
    const that=this;
    that.getProviders();
    
  }

  returnPosition(){
    const that=this;
    that.lng = -77.0282400;
    that.lat = -12.0431800;
  }

  getProviders(){
    const that=this;
    that.SearchMap.getProveedores().subscribe(
      res=>{
        const result=res.json();
        that.lstProviders=result.filter(x=>x.LATITUD !== '');
        that.lstProviders.forEach(element => {
          element.url='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
          
        });
      }
    )
  }

  getFont(data:any){
    let labelOptions = {
      color: '#ee4646',
      fontFamily: '',
      fontSize: '10px',
      fontWeight: 'bold',
      letterSpacing:'0.5px',
      text: 'Plan Pagado/No pagado'
    }
  }
   setCurrentPosition() {
    if ("geolocation" in navigator) {
      if (navigator)
      {
      navigator.geolocation.getCurrentPosition( pos => {
          this.lng = pos.coords.longitude;
          this.lat = pos.coords.latitude;
        });
      }
    }
  }
}
