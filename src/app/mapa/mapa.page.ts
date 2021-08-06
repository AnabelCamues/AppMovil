  

  
  import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { ToastController, NavController } from '@ionic/angular';
  // const { Geolocation } = Plugins;
  import { environment } from "../../environments/environment";
  import { map } from "rxjs/operators";
  import { Geolocation } from '@capacitor/geolocation';

  declare var google: any;

  @Component({
    selector: 'app-mapa',
    templateUrl: './mapa.page.html',
    styleUrls: ['./mapa.page.scss'],
  })
  export class MapaPage implements OnInit {
    coords: any;
    latitud;
    longitud;
    lat: number;
    lng: number;
    directionsService: any = null;
    directionsDisplay: any = null;
    address;
    direccion_latitud;
    direccion_longitud;
    distancia;
    duracion;
    latitud_entrega:number = 0.3575681;
    longitud_entrega:number = -78.0994204;
    constructor(private http: HttpClient,
      public toastController: ToastController, public navCtrl : NavController) {
        
       }
  
  
  
    ngOnInit() {
      this.getCurrentLocation();
 
    }

    getCurrentLocation() {
      Geolocation.getCurrentPosition().then(result => {
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        localStorage.setItem('ubicacion_mapa_lat', this.lat.toString() );
        localStorage.setItem('ubicacion_mapa_long', this.lng.toString() );
        // calling getAddress function to decode the address
        this.initMap()
  
      });
    }
  
    initMap() {

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: this.lat, lng: this.lng },
        mapTypeId: 'roadmap',
        tilt: 45,
        mapTypeControlOptions: {
          mapTypeIds: []
        }, // here´s the array of controls
        disableDefaultUI: true, // a way to quickly hide all controls
        mapTypeControl: true,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE 
        }
      });
      
            
    var iconBase = 'assets/images/inicio.png';

    var vMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      icon: iconBase,
      draggable: true,
    });
      
      google.maps.event.addListener(vMarker, 'dragend', function (evt) {
  
        var direccion_latitud = (evt.latLng.lat().toFixed(6));
        var direccion_longitud = (evt.latLng.lng().toFixed(6));
        localStorage.setItem('ubicacion_mapa_lat', direccion_latitud );
        localStorage.setItem('ubicacion_mapa_long', direccion_longitud );
        map.panTo(evt.latLng);
      });
      
      vMarker.setMap(map);
      // this.get_ubicacion();
    }
    

    get_ubicacion() {
      Geolocation.getCurrentPosition().then(result => {
        this.lat = parseFloat(localStorage.getItem('ubicacion_mapa_lat'));
        this.lng = parseFloat(localStorage.getItem('ubicacion_mapa_long'));
        
        this.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
          this.address = decodedAddress;
          localStorage.setItem('direccion', this.address);
          console.log(this.address);
          this.navCtrl.navigateForward('/carrito');
          
        });
      });
    }
  
    // This function makes an http call to google api to decode the cordinates
  
    private getAddress(lat: number, lan: number) {
      return this.http
        .get<any>(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${'AIzaSyDFps2vkxlc0Q6gxUPwiX4VrlSk6ZoXihE'
          }`
        )
        .pipe(
          map(geoData => {
            if (!geoData || !geoData.results || geoData.results === 0) {
              return null;
            }
            // console.log(geoData.results[0]);
            
            return geoData.results[0].formatted_address;
          })
        );
    }
  
    calculateRoute(){
      console.log(this.latitud_entrega, this.longitud_entrega);
      var latitud_e = parseFloat(localStorage.getItem('ubicacion_mapa_lat'));
      var longitud_e = parseFloat(localStorage.getItem('ubicacion_mapa_long'));
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsService.route({
        origin: new google.maps.LatLng(this.latitud_entrega, this.longitud_entrega),
        destination: new google.maps.LatLng(latitud_e, longitud_e),
        // waypoints: this.waypoints,        
        travelMode: google.maps.TravelMode.DRIVING,
      }, (response, status)=> {
        this.distancia = response.routes[0].legs[0].distance.text;
        this.duracion = response.routes[0].legs[0].duration.text;
        // this.calcular_costo_envio(this.distancia);
        console.log(this.distancia, this.duracion);
        
        
        if(status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        }else{
          alert('Could not display directions due to: ' + status);
        }
      });  
    
    }
  }



  
  

