import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;
  cantidad = 0;
  total:any = 0;

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };


  constructor(private router:Router) {

    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 'assets/images/1.jpg'
        },
        {
          id: 'assets/images/2.jpg'
        },
        {
          id: 'assets/images/3.jpg'
        },
        {
          id: 'assets/images/4.jpg'
        },
      ]
    };
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  sumar() {
    this.cantidad = this.cantidad + 1;
    var valor = 2.50;
    this.total = (valor * this.cantidad).toFixed(2);
  }

  restar() {
    if (this.cantidad > -1) {
      this.cantidad = this.cantidad - 1;
      var valor = 2.50;
      this.total = (valor * this.cantidad).toFixed(2);
    }
  }

  carrito(){
    this.router.navigate(['/carrito']);
  }



}
