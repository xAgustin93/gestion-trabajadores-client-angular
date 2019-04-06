import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// FontAwesome Icons
import { faTrash } from '@fortawesome/free-solid-svg-icons';


// Models
import { Ad } from '../../../models/ad';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { AdService } from '../../../services/ad.service';

declare var $: any;

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  providers: [FunctionsServices, AdService]
})
export class AdsComponent implements OnInit {

  public title: String;
  public roleAdmin: Boolean;

  public ads: Ad[];
  public ad: Ad;

  public faTrash = faTrash;

  
  constructor(
    private _functionsServices: FunctionsServices,
    private _adServices: AdService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.title = "Anuncios";
    this.roleAdmin = this._functionsServices.checkRoleAdmin();

    this.ad = new Ad('', '', '', '');

    this.getAds();
  }

  addAd(adAddForm){
    if(adAddForm.valid) {
      const token = this._functionsServices.getToken();
      this._adServices.createAd(this.ad, token).subscribe(
        response => {
          const ad = response['ad'];

          if(!ad._id) {
            this._toastrService.error('Error de servidor.');
          } else {
            this.getAds();
            this._toastrService.success('Noticia creada correctamente');
            $('#addAd').modal('hide');
            this.ad = new Ad('', '', '', '');
          }
        },
        error => {
          this._toastrService.error('Error al crear la noticia.');
        }
      );
    } else {
      this._toastrService.warning('Rellena todos los campos para poder crear el nuevo anuncio.');
    }

  }

  getAds() {
    const token = this._functionsServices.getToken();

    this._adServices.getAds(token).subscribe(
      response => {
        this.ads = response['ads'];
      }
    )
  }

  deleteAd(id) {
    const token = this._functionsServices.getToken();

    this._adServices.deleteAd(id, token).subscribe(
      response => {
        this._toastrService.success('Noticia eliminada correctamente.');
        this.getAds();
      }
    )
  }

  formatDate(date) {
    return moment(date).format('L');
  }




}
