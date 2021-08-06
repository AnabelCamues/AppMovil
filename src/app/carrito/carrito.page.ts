import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  ubicacion;
  total_pagar = 7.50.toFixed(2);
  envio = 1.45;
  total_factura = 8.95;
  constructor(private router: Router, public alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.ubicacion = localStorage.getItem('direccion');
  }

  agregar_ubicacion(){
    this.router.navigate(['/mapa']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Finalizar orden',      
      message: '<img src="assets/images/order.png" style="width: 100px">',
      subHeader: 'Esta seguro de finalizar?',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.presentToast();
  }

  async presentToast() {
    this.router.navigate(['/home']);
    const toast = await this.toastController.create({
      message: '😋 Enviado con éxito. Tu orden será atendida en breve 😋',
      duration: 3000,
      position:'middle',
      animated:true,
      color:'success'
    });
    toast.present();
  }
}
